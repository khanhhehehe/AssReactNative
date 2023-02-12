import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, Image, Switch } from 'react-native'
import React from 'react'
import { useState } from 'react'

const ManageShop = (props) => {
    const [id, setid] = useState(0)
    const [addNew, setaddNew] = useState(false)
    const [idShopUpdate, setidShopUpdate] = useState('')
    const [updateShop, setupdateShop] = useState(false)
    const [nameshop, setnameShop] = useState('')
    const [addressShop, setaddressShop] = useState('')
    const [phoneShop, setphoneShop] = useState('')
    const [logo, setLogo] = useState('./assets/shops.png')
    const [trangThai, settrangThai] = useState(true)
    const [listShop, setlistShop] = useState([])
    const toggleSwitch = () => settrangThai(!trangThai);
    const deleteShop = (itemId) => {
        console.log(itemId)
        Alert.alert('Xóa', 'Bạn chắc chắn muốn xóa không?', [
            {
                text: 'Cancel',
                onPress: () => { },
            },
            {
                text: 'OK', onPress: () => {
                    const newList = listShop.filter((item) => { return item.id !== itemId });
                    setlistShop(newList)
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
    const showShopUpdate = (editId) => {
        const editItem = listShop.find(item => item.id == editId);
        setupdateShop(true);
        setidShopUpdate(editId);
        setnameShop(editItem.nameShop)
        setaddressShop(editItem.address)
        setphoneShop(editItem.phoneNum)
        settrangThai(editItem.statusShop)
    }
    const addShop = () => {
        if(checkForm()){
            setid(id + 1)
            console.log(trangThai)
            setlistShop([...listShop, { id: id, nameShop: nameshop, address: addressShop, phoneNum: phoneShop, logoShop: '', statusShop: trangThai }])
            setaddNew(false)
            clearUseState()
            return;
        }
        
        
    }
    const checkForm =()=>{
        if(nameshop==''||addressShop==''||phoneShop==''||logo==''){
            Alert.alert('', 'Không được để trống dữ liệu', [
                {
                    text: 'OK', onPress: () => {}
                },
            ]);
            return false;
        }
        return true;

    }
    const clearUseState = () => {
        setnameShop('')
        setaddressShop('')
        setphoneShop('')
        settrangThai(true)
        setLogo('./assets/shops.png')
    }
    console.log(...listShop)
    return (
        <View style={styles.container}>
            <FlatList data={[...listShop]}
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
                                <TouchableOpacity onPress={() => showShopUpdate(item.id)}>
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
            <TouchableOpacity onPress={() => { setaddNew(true) }}>
                <Image
                    style={styles.add}
                    source={require('./assets/plus.png')} />
            </TouchableOpacity>
            <Modal visible={addNew} animationType='fade'>
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
                    />
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={trangThai ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={trangThai}
                    />
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
                    <TouchableOpacity style={[styles.btnOptions]} onPress={() => { setaddNew(false) }}>
                        <Text style={styles.textBtn}>Hủy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnOptions, { marginLeft: '2%' }]} onPress={() => { addShop() }}>
                        <Text style={styles.textBtn}>Lưu</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal visible={updateShop} animationType='fade'>
                <View style={styles.containerUpdate}>
                    <TextInput
                        style={styles.inputUpdate}
                        onChangeText={(text) => { setnameShop(text) }}
                        value={nameshop}
                        placeholder='Tên cửa hàng'
                    />
                    <TextInput
                        style={styles.inputUpdate}
                        onChangeText={(text) => { setphoneShop(text) }}
                        value={phoneShop}
                        placeholder='Số điện thoại'
                    />
                    <TextInput
                        style={styles.inputUpdate}
                        onChangeText={(text) => { setaddressShop(text) }}
                        value={addressShop}
                        placeholder='Địa chỉ'
                    />
                    <TextInput
                        style={styles.inputUpdate}
                        onChangeText={(text) => { setLogo(text) }}
                        value={logo}
                        placeholder='Ảnh cửa hàng'
                    />
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={trangThai ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={trangThai}
                    />
                    <View style={styles.boxSaveUpdate}>
                        <TouchableOpacity style={styles.btnSaveUpdate} onPress={() => { changeUpdate(idShopUpdate) }}>
                            <Text style={styles.textSaveUpdate}>Lưu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
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
    bgAdd: {
        padding: 10,
        flex: 1
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
    boxOptions: {
        flexDirection: 'row',
    },
    textBtn: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold'
    },
    imgPreview: {
        width: 200,
        height: 200
    },
    boxImgPre: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    },
    // update
    containerUpdate: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#9575CD'
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