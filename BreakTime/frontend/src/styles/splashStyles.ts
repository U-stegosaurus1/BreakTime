import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  heroImage: {
    width: 280,
    height: 280,
    marginBottom: 20,
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  logo: {
    width: 42,
    height: 42,
    marginRight: 8,
  },

  title: {
    fontSize: 38,
    fontWeight: "700",
    color: "#111827",
  },

  greenText: {
    color: "#2ECC71",
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    marginBottom: 45,
  },

  button: {
    width: "100%",
    height: 56,
    borderRadius: 14,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#2ECC71",

    shadowColor: "#2ECC71",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 5,
    marginBottom: 28,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  loginText: {
    fontSize: 14,
    color: "#5B63D3",
    fontWeight: "500",
  },
});
