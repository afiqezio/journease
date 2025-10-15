import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // Get runtime config
  const config = useRuntimeConfig()
  const apiUrl = config.public.apiUrl

  // State
  const token = ref(null)
  const user = ref(null)
  const tenant = ref(null)
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const loading = ref(false)
  const error = ref(null)

  // Actions
  const login = async (credentials) => {
    loading.value = true
    error.value = null

    try {
      const response = await $fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        body: credentials
      })

      // Store auth data
      token.value = response.token
      user.value = response.user
      tenant.value = response.tenant

      // Persist to localStorage
      if (process.client) {
        localStorage.setItem('auth-token', response.token)
        localStorage.setItem('auth-user', JSON.stringify(response.user))
        localStorage.setItem('auth-tenant', JSON.stringify(response.tenant))
      }

      return { success: true, data: response }
    } catch (err) {
      console.error('Login error:', err)
      let errorMessage = 'Login failed'
      
      if (err.data) {
        // Handle backend error response
        errorMessage = err.data.message || err.data.error || errorMessage
      } else if (err.message) {
        // Handle network or other errors
        errorMessage = err.message
      }
      
      error.value = errorMessage
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  const register = async (registrationData) => {
    loading.value = true
    error.value = null

    try {
      const response = await $fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        body: registrationData
      })

      // Store auth data
      token.value = response.token
      user.value = response.user
      tenant.value = response.tenant

      // Persist to localStorage
      if (process.client) {
        localStorage.setItem('auth-token', response.token)
        localStorage.setItem('auth-user', JSON.stringify(response.user))
        localStorage.setItem('auth-tenant', JSON.stringify(response.tenant))
      }

      return { success: true, data: response }
    } catch (err) {
      console.error('Registration error:', err)
      let errorMessage = 'Registration failed'
      
      if (err.data) {
        // Handle backend error response
        errorMessage = err.data.message || err.data.error || errorMessage
      } else if (err.message) {
        // Handle network or other errors
        errorMessage = err.message
      }
      
      error.value = errorMessage
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    // Clear state
    token.value = null
    user.value = null
    tenant.value = null
    error.value = null

    // Clear localStorage
    if (process.client) {
      localStorage.removeItem('auth-token')
      localStorage.removeItem('auth-user')
      localStorage.removeItem('auth-tenant')
    }

    // Redirect to login
    await navigateTo('/login')
  }

  const refreshUser = async () => {
    if (!token.value) return

    try {
      const response = await $fetch(`${apiUrl}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })

      user.value = response

      if (process.client) {
        localStorage.setItem('auth-user', JSON.stringify(response))
      }
    } catch (err) {
      console.error('Failed to refresh user data:', err)
      // If refresh fails, logout user
      await logout()
    }
  }

  const refreshToken = async () => {
    if (!token.value) return false

    try {
      const response = await $fetch(`${apiUrl}/auth/refresh`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })

      token.value = response.token

      if (process.client) {
        localStorage.setItem('auth-token', response.token)
      }

      return true
    } catch (err) {
      console.error('Failed to refresh token:', err)
      await logout()
      return false
    }
  }

  const initializeAuth = () => {
    if (!process.client) return

    // Restore auth state from localStorage
    const storedToken = localStorage.getItem('auth-token')
    const storedUser = localStorage.getItem('auth-user')
    const storedTenant = localStorage.getItem('auth-tenant')

    if (storedToken && storedUser && storedTenant) {
      try {
        token.value = storedToken
        user.value = JSON.parse(storedUser)
        tenant.value = JSON.parse(storedTenant)
      } catch (err) {
        console.error('Failed to parse stored auth data:', err)
        logout()
      }
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    token: readonly(token),
    user: readonly(user),
    tenant: readonly(tenant),
    isAuthenticated,
    loading: readonly(loading),
    error: readonly(error),

    // Actions
    login,
    register,
    logout,
    refreshUser,
    refreshToken,
    initializeAuth,
    clearError
  }
})
