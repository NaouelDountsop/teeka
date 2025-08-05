import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import BackgroundSvg from "@/assets/icon/icon4.svg";

export default function SvgFullWidth() {
  const { width } = useWindowDimensions();

  
  const heightMultiplier = 2;

  return (
    <View style={styles.container}>
      <BackgroundSvg
        width={width}
        height={width * heightMultiplier}
        preserveAspectRatio="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
