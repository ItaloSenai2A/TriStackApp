import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

export default function SettingsScreen(){
    return(
         <SafeAreaView style={styles.container}>
            <Text style={styles.text}>⚙️ Ajuste suas Configurações</Text>
         </SafeAreaView>
    );
}

// Estilos de tela
const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: "center", alignItems: "center"},
    text: {fontSize: 24, fontWeight: "bold", marginBottom: 10},
});