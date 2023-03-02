<template>
    <div class="login-page">
        <div class="login-card">
            <div class="text-center">
                <img src="../img/lock.png" class="login-card__icon" alt="">
                <h2>User Login</h2>
            </div>
            <form action="#" @submit.prevent="handleSubmit">

                <label class="block" for="">username</label>
                <input 
                type="text" 
                placeholder="Enter your username" 
                v-model="FormData.username"
                required
                ref="username"
                > 

                <label class="block mt-3" for="">Password</label>
                <input 
                type="password" 
                placeholder="Enter password"
                v-model="FormData.password"
                required
                ref="password"
                >
                <!-- <p class="text-center mt-3" v-if="loggingIn">Logging in...</p> -->
                <!-- <button type="submit" class="w-100 mt-3" v-else>Login</button> -->
                <the-button class="mt-3" :block="true" :loading="loggingIn">Login</the-button>


                <div class="d-flex mt-2 jc-between">
                    <div>
                        <label for="">
                            <input type="checkbox">
                            Remember me
                        </label>
                    </div>
                    <div>
                        <a href="">Forgot Password?</a>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import TheButton from "../components/TheButton.vue"
  export default {
    data:()=>({
        FormData:{
          username: "",
          password: ""
        },
        loggingIn: false,
        movedToRight: false,
        showing: false
      }),
      methods:{
        handleSubmit(){
          console.log(this.FormData)
          if(!this.FormData.username){
            // alert("username can not be empty!")
            //TODO: show error message on toast
            this.$eventBus.emit('toast', {
              type: "Error",
              message: "username can not be empty!"

            });
            this.$refs.username.focus();
            return;
          }
          if(this.FormData.password.length<6){
            // alert("Password must be at least 6 characters long!")
            //TODO: show error message on toast

            this.$eventBus.emit('toast', {
              type:"Error",
              message: "Password must be at least 6 characters long!"

            });
            this.$refs.password.focus();

            return;
          }
          //TODO: Call API
          this.loggingIn= true;
          axios.post('https://api.rimoned.com/api/pharmacy-management/v1/login', this.FormData).then((res) =>{
            console.log(res.data);
            this.$eventBus.emit('toast', {
              type: "Success",
              message: res.data.message

            });
          })
          .catch((err) =>{
            let errorMessage = "Something went wrong!";
            if(err.response){
              errorMessage = err.response.data.message;

            }
            this.$eventBus.emit('toast', {
              type: "Error",
              message: errorMessage

            });

          })
          .finally(()=>{
            this.loggingIn=false;
          });   
        }
      },
      components:{
        TheButton
      }
  }
</script>

<style>
.box {
  width: 55px;
  height: 55px;
  background-color: greenyellow;
  margin-bottom: 22px;
  transition: all 0.5s;
}
.box--right {
  margin-left: 222px;
}

.box1 {
  width: 55px;
  height: 55px;
  background-color: greenyellow;
  margin-bottom: 22px;
  /* animation: showhide 1s ease-in; */
}

@keyframes showhide {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }

  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.showhide-enter-active {
  animation: showhide 1s ease-in;
  /* transition: all 0.5s; */
 }


.showhide-leave-active {
  animation: showhide 1s ease-in reverse;
  /* transition: all 0.5s; */
}


.login-page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(235, 235, 235);
}

.login-card {
  width: 400px;
  /* border: 1px solid gray; */
  min-height: 193px;
  box-shadow: 0px 2px 9px 4px #dfdfdf;
  background-color: #fff;
  border-radius: 5px;
  padding: 44px 33px;
}

.login-card input[type="text"],
.login-card input[type="password"] {
  width: 100%;
}

.login-card__icon {
  max-width: 77px;
}

</style>