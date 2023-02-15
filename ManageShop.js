import { FlatList, StyleSheet, Text, TouchableOpacity, View, Alert, Image } from 'react-native'
import React from 'react'
import { useState } from 'react'

const ManageShop = (props) => {
    const nav = props.navigation;
    const route = props.route;
    const [renderAgain, setrenderAgain] = useState(false)
    const deleteShop = (itemId) => {
        Alert.alert('Xóa', 'Bạn chắc chắn muốn xóa không?', [
            {
                text: 'Cancel',
                onPress: () => { },
            },
            {
                text: 'OK', onPress: () => {
                    const newList = route.params.listShop.filter((item) => { return item.id !== itemId });
                    route.params.listShop = newList
                    setrenderAgain(!renderAgain)
                }
            },
        ]);
    }
    const changeUpdate = (editId) => {
        if(checkForm()){
            const newEditList = listShop.map(item => {
                if (item.id == editId) {
                    item.nameShop = nameshop;
                    item.address = addressShop;
                    item.phoneNum = phoneShop;
                    item.logoShop = logo;
                    item.statusShop = trangThai
                }
                return item
            })
            setlistShop(newEditList)
            setupdateShop(false)
            clearUseState('')
        }
    }
    const changeUpdateShop=(item)=>{
        nav.navigate('UpdateShop',{list: [...route.params.listShop],item: item})
    }
    const showShopUpdate = (editId) => {
        const editItem = listShop.find(item => item.id == editId);
        setupdateShop(true);
        setidShopUpdate(editId);
        setnameShop(editItem.nameShop)
        setaddressShop(editItem.address)
        setphoneShop(editItem.phoneNum)
        settrangThai(editItem.statusShop)
    }
    
    const changeAddShop=()=>{
        nav.navigate('AddShop',{list:[...route.params.listShop]})
    }
    console.log(route.params.listShop)
    return (
        <View style={styles.container}>
            <FlatList data={route.params.listShop}
                renderItem={({ item }) => <>
                    <TouchableOpacity style={styles.boxItem}>
                        <Image
                            style={styles.imgItem}
                            source={require('./assets/shops.png')} />
                        <View>
                            <View style={styles.boxStatus}>
                                {
                                item.statusShop?<View style={styles.statusChecked}></View>:<View style={styles.statusNChecked}></View>
                                }
                                <Text style={styles.text}>{item.nameShop}</Text>
                            </View>
                            <Text style={styles.textNum}>{item.address}</Text>
                            <Text style={styles.textNum2}>{item.phoneNum}</Text>
                            <View style={styles.boxSetting}>
                                <TouchableOpacity onPress={()=>changeUpdateShop(item)}>
                                    <Image
                                        style={styles.fix}
                                        source={require('./assets/setting.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteShop(item.id)}>
                                    <Image
                                        style={styles.fix}
                                        source={require('./assets/delete.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </>}
                keyExtractor={(item) => item.id} />
            <TouchableOpacity onPress={changeAddShop}>
                <Image
                    style={styles.add}
                    source={require('./assets/plus.png')} />
            </TouchableOpacity>
        </View>
    )
}
export default ManageShop

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        flex: 1
    },
    
    imgItem: {
        height: 80,
        width: 80,
        marginRight: 10
    },
    boxItem: {
        flexDirection: 'row',
        backgroundColor: '#303F9F',
        padding: 10,
        borderRadius: 10,
        marginBottom: 15
    },
    text: {
        color: '#fff',
        fontSize: 27,
        fontWeight: 'bold',
    },
    textNum: {
        color: '#fff',
        fontSize: 19,
        fontWeight: '700'
    },
    textNum2: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700'
    },
    statusChecked: {
        width: 17,
        height: 17,
        backgroundColor: '#00E676',
        borderRadius: 10,
        marginRight: 5
    },
    statusNChecked: {
        width: 17,
        height: 17,
        backgroundColor: '#FF5252',
        borderRadius: 10,
        marginRight: 5
    },
    boxStatus: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    fix: {
        width: 24,
        height: 24,
        marginLeft: 10
    },
    boxSetting: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '85%'
    },
    add: {
        width: 50,
        height: 50
    },
})