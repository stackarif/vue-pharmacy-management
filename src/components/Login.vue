<template>
    <div class="login-page">
        <div class="login-card">
            <div class="text-center">
                <img src="../img/lock.png" class="login-card__icon" alt="">
                <h2>User Login</h2>
            </div>
            <form action="#" @submit.prevent="handleSubmit">

                <label class="block" for="">Email</label>
                <input 
                type="email" 
                placeholder="Enter your email" 
                v-model="FormData.email"
                >

                <label class="block mt-3" for="">Password</label>
                <input 
                type="password" 
                placeholder="Enter password"
                v-model="FormData.password"
                required
                >

                <button type="submit" class="w-100 mt-3">Login</button>

                <div class="d-flex jc-between">
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
export default {
    data:()=>({
        FormData:{
            email: "",
            password: ""
        }

    }),
    methods:{
        handleSubmit(){
            console.log(this.FormData)
            if(!this.FormData.email){
                alert("Email can not be empty!")
                //TODO: show error message on toast
                return;
            }
            if(this.FormData.password.length<6){
                alert("Password must be at least 6 characters long!")
                //TODO: show error message on toast
                return;
            }

        }
    },
    components:{
    }


}
</script>

<style>
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

.login-card input[type="email"],
.login-card input[type="password"] {
  width: 100%;
}

.login-card__icon {
  max-width: 77px;
}

button{
    padding: 8px;
    background-color: brown;

}
button:hover{
    background: transparent;

}


</style>