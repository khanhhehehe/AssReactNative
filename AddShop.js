import { StyleSheet, Text, View, TextInput, Switch, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'

const AddShop = (props) => {
    const nav = props.navigation
    const route = props.route
    const [back, setBack] = useState(false)
    const [id, setid] = useState(route.params.list != undefined ? route.params.list.length : 0)
    const [listShop, setlistShop] = useState(route.params.list)
    const [nameshop, setnameShop] = useState('')
    const [addressShop, setaddressShop] = useState('')
    const [phoneShop, setphoneShop] = useState('')
    const [logo, setLogo] = useState('./assets/shops.png')
    const [trangThai, settrangThai] = useState(true)
    const toggleSwitch = () => settrangThai(!trangThai);
    const checkForm = () => {
        if (nameshop == '' || addressShop == '' || phoneShop == '' || logo == '') {
            Alert.alert('', 'Không được để trống dữ liệu', [
                {
                    text: 'OK', onPress: () => { }
                },
            ]);
            return false;
        }
        return true;

    }
    const addShop = () => {
        if (checkForm()) {
            setlistShop([...listShop, { id: id, nameShop: nameshop, address: addressShop, phoneNum: phoneShop, logoShop: logo, statusShop: trangThai }])
            clearUseState()
            setBack(true)
        }
    }
    const backManage = () => {
        nav.navigate('ManageShop', { listShop })
    }
    const clearUseState = () => {
        setnameShop('')
        setaddressShop('')
        setphoneShop('')
        settrangThai(true)
        setLogo('./assets/shops.png')
    }
    const cancelAdd = () => {
        nav.goBack()
    }
    if (back) {
        backManage()
    }
    return (
        <View style={styles.container}>
            <View style={styles.bgAdd}>
                <TextInput
                    style={styles.input}
                    onChangeText={setnameShop}
                    value={nameshop}
                    placeholder='Tên cửa hàng'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setphoneShop}
                    value={phoneShop}
                    keyboardType='numeric'
                    placeholder='Số điện thoại'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setaddressShop}
                    value={addressShop}
                    placeholder='Địa chỉ'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => { setLogo(text) }}
                    value={logo}
                    placeholder='Ảnh cửa hàng'
                    editable={false}
                />
                <View style={styles.boxSwitch}>
                    <View style={styles.switch}>
                        <Text style={styles.textSwitch}>Trạng thái</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#00C853' }}
                            thumbColor={trangThai ? '#69F0AE' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={trangThai}
                        />
                    </View>
                </View>
                <View style={styles.boxImgPre}>
                    <Image
                        style={styles.imgPreview}
                        source={require('./assets/shops.png')}
                    // source={{
                    //     uri: 'https://reactnative.dev/img/tiny_logo.png',
                    // }}
                    />
                </View>
            </View>
            <View style={styles.boxOptions}>
                <TouchableOpacity style={[styles.btnOptions]} onPress={cancelAdd}>
                    <Text style={styles.textBtn}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnOptions, { marginLeft: '2%' }]} onPress={() => { addShop() }}>
                    <Text style={styles.textBtn}>Lưu</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddShop

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    imgPreview: {
        width: 200,
        height: 200
    },
    textBtn: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold'
    },
    boxOptions: {
        flexDirection: 'row',
    },
    btnOptions: {
        padding: 12,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#3D5AFE',
        width: '48.8%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bgAdd: {
        padding: 10,
    },
    boxImgPre: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    },
    switch: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#B2EBF2',
        paddingRight:13,
        marginLeft:10,
        borderWidth:1
    },
    textSwitch: {
        marginLeft: 12,
        color: '#01579B',
        fontSize: 20,
        fontWeight: 'bold'
    },
    boxSwitch:{
        flexDirection:'row',
        justifyContent:'flex-start',
    }
})