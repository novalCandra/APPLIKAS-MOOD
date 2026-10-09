import { Alert, Animated, Image, LayoutChangeEvent, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const OPTIONS = [
  {
    key: 'happy', emoji: '😊', label: 'Happy', gif: require("@/assets/images/maskot/happy-bear-transparent.gif"),
    bg: '#FEF3C7', accent: '#F59E0B', border: '#FACC15', bgButton: "#58CC02", dec: "FULL ENEGRY", color: "#FFFF"
  },
  {
    key: 'tired', emoji: '😴', label: 'Tired', gif: require("@/assets/images/maskot/sleepy-bear-transparent.gif"),
    bg: '#DBEAFE', accent: '#3B82F6', border: '#93C5FD', bgButton: "#3B82F6", dec: "Tired ENEGRY", color: "#FFFF"
  },
  {
    key: 'angry', emoji: '😠', label: 'Angry', gif: require("@/assets/images/maskot/angry-character-transparent.gif"),
    bg: '#FEE2E2', accent: '#EF4444', border: '#FCA5A5', bgButton: "#EF4444", dec: "ANGRY ENEGRY", color: "#FFFF"
  },
];

const PADDING: number = 6
export default function HomeScreen() {
  const [stateModal, setmodalState] = useState<boolean>(false);
  const [selected, SetSelected] = useState<number>(0);
  const [traichWidth, setTraichWidth] = useState<number>(0);
  const translateX = useRef(new Animated.Value(0)).current
  const slotWidth = traichWidth ? (traichWidth - PADDING * 2) / OPTIONS.length : 0;

  const onLayouts = (e: LayoutChangeEvent) => setTraichWidth(e.nativeEvent.layout.width - 6);
  const current = OPTIONS[selected]
  const handlePress = (index: number) => {
    SetSelected(index);
    Animated.spring(translateX, {
      toValue: index * slotWidth,
      useNativeDriver: true,
      friction: 8
    }).start()
  }
  return (
    <ThemedView style={[styles.container, { backgroundColor: current.bg }]}>
      <View style={styles.containerStyleView}>
        <Text style={styles.styleSpanText}>🌟 Quick Reflection</Text>
        <Text style={styles.styleHeading}>How are you feeling today?</Text>
        <Text style={styles.styleDeskipsion}>Full of sunshine and ready to roll! ☀️</Text>
        <Image source={current.gif} style={styles.styleImage} />
        {slotWidth > 1 && (
          <Text style={[styles.styleSpanTextDesc, { color: current.accent, borderColor: current.border }]}>{OPTIONS[selected].emoji} {OPTIONS[selected].label}</Text>
        )}

        <Text style={[styles.textDeskripsiButton, { borderColor: current.border, color: current.border }]}>{current.dec}</Text>

        <View>
          <View style={[styles.styleViewRadio]}>
            {OPTIONS.map((o, i) => (
              <Pressable key={o.key}>
                <Text style={styles.styleTextRadio}>{o.emoji} {o.label}</Text>
              </Pressable>
            ))}
          </View>


          {/* Track */}
          <View style={styles.styleTrack} onLayout={onLayouts}>
            {OPTIONS.map((o, i) => (
              <Pressable key={o.key} style={styles.styleSlot} onPress={() => handlePress(i)}>
                {selected !== i && <View style={styles.styleDot} />}
              </Pressable>
            ))}

            {/* Sliding Thumb */}
            {slotWidth > 1 && (
              <Animated.View
                pointerEvents={"none"}
                style={[styles.styleThumb, { width: slotWidth, transform: [{ translateX }] }]}>
                <Text style={styles.thumbEmoji}>{OPTIONS[selected].emoji}</Text>
              </Animated.View>
            )}
          </View>

          <View style={styles.styleJarakGap}>
            <Text style={styles.styletextColorParagraf}>Drag slider or tap any mood to snap</Text>
          </View>


          <SafeAreaView>
            <Modal animationType='slide' transparent={true} visible={stateModal} onRequestClose={() => {
              Alert.alert(`WIHHH SEMANGAT YAHHH`)
              setmodalState(!stateModal)
            }}>
              <View style={styles.styleModalBlue}>
                <View style={{ backgroundColor: "#FFFDF7", width: "auto", height: 300, opacity: 1, borderRadius: 10, padding: 20 }}>
                  <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 10 }}>
                    <Text style={styles.thumbEmoji}>{OPTIONS[selected].emoji}</Text>
                    <Text style={{ fontFamily: "Fredoka-Semibold", backgroundColor: "#bcbec1", color: "#1E293B", padding: 6, borderRadius: 10, textAlign: "center" }}>MOOD LOGGED</Text>
                    <Text style={{ fontFamily: "Fredoka-Bold", fontSize: 28, width: 200, textAlign: "center" }}>
                      You are feeling <Text style={{ color: current.border }}>{current.label}</Text>!
                    </Text>
                    <Text style={{ textAlign: "center", fontFamily: "Fredoka-Semibold", color: "#64748B" }}>
                      Keep shining and share your positive energy with someone today!
                    </Text>
                  </View>
                  <Pressable onPress={() => setmodalState(!stateModal)}>
                    <Text style={[styles.styleButtonContinues, { backgroundColor: current.bgButton }]}>
                      AWESOME
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <Pressable onPress={() => setmodalState(true)}>
              <Text style={[styles.styleButtonContinues, { backgroundColor: current.bgButton }]}>
                CONTINUES
              </Text>
            </Pressable>
          </SafeAreaView>

        </View>



      </View>

    </ThemedView>
  );
}


const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#FEF3C7"
  },
  containerStyleView: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  styleSpanText: {
    color: "#64748B",
    width: 160,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#FFFDF7",
    fontFamily: "Fredoka-Medium",
    textTransform: "uppercase"
  },
  styleHeading: {
    fontSize: 30,
    width: 300,
    textAlign: "center",
    fontFamily: "Fredoka-Bold"
  },
  styleDeskipsion: {
    color: "#64748B",
    fontFamily: "Fredoka-Regular",
    textAlign: "center"
  },
  styleImage: {
    width: 300,
    height: 220
  },
  styleButton: {
    backgroundColor: "#FFFDF7",
    color: "#F59E0B",
  },


  styleSpanTextDesc: {
    backgroundColor: "#FFFDF7",
    color: "#F59E0B",
    width: 120,
    borderRadius: 10,
    height: 42,
    padding: 6,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Fredoka-Bold",
    borderWidth: 2,
    borderColor: "#FACC15",
  },

  textDeskripsiButton: {
    fontFamily: "Fredoka-Semibold",
    color: "#F59E0B"
  },

  styleViewRadio: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 300,
    padding: 6,
  },

  styleTextRadio: {
    fontFamily: "Fredoka-Semibold",
    color: "#64748B"
  },

  styleTrack: {
    flexDirection: "row",
    height: 64,
    padding: PADDING,
    borderRadius: 28,
    backgroundColor: "#E2E8F0",
    borderWidth: 3,
    borderColor: "#CBD5E1"
  },
  styleSlot: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  styleDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#94A3B8"
  },
  styleThumb: {
    position: "absolute",
    left: PADDING,
    top: PADDING,
    borderRadius: 22,
    backgroundColor: "white",
    margin: "auto",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5
  },
  thumbEmoji: {
    fontSize: 36
  },
  styletextColorParagraf: {
    marginTop: 14,
    fontFamily: "Fredoka-Medium",
    textAlign: "center",
    color: "#64748B"
  },
  styleButtonContinues: {
    marginTop: 10,
    backgroundColor: "#58CC02",
    shadowColor: '#57f005',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
    textAlign: "center",
    fontFamily: "Fredoka-Bold",
    color: "white",
    borderRadius: 10,
    height: 40,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  styleJarakGap: {
    gap: 10,
  },
  styleModalBlue: {
    display: "flex", flex: 1, flexDirection: "column", padding: 10, justifyContent: "center", minHeight: "auto", margin: "auto", width: 350, backgroundColor: "black", opacity: 0.8, borderRadius: 20
  }
});
