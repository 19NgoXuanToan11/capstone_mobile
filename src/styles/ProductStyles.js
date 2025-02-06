import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerButton: {
    padding: 8,
  },
  headerRight: {
    flexDirection: "row",
  },
  carouselContainer: {
    backgroundColor: "#f8f9fa",
  },
  carouselImage: {
    width: width,
    height: width,
    resizeMode: "cover",
  },
  productInfo: {
    padding: 16,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  condition: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
  },
  exchangeWishlist: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  wishItem: {
    backgroundColor: "#E8F1FA",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  wishText: {
    color: "#4A90E2",
    fontSize: 14,
  },
  ownerCard: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  ownerInfo: {
    flexDirection: "row",
    marginBottom: 16,
  },
  ownerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  ownerDetails: {
    flex: 1,
  },
  ownerName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  ownerStats: {
    flexDirection: "row",
    marginBottom: 4,
  },
  ownerStat: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  ownerStatText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  memberSince: {
    fontSize: 14,
    color: "#999",
  },
  viewProfileButton: {
    paddingVertical: 8,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
  },
  viewProfileText: {
    color: "#4A90E2",
    fontSize: 14,
    fontWeight: "500",
  },
  bottomBar: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  messageButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: "#E8F1FA",
  },
  messageButtonText: {
    color: "#4A90E2",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  exchangeButton: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#4A90E2",
  },
  exchangeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.7,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  modalCloseButton: {
    padding: 4,
  },
  myProductsList: {
    padding: 16,
  },
  myProductItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginBottom: 12,
  },
  myProductImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  myProductInfo: {
    flex: 1,
  },
  myProductTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  myProductCondition: {
    fontSize: 14,
    color: "#666",
  },
  emptyList: {
    padding: 24,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  addProductButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#E8F1FA",
    borderRadius: 20,
  },
  addProductText: {
    color: "#4A90E2",
    fontSize: 14,
    fontWeight: "500",
  },
  imageModalContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  imageModalCloseButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 8,
  },
  fullImage: {
    width: width,
    height: height,
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  lastSection: {
    marginBottom: 40,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  imageList: {
    flexDirection: "row",
    marginHorizontal: -8,
  },
  imageContainer: {
    position: "relative",
    margin: 8,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeImageButton: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  addImageButton: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  addImageText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fff",
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  exchangeItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  exchangeInput: {
    flex: 1,
    marginRight: 12,
  },
  removeExchangeButton: {
    padding: 4,
  },
  addExchangeButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  addExchangeText: {
    color: "#4A90E2",
    fontSize: 14,
    marginLeft: 8,
  },
  submitText: {
    color: "#4A90E2",
    fontSize: 16,
    fontWeight: "500",
  },
  disabledButton: {
    opacity: 0.5,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#FFF5F5",
    borderRadius: 8,
    marginBottom: 40,
  },
  deleteButtonText: {
    color: "#FF3B30",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
});
