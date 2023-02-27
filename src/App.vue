<template>
   <login></login>
   <div class="toasts">
    <the-toast 
      v-for="(toast, i) in toasts" 
      :key="i"
      :toastType="toast.type"
      :message="toast.message"
      >
   </the-toast>

   </div>
</template>

<script>
import Login from "./components/Login.vue"
import TheToast from "./components/TheToast.vue"
export default {
  data: () =>({
    toasts:[
      {
        type: "Success",
        message: "Done Successfully!"
      },
      {
        type: "Error",
        message: "Something went wrong!"
      },
  ]

  }),
  components:{
    Login,
    TheToast
  }

}
</script>

<style>

</style>