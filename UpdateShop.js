import { StyleSheet, Text, View, TextInput, Switch, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useState } from 'react'

const UpdateShop = (props) => {
    const nav = props.navigation
    const route = props.route
    const [statusUpdate, setstatusUpdate] = useState(false)
    const [listShop, setlistShop] = useState(route.params.list)
    const [nameshopNew, setnameShopNew] = useState(route.params.item.nameShop)
    const [addressShopNew, setaddressShopNew] = useState(route.params.item.address)
    const [phoneShopNew, setphoneShopNew] = useState(route.params.item.phoneNum)
    const [trangThaiNew, settrangThaiNew] = useState(route.params.item.statusShop)
    const [logo, setLogo] = useState(route.params.item.logoShop)
    const toggleSwitch = () => settrangThaiNew(!trangThaiNew);
    const changeUpdate = () => {
        if (checkForm()) {
            const newEditList = listShop.map(item => {
                if (item.id == route.params.item.id) {
                    item.nameShop = nameshopNew;
                    item.address = addressShopNew;
                    item.phoneNum = phoneShopNew;
                    item.logoShop = logo;
                    item.statusShop = trangThaiNew
                }
                return item
            })
            setlistShop(newEditList)
            clearUseState('')
            setstatusUpdate(!statusUpdate)
        }
    }
    const clearUseState = () => {
        setnameShopNew('')
        setaddressShopNew('')
        setphoneShopNew('')
        settrangThaiNew(true)
        setLogo('./assets/shops.png')
    }
    const checkForm = () => {
        if (nameshopNew == '' || addressShopNew == '' || phoneShopNew == '' || logo == '') {
            Alert.alert('', 'Không được để trống dữ liệu', [
                {
                    text: 'OK', onPress: () => { }
                },
            ]);
            return false;
        }
        return true;

    }
    if(statusUpdate){
        nav.navigate('ManageShop',{listShop})
    }
    return (
        <View style={styles.containerUpdate}>
            <View>
                <TextInput
                    style={styles.inputUpdate}
                    onChangeText={(text) => { setnameShopNew(text) }}
                    value={nameshopNew}
                    placeholder='Tên cửa hàng'
                />
                <TextInput
                    style={styles.inputUpdate}
                    onChangeText={(text) => { setphoneShopNew(text) }}
                    value={phoneShopNew}
                    placeholder='Số điện thoại'
                />
                <TextInput
                    style={styles.inputUpdate}
                    onChangeText={(text) => { setaddressShopNew(text) }}
                    value={addressShopNew}
                    placeholder='Địa chỉ'
                />
                <TextInput
                    style={styles.inputUpdate}
                    onChangeText={(text) => { setLogo(text) }}
                    value={logo}
                    placeholder='Ảnh cửa hàng'
                    editable={false}
                />
                <Switch
                    trackColor={{ false: '#767577', true: '#00C853' }}
                    thumbColor={trangThaiNew ? '#69F0AE' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={trangThaiNew}
                />
                <View style={styles.boxSaveUpdate}>
                    <TouchableOpacity style={styles.btnSaveUpdate} onPress={() => { changeUpdate() }}>
                        <Text style={styles.textSaveUpdate}>Lưu</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default UpdateShop

const styles = StyleSheet.create({
    containerUpdate: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#9575CD',
        flex: 1
    },
    inputUpdate: {
        marginVertical: 8,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#fff'
    },
    btnSaveUpdate: {
        borderRadius: 10,
        backgroundColor: '#0277BD',
        padding: 10,
    },
    boxSaveUpdate: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    textSaveUpdate: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    }
})