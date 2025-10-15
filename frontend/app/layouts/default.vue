<template>
  <div class="h-screen bg-gray-50 flex overflow-hidden">
    <!-- Sidebar -->
    <SideTabs @collapse-change="handleCollapseChange" @project-tab-click="handleProjectTabClick" />
    <!-- <SidebarTesting @collapse-change="handleCollapseChange" @project-tab-click="handleProjectTabClick" /> -->


    <div class="flex-1 overflow-hidden">
      <!-- Top Navigation Bar -->
      <nav class="shadow">
        <div class="flex justify-between h-16 p-4 bg-gray-50">
          <!-- Left side -->
          <div class="flex items-center">
            <!-- Page Title -->
          
          </div>

          <!-- Right side -->
          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <button
              type="button"
              class="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="sr-only">View notifications</span>
              <Icon name="heroicons:bell" class="h-6 w-6" />
            </button>

            <!-- User menu -->
            <div class="relative">
              <button
                ref="userMenuButton"
                type="button"
                class="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                @click="toggleUserMenu"
              >
                <span class="sr-only">Open user menu</span>
                <div class="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span class="text-indigo-600 font-medium text-sm">
                    {{ userInitials }}
                  </span>
                </div>
              </button>

              <!-- User dropdown menu -->
              <Transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div
                  v-show="showUserMenu"
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                >
                  <div class="py-1">
                    <div class="px-4 py-2 text-sm text-gray-700 border-b">
                      <div class="font-medium">{{ authStore.user?.first_name }} {{ authStore.user?.last_name }}</div>
                      <div class="text-xs text-gray-500">{{ authStore.user?.email }}</div>
                      <div class="text-xs text-gray-500">{{ authStore.tenant?.name }}</div>
                    </div>
                    <NuxtLink
                      to="/profile"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      @click="closeUserMenu"
                    >
                      Profile Settings
                    </NuxtLink>
                    <NuxtLink
                      to="/settings"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      @click="closeUserMenu"
                    >
                      Organization Settings
                    </NuxtLink>
                    <button
                      type="button"
                      class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      @click="handleLogout"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </Transition>
            </div>

            <!-- Mobile menu button -->
            <div class="md:hidden">
              <button
                type="button"
                class="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                @click="toggleMobileMenu"
              >
                <span class="sr-only">Open main menu</span>
                <Icon name="heroicons:bars-3" class="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <!-- Page Content -->
      <main class="overflow-hidden h-full">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
import SideTabs from '~/components/map/SideTabs.vue'
import SidebarTesting from '~/components/map/SidebarTesting.vue'

const authStore = useAuthStore()

// Active tab state for sidebar
const activeTab = ref('map')

// Control panel visibility state
const showControlPanel = ref(false)

// Area details panel visibility state (independent of control panel)
const showAreaDetails = ref(false)

// Project details panel visibility state (independent of control panel)  
const showProjectDetails = ref(false)

// Active control panel type
const activeControlPanel = ref('area')

// Sidebar collapse state
const isCollapsed = ref(false)

// Provide all states to child components
provide('activeTab', activeTab)
provide('showControlPanel', showControlPanel)
provide('showAreaDetails', showAreaDetails)
provide('showProjectDetails', showProjectDetails)
provide('activeControlPanel', activeControlPanel)
provide('isCollapsed', isCollapsed)

// Sidebar reference
const sidebarRef = ref(null)

// Get page title from route
const route = useRoute()
const pageTitle = computed(() => {
  const titles = {
    '/': 'EDAFY',
    '/wells': 'Wells',
    '/seismic': 'Seismic',
    '/records': 'Records',
    '/records/2d-seismic': '2D Seismic Records',
    '/records/3d-seismic': '3D Seismic Records',
    '/areas': 'Areas',
    '/business-associates': 'Business Associates',
    '/settings': 'Settings'
  }
  return titles[route.path] || 'EDAFY-Data Platform'
})

// Toggle sidebar function
const toggleSidebar = () => {
  if (sidebarRef.value) {
    sidebarRef.value.toggleSidebar()
  }
}

// User menu state
const showUserMenu = ref(false)
const userMenuButton = ref(null)

// Computed properties
const userInitials = computed(() => {
  if (authStore.user?.first_name && authStore.user?.last_name) {
    return `${authStore.user.first_name[0]}${authStore.user.last_name[0]}`.toUpperCase()
  }
  return 'U'
})

// Methods
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const closeUserMenu = () => {
  showUserMenu.value = false
}

const handleLogout = async () => {
  await authStore.logout()
  await navigateTo('/login')
}

const handleCollapseChange = (collapsed) => {
  isCollapsed.value = collapsed
}

const handleProjectTabClick = () => {
  // Switch to project tab
  activeTab.value = 'project'
}

// Handle control panel close
const handleControlPanelClose = () => {
  showControlPanel.value = false
}

// Handle area details close (independent of control panel)
const handleAreaDetailsClose = () => {
  showAreaDetails.value = false
}

// Handle project details close (independent of control panel)
const handleProjectDetailsClose = () => {
  showProjectDetails.value = false
}

// Close user menu when clicking outside
onMounted(() => {
  const handleClickOutside = (event) => {
    if (userMenuButton.value && !userMenuButton.value.contains(event.target)) {
      showUserMenu.value = false
    }
  }
  document.addEventListener('click', handleClickOutside)
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>