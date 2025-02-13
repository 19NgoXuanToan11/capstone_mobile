import { StyleSheet } from "react-native";

// Định nghĩa các màu chủ đạo
const colors = {
  primary: "#1976D2", // Màu xanh chính
  primaryDark: "#1565C0", // Màu xanh đậm
  primaryLight: "#BBDEFB", // Màu xanh nhạt
  secondary: "#E3F2FD", // Màu nền nhạt
  text: "#0D47A1", // Màu chữ đậm
  textLight: "#64B5F6", // Màu chữ nhạt
  background: "#F5F9FF", // Màu nền
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryLight,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
  },
  gradientButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postButtonText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "600",
  },
  searchContainer: {
    padding: 16,
    backgroundColor: "#fff",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary,
    paddingHorizontal: 12,
    borderRadius: 10,
    height: 40,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: colors.text,
  },
  content: {
    padding: 16,
  },
  exchangeCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  imageContainer: {
    position: "relative",
  },
  itemImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  conditionBadge: {
    position: "absolute",
    bottom: 8,
    left: 8,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  conditionText: {
    color: "#fff",
    fontSize: 12,
  },
  itemInfo: {
    padding: 16,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  exchangeFor: {
    marginTop: 12,
  },
  exchangeForTitle: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
  },
  wantedItemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  wantedItem: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  wantedItemText: {
    color: colors.primary,
    fontSize: 12,
  },
  itemFooter: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.primaryLight,
    paddingTop: 12,
  },
  owner: {
    flexDirection: "row",
    alignItems: "center",
  },
  ownerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
    borderWidth: 2,
    borderColor: colors.primaryLight,
  },
  ownerName: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: colors.textLight,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 12,
    color: colors.primary,
  },
});
