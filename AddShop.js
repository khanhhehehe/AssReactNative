import { StyleSheet, Text, View, TextInput, Switch, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { API_SHOPS } from './api'
import * as ImagePicker from 'expo-image-picker'
import DefaultImage from './assets/shops.png'

const AddShop = (props) => {
    const nav = props.navigation
    const DEFAULT_IMAGE = Image.resolveAssetSource(DefaultImage).uri;
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
    const [nameShop, setnameShop] = useState('')
    const [address, setaddressShop] = useState('')
    const [phoneNum, setphoneShop] = useState('')
    const [logoShop, setLogo] = useState(DEFAULT_IMAGE)
    const [statusShop, settrangThai] = useState(true)
    const toggleSwitch = () => settrangThai(!statusShop);
    const checkForm = () => {
        if (!nameShop || !address || !phoneNum) {
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
            let newObj = { nameShop, address, phoneNum, logoShop, statusShop }
            fetch(API_SHOPS, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(newObj)
            }).catch((error) => { console.error(); }).then((res) => nav.goBack())
        }
    }
    const cancelAdd = () => {
        nav.goBack()
    }

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);
    const chooseImg = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setLogo(result.assets[0].uri);
        }
    }
    if (hasGalleryPermission === false) {
        return <Text>No access to Internal Storage</Text>
    }
    return (
        <View style={styles.container}>
            <View style={styles.bgAdd}>
                <TextInput
                    style={styles.input}
                    onChangeText={setnameShop}
                    value={nameShop}
                    placeholder='Tên cửa hàng'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setphoneShop}
                    value={phoneNum}
                    keyboardType='numeric'
                    placeholder='Số điện thoại'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setaddressShop}
                    value={address}
                    placeholder='Địa chỉ'
                />
                <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                    <TouchableOpacity style={{ padding: 10, backgroundColor: '#5C6BC0',marginLeft:10 }} onPress={chooseImg}>
                        <Text style={{color:'#fff',fontWeight:'bold',fontSize:15}}>Chọn ảnh cửa hàng</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.boxSwitch}>
                    <View style={styles.switch}>
                        <Text style={styles.textSwitch}>Trạng thái</Text>
                        <Switch
                            trackColor={{ false: '#F44336', true: '#00C853' }}
                            thumbColor={statusShop ? '#69F0AE' : '#FF8A80'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={statusShop}
                        />
                    </View>
                </View>
                <View style={styles.boxImgPre}>
                    {logoShop && <Image source={{ uri: logoShop }} style={styles.imgPreview} />}
                </View>
            </View>
            <View style={styles.boxOptions}>
                <TouchableOpacity style={[styles.btnOptions]} onPress={cancelAdd}>
                    <Text style={styles.textBtn}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnOptions, { marginLeft: '2%' }]} onPress={() => { addShop() }}>
                    <Text style={styles.textBtn}>Thêm</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddShop

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#F9FBE7'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor:'#fff'
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
        flex:1,
        padding: 10,
    },
    boxImgPre: {
        alignItems: 'center',
        justifyContent: 'center',
        padding:8,
        backgroundColor:'#fff'
    },
    switch: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B2EBF2',
        paddingRight: 13,
        marginLeft: 10,
        flexDirection:'row'
    },
    textSwitch: {
        marginLeft: 12,
        color: '#01579B',
        fontSize: 20,
        fontWeight: 'bold',
    },
    boxSwitch: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop:10,
        marginBottom:25
    }
})