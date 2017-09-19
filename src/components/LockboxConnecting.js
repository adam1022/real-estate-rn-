import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { BleManager } from "react-native-ble-plx";
import { HText } from "./common";
import Styles from "../assets/Styles";
import Colors from "../assets/Colors";
import Images from "../assets/Images";

// BLE-PLX GUIDE: https://polidea.github.io/react-native-ble-plx/

// SHORT EXAMPLE: https://www.polidea.com/blog/ReactNative_and_Bluetooth_to_An_Other_level/

class LockboxConnecting extends React.Component {
  constructor(props) {
    super(props);
    this.serial = "123456789";
    /*
    USER will pass the serial being input upon completion of AddLockbox screen (before this one)

    this.serial = this.props.navigation.state.params.serial

    Need to convert serial into device-id (see scanAndConnect below)

    */

    console.log(`THIS.SERIAL`, this.serial);

    // only one instance of BleManager is permitted
    this.manager = new BleManager();

    // MUST call this.manager.destroy() to free all resources
  }

  componentWillMount() {
    const subscription = this.manager.onStateChange(state => {
      if (state === "PoweredOn") {
        this.scanAndConnect();
        subscription.remove();
      }
    }, true);
  }

  scanAndConnect = () => {
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(`ERROR SCANNING AND CONNECTING BLE`, error);

        // Handle error (scanning will be stopped automatically)
        return;
      }

      console.log(`DEVICE`, device);
      console.log(`device.id`, device.id);

      // Check if device with matching serial is broadcasting
      // not sure what the callback data will be for 'device' and its serial, but you get the picture

      /*

      device response object structure is:

      id :"11379D88-FDDB-46ED-BFD2-FACAB72E9ACA",
      isConnectable: true,
      manufacturerData: null,
      name: null, 
      overflowServiceUUIDs: null,
      rssi: -98,
      serviceData: null,
      serviceUUIDs: null,
      solicitedServiceUUIDs: null,
      txPowerLevel: null

      */
      if (device.name === "15 MBP") {
        // Stop scanning
        this.manager.stopDeviceScan();
        device
          .connect()
          .then(device => {
            // Proceed with connection.
            return device.discoverAllServicesAndCharacteristics();
          })
          .then(this.handleDeviceServices)
          .catch(err => console.log(`ERR CONNECTING`, err));
      }
    });
  };

  handleDeviceServices = device => {
    console.log("HANDLING DEVICE SERVICES", device);
  };

  render() {
    return (
      <View
        style={[
          Styles.flex1,
          Styles.centerAll,
          { backgroundColor: Colors.black }
        ]}
      >
        <HText
          text={"Searching for lockbox..."}
          color={"white"}
          size={1}
          mB={5}
          style={{ width: 150, textAlign: "center", fontWeight: "600" }}
        />
        <Image source={Images.lockboxImage} />
      </View>
    );
  }
}

export { LockboxConnecting };
