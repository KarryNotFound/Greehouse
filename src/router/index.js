import Vue from "vue"
import VueRouter from "vue-router"
import Screen from "../components/BigScreen/Screen.vue"
import Login from "@/components/Login/Login.vue"
import Management from "../components/Management/Management.vue"
import Buttomm from "../components/tools/buttomm.vue"

import NavigateMenu from "@/components/tools/NavigateMenu.vue"
import RunningState from "@/components/DeviceManagement/RunningState.vue"
import HistoryData from "@/components/DeviceManagement/HistoryData.vue"
import MonitorStatus from "@/components/DeviceManagement/MonitorStatus.vue"
import Monitoring2 from "@/components/Management/Monitoring2.vue"
import Monitoring3 from "@/components/Management/Monitoring3.vue"
import Warning from "@/components/Management/Warning.vue"
import Test11 from "@/components/tools/test11.vue"
import BigModel from "@/components/tools/BigModel.vue"
import Test12 from "@/components/tools/test12.vue"
import Test13 from "@/components/tools/test13.vue"
import BigMode2 from "@/components/tools/BigMode2.vue"

Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        {path:"/",redirect:"/screen"},
        {path:"/screen",component:Screen},
        {path:"/login",component:Login},
        {path:"/management",component:Management,
            children:[
                {path:"1",component:RunningState},
                {path:"2",component:MonitorStatus},
                {path:"3",component:HistoryData},
                {path:"4",component:Warning},
                {path:"5",component:Monitoring3},
                {path:"6",component:BigModel},
                {path:"7",component:BigMode2}
            ]
        },
    ]
})

export default router