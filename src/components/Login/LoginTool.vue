<template>
  <div>
    <div class="wrapper">
        <div class="card-switch">
            <label class="switch">
               <input type="checkbox" class="toggle">
               <span class="slider"></span>
               <span class="card-side"></span>
               <div class="flip-card__inner">
                  <div class="flip-card__front" :model="loginInfo">
                     <div class="title">
                      <p class="title_A">登录</p>
                     </div>
                     <form class="flip-card__form" action="">
                        <input class="flip-card__input1" v-model="loginInfo.username" name="username" placeholder="用户名" type="username">
                        <input class="flip-card__input1" v-model="loginInfo.password" name="password" placeholder="密码" type="password">
                        <div class="flip-card__btn " @click="submitLoginForm">
                        <i class="a">确定</i>
                        </div>
                      </form>
                  </div>




                  <div class="flip-card__back" :model="regInfo" :rules="rules2">
                    <div class="title">
                      <p class="title_A">注册</p>
                     </div>
                     <form class="flip-card__form" action="">
                        <input class="flip-card__input1" v-model="regInfo.username" name="username" placeholder="用户名" type="username">
                        <input class="flip-card__input1" v-model="regInfo.phonenum" name="phonenum" placeholder="手机号" type="phonenum">
                        <input class="flip-card__input1" v-model="regInfo.password" name="password" placeholder="密码" type="password">
                          <div>
                        <button class="flip-card__btn" @click="submitRegForm">确定</button>
                          </div>
                      </form>
                  </div>
               </div>



              </label>
        </div>   
   </div>
  </div>
</template>

<script>
export default {
        data(){
          return{
            nextt:'false',
            tableData:[],
            a:0,
          loginInfo:{
                username:"",
                password:"",
          },
          regInfo:{
              username:"",
              password:"",
              phonenum:"",
              flag:""
          }
        }
        },
        components:{
        },
        beforeRouteEnter(to,from,next){
            if(true) {next()};
        },
        methods:{
            submitRegForm(){
                let _username=this.regInfo.username;
                let _password=this.regInfo.password;
                let _phonenum=this.regInfo.phonenum;
                this.$http.post('/user/reg',{
                    username:  _username,
                    password: _password,
                    phonenum: _phonenum
                })
          
            },
            submitLoginForm(){
                let _username = this.loginInfo.username;
                let _password = this.loginInfo.password;
            
                let _this = this;
                if(_username==="" || _password===""){
                  alert("用户名为空或密码为空,请重新输入!");

                }else{
                this.$http.post('/user/login',{
                    username:  _username,
                    password: _password,
                }).then(function(response){
                      if(response.data==true){
                            _this.$router.push('management');
                      }else{
                        alert("用户名或密码错误!");
                      }
                })
              }
            }
        },
}
</script>

<style lang="css" scoped>
.wrapper h1{
  height:100px;
}

.a{
  position:relative;
  top:5px;
}

.wrapper {
    width:100%;
    height:980px;
  --input-focus: #2d8cf0;
  --font-color: #323232;
  --font-color-sub: #666;
  --bg-color: #fff;
  --bg-color-alt: #666;
  --main-color: #323232;
    /* display: flex; */
    /* flex-direction: column; */
    /* align-items: center; */
}
/* switch card */
.switch {
  transform: translateY(-200px);
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left:51%;
  top:55%;
  gap: 30px;
  width: 50px;
  height: 20px;
}

.card-side::before {
  position: absolute;
  content: '登录';
  left: -100px;
  top: 0;
  width: 100px;
  font-size:25px;
  text-decoration: underline;
  color: var(--font-color);
  font-weight: 600;
  font-family:alimama;
  pointer-events: none;
}

.card-side::after {
  position: absolute;
  content: ' 注册';
  left: 100px;
  top: 0px;
  font-size:25px;
  width: 100px;
  text-decoration: none;
  color: var(--font-color);
  font-weight: 600;
  font-family:alimama;
  pointer-events: none;
}

.toggle {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  box-sizing: border-box;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--bg-colorcolor);
  transition: 0.3s;

}

.slider:before {
  box-sizing: border-box;
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  border: 2px solid var(--main-color);
  border-radius: 5px;
  left: -2px;
  bottom: 2px;
  background-color: var(--bg-color);
  box-shadow: 0 3px 0 var(--main-color);
  transition: 0.3s;

}

.toggle:checked + .slider {
  background-color: var(--input-focus);
}

.toggle:checked + .slider:before {
  transform: translateX(30px);
}

.toggle:checked ~ .card-side:before {
  text-decoration: none;
}

.toggle:checked ~ .card-side:after {
  text-decoration: underline;
}
 
.title_A{
  position: relative;
  top:-20%;
  font-size:50px;
}

.flip-card__inner {
  width: 300px;
  height: 350px;
  position: relative;
  background-color: transparent;
  perspective: 1000px;
    /* width: 100%;
    height: 100%; */
  text-align: center;
  transition: transform 1.6s;
  transform-style: preserve-3d;
  pointer-events: none;
}



.toggle:checked ~ .flip-card__inner {
  transform: rotateY(180deg);
  pointer-events: auto;
}

.toggle:checked ~ .flip-card__front {
  box-shadow: none;
  pointer-events: auto;
}

.flip-card__front, .flip-card__back {
  padding: 20px;
  position: absolute;
  height:500px;
  width:500px;
  left:-33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background: rgba(211,211,211,0.7);
  gap: 20px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
  pointer-events: auto;
}

.flip-card__back {
  height:500px;
  width:500px;
  transform: rotateY(180deg);
  pointer-events: none;
}

.flip-card__front {
  pointer-events: none;
}

.flip-card__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  pointer-events: none;

}

.title {
  margin: 20px 0 20px 0;
  font-weight: 300;
  text-align: center;
  color: var(--main-color);
  font-family:youshe;

}





.flip-card__input1 {
  width: 350px;
  height: 60px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 25px;
  font-weight: 600;
  color: var(--font-color);
  padding: 5px 10px;
  outline: none;
  pointer-events: auto;
}

.flip-card__input::placeholder {
  color: var(--font-color-sub);
  opacity: 0.8;

}

.flip-card__input:focus {
  border: 2px solid var(--input-focus);

}

.flip-card__btn:active, .button-confirm:active {
  box-shadow: 0px 0px var(--main-color);
  transform: translate(3px, 3px);

}

.flip-card__btn {
  margin: 20px 0 20px 0;
  width: 120px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 17px;
  font-weight: 600;
  color: var(--font-color);
  cursor: pointer;
  pointer-events: auto;
} 
</style>