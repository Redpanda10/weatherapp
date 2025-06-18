import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

function City({ route }) {
  const { city } = route.params;

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9947f839752b4263c9e6c9f0a811e93e&units=metric`;
        const response = await fetch(API_URL);
        const data = await response.json();

        if (response.ok) {
          setWeatherData(data);
        } else {
          setError(data.message || 'Something went wrong');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather in {weatherData.name}, {weatherData.sys.country}</Text>
      <Text style={styles.text}>Temperature: {weatherData.main.temp} °C</Text>
      <Text style={styles.text}>Feels Like: {weatherData.main.feels_like} °C</Text>
      <Text style={styles.text}>Condition: {weatherData.weather[0].description}</Text>
      <Text style={styles.text}>Humidity: {weatherData.main.humidity} %</Text>
      <Text style={styles.text}>Pressure: {weatherData.main.pressure} hPa</Text>
      <Text style={styles.text}>Wind Speed: {weatherData.wind.speed} m/s</Text>
      <Text style={styles.text}>Wind Direction: {weatherData.wind.deg}°</Text>
      <Text style={styles.text}>Cloudiness: {weatherData.clouds.all} %</Text>
      <Text style={styles.text}>
        Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
      </Text>
      <Text style={styles.text}>
        Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1e90ff',
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default City;
