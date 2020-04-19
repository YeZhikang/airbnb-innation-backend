<template>
    <div class="management-container">
        <the-table
            class="container__table"
            :table-data="tableData"
            :operation-arr="operationArr"
            :col-label-arr="colNameArr"
        >
            <template v-slot:header>
                <div class="container__intro">
                    <div class="intro_item" v-for="(introItem,index) of introItems">
                        <h4>{{index}} :</h4>
                        <span>{{introItem}}</span>
                    </div>
                </div>
            </template>
            <template v-slot:tab>

                <div style="padding-bottom: 20px">
                    <isc-tabs v-model="activeName" @tab-click="handleClick">
                        <isc-tab-pane label="属性" name="attribute"></isc-tab-pane>
                        <isc-tab-pane label="事件" name="event"></isc-tab-pane>
                        <isc-tab-pane label="服务" name="service"></isc-tab-pane>
                    </isc-tabs>
                </div>
            </template>
        </the-table>
    </div>
</template>

<script>
    import TheTable from "../../../components/TheTable";
    export default {
        name: "ProductionManagementUnitCheck",
        components: {TheTable},
        data(){
            return{
                activeName: 'attribute',
                colNameArr: [],
                introItems: [
                    
                    {name: '产品名称',
                        value: '中央空调'},
                    
                    {
                        name: '驱动',
                        value: '驱动1'
                    },
                    {
                        name: '工厂',
                        value: '华为'
                    },
                    {
                        name: '型号',
                        value: 'HW001'
                    },
                    {
                        name: '子系统',
                        value: '温度'
                    },
                    {
                        name: '产品类型',
                        value: '空调'
                    } ],
                tableData: [],
                operationArr: [
                    {
                        name: '查看',

                    }
                ]
            }
        },
        methods:{
            pushBack(){
                this.$router.back()
            },
            changeTitle(){

            },
        },
        watch:{
            activeName: {
                handler: function (val) {
                    if(val === 'service'){
                        this.colNameArr = ['服务名称','服务标识','调用方式','描述']
                        this.tableData = [
                            {
                                serviceName: '车辆告警服务',
                                serviceIdentifier: 'VehAdvService',
                                stdcall: '异步',
                                description: '车辆告警服务'
                            }
                        ]
                    }else if(val === 'event'){
                        this.colNameArr = ['事件名称','事件标识','事件类型','描述']
                        this.tableData = [
                            {
                                eventName: '报警事件',
                                eventIdentifier: '事件标识',
                                eventCategory: '告警',
                                description: '车辆告警服务'
                            }
                        ]
                    }else{
                        this.colNameArr = ['属性名称','属性标识','属性类型','读写类型','描述']
                        this.tableData = [
                            {
                                attributeName: '当前温度',
                                attributeIdentifier: 'CurrentTemperature',
                                attributeCategory: 'int32（整型）',
                                mode: '只读',
                                description: '适用于温度读写，温度测量和吧啦吧啦吧啦',
                            }
                        ]
                    }
                },
                immediate: true
            }
        },
        mounted() {
            this.changeTitle()
        }
    }
</script>

<style scoped>
    .management-container{
        width: 100%;
    }
    .container__intro{
        padding: 20px 0 0;
        width: 70%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;

    }

    .container__intro > .intro_item{
        width: 33%;
    }
    .intro_item > h4,p,span{
        display: inline-block;
        padding-bottom: 20px;
    }
    .intro_item > h4{
        color: darkgrey;
        font-size: 14px;
        font-weight: 400;
        width: 120px;
        text-align: right;
    }

    .intro_item:first-child > h4{
        width: 80px;
        text-align: right;
    }

    .intro_item:nth-child(4) > h4{
        width: 80px;
        text-align: right;

    }

    .intro_item > span{
        color: #333333;
        padding-left: 40px;
    }
    >>>.cell{
        text-overflow: ellipsis;
        white-space:nowrap;
        overflow:hidden;
    }

    .container__sub-menu{
        position: fixed;
        left: 216px;
        height: 60px;
    }

</style>
