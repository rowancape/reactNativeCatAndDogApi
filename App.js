import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  Dimensions,
  Button,
} from "react-native";

export default function App() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cats, setCats] = useState(true);

  const screenWidth = Dimensions.get("window").width;

  const fetchImage = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        cats
          ? "https://api.thecatapi.com/v1/images/search"
          : "https://api.thedogapi.com/v1/images/search"
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const json = await response.json();
      setImageUrl(json[0].url);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [cats]);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Image loading</Text>
        </>
      ) : (
        <>
          <Button
            title={cats ? "Want dogs instead?" : "Want cats instead?"}
            onPress={() => {
              setCats(!cats);
              fetchImage()
            }}
          />
          <Image
            source={{ uri: imageUrl }}
            style={{
              width: screenWidth - 20,
              height: screenWidth,
              marginBottom: 10,
              marginTop: 10,
            }}
          />
          <Button title="NEXT IMAGE" onPress={fetchImage} />
        </>
      )}
    </View>
  );
}
