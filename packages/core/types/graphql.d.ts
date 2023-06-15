export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: any
  BigDecimal: any
  Long: any
}

export type AddWishlistItemsInput = {
  entityId: Scalars["Int"]
  items: Array<WishlistItemInput>
}

export type AddWishlistItemsResult = {
  __typename?: "AddWishlistItemsResult"
  result: Wishlist
}

export type CreateWishlistInput = {
  name: Scalars["String"]
  isPublic: Scalars["Boolean"]
  items?: Maybe<Array<WishlistItemInput>>
}

export type CreateWishlistResult = {
  __typename?: "CreateWishlistResult"
  result: Wishlist
}

export type DeleteWishlistItemsInput = {
  entityId: Scalars["Int"]
  itemEntityIds: Array<Scalars["Int"]>
}

export type DeleteWishlistItemsResult = {
  __typename?: "DeleteWishlistItemsResult"
  result: Wishlist
}

export type DeleteWishlistResult = {
  __typename?: "DeleteWishlistResult"
  result: Scalars["String"]
}

export type DeleteWishlistsInput = {
  entityIds: Array<Scalars["Int"]>
}

export type LoginResult = {
  __typename?: "LoginResult"
  /** @deprecated Use customer node instead. */
  result: Scalars["String"]
  customer?: Maybe<Customer>
}

export type LogoutResult = {
  __typename?: "LogoutResult"
  result: Scalars["String"]
}

export type Mutation = {
  __typename?: "Mutation"
  login: LoginResult
  logout: LogoutResult
  wishlist: WishlistMutations
}

export type MutationLoginArgs = {
  email: Scalars["String"]
  password: Scalars["String"]
}

export type UpdateWishlistInput = {
  entityId: Scalars["Int"]
  data: WishlistUpdateDataInput
}

export type UpdateWishlistResult = {
  __typename?: "UpdateWishlistResult"
  result: Wishlist
}

export type WishlistItemInput = {
  productEntityId: Scalars["Int"]
  variantEntityId?: Maybe<Scalars["Int"]>
}

export type WishlistMutations = {
  __typename?: "WishlistMutations"
  createWishlist?: Maybe<CreateWishlistResult>
  addWishlistItems?: Maybe<AddWishlistItemsResult>
  deleteWishlistItems?: Maybe<DeleteWishlistItemsResult>
  updateWishlist?: Maybe<UpdateWishlistResult>
  deleteWishlists?: Maybe<DeleteWishlistResult>
}

export type WishlistMutationsCreateWishlistArgs = {
  input: CreateWishlistInput
}

export type WishlistMutationsAddWishlistItemsArgs = {
  input: AddWishlistItemsInput
}

export type WishlistMutationsDeleteWishlistItemsArgs = {
  input: DeleteWishlistItemsInput
}

export type WishlistMutationsUpdateWishlistArgs = {
  input: UpdateWishlistInput
}

export type WishlistMutationsDeleteWishlistsArgs = {
  input: DeleteWishlistsInput
}

export type WishlistUpdateDataInput = {
  name?: Maybe<Scalars["String"]>
  isPublic?: Maybe<Scalars["Boolean"]>
}

export type Aggregated = {
  __typename?: "Aggregated"
  availableToSell: Scalars["Long"]
  warningLevel: Scalars["Int"]
}

export type AggregatedInventory = {
  __typename?: "AggregatedInventory"
  availableToSell: Scalars["Int"]
  warningLevel: Scalars["Int"]
}

export type Author = {
  __typename?: "Author"
  name: Scalars["String"]
}

export type Brand = Node & {
  __typename?: "Brand"
  id: Scalars["ID"]
  entityId: Scalars["Int"]
  name: Scalars["String"]
  defaultImage?: Maybe<Image>
  /** @deprecated Use SEO details instead. */
  pageTitle: Scalars["String"]
  /** @deprecated Use SEO details instead. */
  metaDesc: Scalars["String"]
  /** @deprecated Use SEO details instead. */
  metaKeywords: Array<Scalars["String"]>
  seo: SeoDetails
  searchKeywords: Array<Scalars["String"]>
  path: Scalars["String"]
  products: ProductConnection
  metafields: MetafieldConnection
}

export type BrandProductsArgs = {
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
  hideOutOfStock?: Maybe<Scalars["Boolean"]>
}

export type BrandMetafieldsArgs = {
  namespace: Scalars["String"]
  keys?: Maybe<Array<Scalars["String"]>>
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
}

export type BrandConnection = {
  __typename?: "BrandConnection"
  pageInfo: PageInfo
  edges?: Maybe<Array<Maybe<BrandEdge>>>
}

export type BrandEdge = {
  __typename?: "BrandEdge"
  node: Brand
  cursor: Scalars["String"]
}

export type Breadcrumb = {
  __typename?: "Breadcrumb"
  entityId: Scalars["Int"]
  name: Scalars["String"]
}

export type BreadcrumbConnection = {
  __typename?: "BreadcrumbConnection"
  pageInfo: PageInfo
  edges?: Maybe<Array<Maybe<BreadcrumbEdge>>>
}

export type BreadcrumbEdge = {
  __typename?: "BreadcrumbEdge"
  node: Breadcrumb
  cursor: Scalars["String"]
}

export type BulkPricingFixedPriceDiscount = BulkPricingTier & {
  __typename?: "BulkPricingFixedPriceDiscount"
  price: Scalars["BigDecimal"]
  minimumQuantity: Scalars["Int"]
  maximumQuantity?: Maybe<Scalars["Int"]>
}

export type BulkPricingPercentageDiscount = BulkPricingTier & {
  __typename?: "BulkPricingPercentageDiscount"
  percentOff: Scalars["BigDecimal"]
  minimumQuantity: Scalars["Int"]
  maximumQuantity?: Maybe<Scalars["Int"]>
}

export type BulkPricingRelativePriceDiscount = BulkPricingTier & {
  __typename?: "BulkPricingRelativePriceDiscount"
  priceAdjustment: Scalars["BigDecimal"]
  minimumQuantity: Scalars["Int"]
  maximumQuantity?: Maybe<Scalars["Int"]>
}

export type BulkPricingTier = {
  minimumQuantity: Scalars["Int"]
  maximumQuantity?: Maybe<Scalars["Int"]>
}

export type CatalogProductOption = {
  entityId: Scalars["Int"]
  displayName: Scalars["String"]
  isRequired: Scalars["Boolean"]
  isVariantOption: Scalars["Boolean"]
}

export type CatalogProductOptionValue = {
  entityId: Scalars["Int"]
  label: Scalars["String"]
  isDefault: Scalars["Boolean"]
}

export type Category = Node & {
  __typename?: "Category"
  id: Scalars["ID"]
  entityId: Scalars["Int"]
  name: Scalars["String"]
  path: Scalars["String"]
  defaultImage?: Maybe<Image>
  description: Scalars["String"]
  breadcrumbs: BreadcrumbConnection
  products: ProductConnection
  metafields: MetafieldConnection
  seo: SeoDetails
  /** @deprecated Alpha version. Do not use in production. */
  shopByPriceRanges: ShopByPriceConnection
}

export type CategoryBreadcrumbsArgs = {
  depth: Scalars["Int"]
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
}

export type CategoryProductsArgs = {
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
  hideOutOfStock?: Maybe<Scalars["Boolean"]>
  sortBy?: Maybe<CategoryProductSort>
}

export type CategoryMetafieldsArgs = {
  namespace: Scalars["String"]
  keys?: Maybe<Array<Scalars["String"]>>
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
}

export type CategoryShopByPriceRangesArgs = {
  currencyCode?: Maybe<CurrencyCode>
  includeTax?: Maybe<Scalars["Boolean"]>
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
}

export type CategoryConnection = {
  __typename?: "CategoryConnection"
  pageInfo: PageInfo
  edges?: Maybe<Array<Maybe<CategoryEdge>>>
}

export type CategoryEdge = {
  __typename?: "CategoryEdge"
  node: Category
  cursor: Scalars["String"]
}

export enum CategoryProductSort {
  Default = "DEFAULT",
  Featured = "FEATURED",
  Newest = "NEWEST",
  BestSelling = "BEST_SELLING",
  AToZ = "A_TO_Z",
  ZToA = "Z_TO_A",
  BestReviewed = "BEST_REVIEWED",
  LowestPrice = "LOWEST_PRICE",
  HighestPrice = "HIGHEST_PRICE"
}

export type CategoryTreeItem = {
  __typename?: "CategoryTreeItem"
  entityId: Scalars["Int"]
  name: Scalars["String"]
  path: Scalars["String"]
  description: Scalars["String"]
  productCount: Scalars["Int"]
  image?: Maybe<Image>
  children: Array<CategoryTreeItem>
}

export type CheckboxOption = CatalogProductOption & {
  __typename?: "CheckboxOption"
  checkedByDefault: Scalars["Boolean"]
  label: Scalars["String"]
  entityId: Scalars["Int"]
  displayName: Scalars["String"]
  isRequired: Scalars["Boolean"]
  isVariantOption: Scalars["Boolean"]
}

export type ContactField = {
  __typename?: "ContactField"
  address: Scalars["String"]
  country: Scalars["String"]
  addressType: Scalars["String"]
  email: Scalars["String"]
  phone: Scalars["String"]
}

export type Content = {
  __typename?: "Content"
  renderedRegionsByPageType: RenderedRegionsByPageType
  renderedRegionsByPageTypeAndEntityId: RenderedRegionsByPageType
}

export type ContentRenderedRegionsByPageTypeArgs = {
  pageType: PageType
}

export type ContentRenderedRegionsByPageTypeAndEntityIdArgs = {
  entityId: Scalars["Long"]
  entityPageType: EntityPageType
}

export type Currency = {
  __typename?: "Currency"
  entityId: Scalars["Int"]
  code: CurrencyCode
  name: Scalars["String"]
  flagImage?: Maybe<Scalars["String"]>
  isActive: Scalars["Boolean"]
  exchangeRate: Scalars["Float"]
  isTransactional: Scalars["Boolean"]
  display: CurrencyDisplay
}

export type CurrencyConnection = {
  __typename?: "CurrencyConnection"
  pageInfo: PageInfo
  edges?: Maybe<Array<Maybe<CurrencyEdge>>>
}

export type CurrencyDisplay = {
  __typename?: "CurrencyDisplay"
  symbol: Scalars["String"]
  symbolPlacement: CurrencySymbolPosition
  decimalToken: Scalars["String"]
  thousandsToken: Scalars["String"]
  decimalPlaces: Scalars["Int"]
}

export type CurrencyEdge = {
  __typename?: "CurrencyEdge"
  node: Currency
  cursor: Scalars["String"]
}

export enum CurrencySymbolPosition {
  Left = "LEFT",
  Right = "RIGHT"
}

export type CustomField = {
  __typename?: "CustomField"
  entityId: Scalars["Int"]
  name: Scalars["String"]
  value: Scalars["String"]
}

export type CustomFieldConnection = {
  __typename?: "CustomFieldConnection"
  pageInfo: PageInfo
  edges?: Maybe<Array<Maybe<CustomFieldEdge>>>
}

export type CustomFieldEdge = {
  __typename?: "CustomFieldEdge"
  node: CustomField
  cursor: Scalars["String"]
}

export type Customer = {
  __typename?: "Customer"
  entityId: Scalars["Int"]
  company: Scalars["String"]
  customerGroupId: Scalars["Int"]
  email: Scalars["String"]
  firstName: Scalars["String"]
  lastName: Scalars["String"]
  notes: Scalars["String"]
  phone: Scalars["String"]
  taxExemptCategory: Scalars["String"]
  addressCount: Scalars["Int"]
  attributeCount: Scalars["Int"]
  storeCredit: Array<Money>
  attributes: CustomerAttributes
  wishlists: WishlistConnection
}

export type CustomerWishlistsArgs = {
  filters?: Maybe<WishlistFiltersInput>
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
}

export type CustomerAttribute = {
  __typename?: "CustomerAttribute"
  entityId: Scalars["Int"]
  value?: Maybe<Scalars["String"]>
  name: Scalars["String"]
}

export type CustomerAttributes = {
  __typename?: "CustomerAttributes"
  attribute: CustomerAttribute
}

export type CustomerAttributesAttributeArgs = {
  entityId: Scalars["Int"]
}

export type DateFieldOption = CatalogProductOption & {
  __typename?: "DateFieldOption"
  defaultValue?: Maybe<Scalars["DateTime"]>
  earliest?: Maybe<Scalars["DateTime"]>
  latest?: Maybe<Scalars["DateTime"]>
  limitDateBy: LimitDateOption
  entityId: Scalars["Int"]
  displayName: Scalars["String"]
  isRequired: Scalars["Boolean"]
  isVariantOption: Scalars["Boolean"]
}

export type DateTimeExtended = {
  __typename?: "DateTimeExtended"
  utc: Scalars["DateTime"]
}

export type DisplayField = {
  __typename?: "DisplayField"
  shortDateFormat: Scalars["String"]
  extendedDateFormat: Scalars["String"]
}

export type Distance = {
  __typename?: "Distance"
  value: Scalars["Float"]
  lengthUnit: LengthUnit
}

export type DistanceFilter = {
  radius: Scalars["Float"]
  longitude: Scalars["Float"]
  latitude: Scalars["Float"]
  lengthUnit: LengthUnit
}

export enum EntityPageType {
  BlogPost = "BLOG_POST",
  Brand = "BRAND",
  Category = "CATEGORY",
  ContactUs = "CONTACT_US",
  Page = "PAGE",
  Product = "PRODUCT"
}

export type FileUploadFieldOption = CatalogProductOption & {
  __typename?: "FileUploadFieldOption"
  maxFileSize: Scalars["Int"]
  fileTypes: Array<Scalars["String"]>
  entityId: Scalars["Int"]
  displayName: Scalars["String"]
  isRequired: Scalars["Boolean"]
  isVariantOption: Scalars["Boolean"]
}

export type GiftWrapping = {
  __typename?: "GiftWrapping"
  entityId: Scalars["Int"]
  name: Scalars["String"]
  allowComments: Scalars["Boolean"]
  previewImageUrl?: Maybe<Scalars["String"]>
}

export type GiftWrappingConnection = {
  __typename?: "GiftWrappingConnection"
  pageInfo: PageInfo
  edges?: Maybe<Array<Maybe<GiftWrappingEdge>>>
}

export type GiftWrappingEdge = {
  __typename?: "GiftWrappingEdge"
  node: GiftWrapping
  cursor: Scalars["String"]
}

export type Image = {
  __typename?: "Image"
  url: Scalars["String"]
  urlOriginal: Scalars["String"]
  altText: Scalars["String"]
  isDefault: Scalars["Boolean"]
}

export type ImageUrlArgs = {
  width: Scalars["Int"]
  height?: Maybe<Scalars["Int"]>
}

export type ImageConnection = {
  __typename?: "ImageConnection"
  pageInfo: PageInfo
  edges?: Maybe<Array<Maybe<ImageEdge>>>
}

export type ImageEdge = {
  __typename?: "ImageEdge"
  node: Image
  cursor: Scalars["String"]
}

export type Inventory = {
  __typename?: "Inventory"
  locations: LocationConnection
}

export type InventoryLocationsArgs = {
  entityIds?: Maybe<Array<Scalars["Int"]>>
  codes?: Maybe<Array<Scalars["String"]>>
  typeIds?: Maybe<Array<Scalars["String"]>>
  serviceTypeIds?: Maybe<Array<Scalars["String"]>>
  distanceFilter?: Maybe<DistanceFilter>
  countryCodes?: Maybe<Array<CountryCode>>
  states?: Maybe<Array<Scalars["String"]>>
  cities?: Maybe<Array<Scalars["String"]>>
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
}

export type InventoryByLocations = {
  __typename?: "InventoryByLocations"
  locationEntityId: Scalars["Long"]
  availableToSell: Scalars["Long"]
  warningLevel: Scalars["Int"]
  isInStock: Scalars["Boolean"]
  locationDistance?: Maybe<Distance>
  locationEntityTypeId?: Maybe<Scalars["String"]>
  /** @deprecated Deprecated. Will be substituted with pickup methods. */
  locationEntityServiceTypeIds: Array<Scalars["String"]>
  locationEntityCode: Scalars["String"]
}

export enum LengthUnit {
  Miles = "Miles",
  Kilometres = "Kilometres"
}

export enum LimitDateOption {
  NoLimit = "NO_LIMIT",
  EarliestDate = "EARLIEST_DATE",
  LatestDate = "LATEST_DATE",
  Range = "RANGE"
}

export enum LimitInputBy {
  NoLimit = "NO_LIMIT",
  LowestValue = "LOWEST_VALUE",
  HighestValue = "HIGHEST_VALUE",
  Range = "RANGE"
}

export type LocationConnection = {
  __typename?: "LocationConnection"
  pageInfo: PageInfo
  edges?: Maybe<Array<Maybe<LocationEdge>>>
}

export type LocationEdge = {
  __typename?: "LocationEdge"
  node: InventoryByLocations
  cursor: Scalars["String"]
}

export type LogoField = {
  __typename?: "LogoField"
  title: Scalars["String"]
  image: Image
}

export type Measurement = {
  __typename?: "Measurement"
  value: Scalars["Float"]
  unit: Scalars["String"]
}

export type MetafieldConnection = {
  __typename?: "MetafieldConnection"
  pageInfo: PageInfo
  edges?: Maybe<Array<Maybe<MetafieldEdge>>>
}

export type MetafieldEdge = {
  __typename?: "MetafieldEdge"
  node: Metafields
  cursor: Scalars["String"]
}

export type Metafields = {
  __typename?: "Metafields"
  id: Scalars["ID"]
  entityId: Scalars["Int"]
  key: Scalars["String"]
  value: Scalars["String"]
}

export type Money = {
  __typename?: "Money"
  currencyCode: Scalars["String"]
  value: Scalars["BigDecimal"]
}

export type MoneyRange = {
  __typename?: "MoneyRange"
  min: Money
  max: Money
}

export type MultiLineTextFieldOption = CatalogProductOption & {
  __typename?: "MultiLineTextFieldOption"
  defaultValue?: Maybe<Scalars["String"]>
  minLength?: Maybe<Scalars["Int"]>
  maxLength?: Maybe<Scalars["Int"]>
  maxLines?: Maybe<Scalars["Int"]>
  entityId: Scalars["Int"]
  displayName: Scalars["String"]
  isRequired: Scalars["Boolean"]
  isVariantOption: Scalars["Boolean"]
}

export type MultipleChoiceOption = CatalogProductOption & {
  __typename?: "MultipleChoiceOption"
  displayStyle: Scalars["String"]
  values: ProductOptionValueConnection
  entityId: Scalars["Int"]
  displayName: Scalars["String"]
  isRequired: Scalars["Boolean"]
  isVariantOption: Scalars["Boolean"]
}

export type MultipleChoiceOptionValuesArgs = {
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
}

export type MultipleChoiceOptionValue = CatalogProductOptionValue & {
  __typename?: "MultipleChoiceOptionValue"
  entityId: Scalars["Int"]
  label: Scalars["String"]
  isDefault: Scalars["Boolean"]
}

export type Node = {
  id: Scalars["ID"]
}

export type NumberFieldOption = CatalogProductOption & {
  __typename?: "NumberFieldOption"
  defaultValue?: Maybe<Scalars["Float"]>
  lowest?: Maybe<Scalars["Float"]>
  highest?: Maybe<Scalars["Float"]>
  isIntegerOnly: Scalars["Boolean"]
  limitNumberBy: LimitInputBy
  entityId: Scalars["Int"]
  displayName: Scalars["String"]
  isRequired: Scalars["Boolean"]
  isVariantOption: Scalars["Boolean"]
}

export type OptionConnection = {
  __typename?: "OptionConnection"
  pageInfo: PageInfo
  edges?: Maybe<Array<Maybe<OptionEdge>>>
}

export type OptionEdge = {
  __typename?: "OptionEdge"
  node: ProductOption
  cursor: Scalars["String"]
}

export type OptionValueConnection = {
  __typename?: "OptionValueConnection"
  pageInfo: PageInfo
  edges?: Maybe<Array<Maybe<OptionValueEdge>>>
}

export type OptionValueEdge = {
  __typename?: "OptionValueEdge"
  node: ProductOptionValue
  cursor: Scalars["String"]
}

export type OptionValueId = {
  optionEntityId: Scalars["Int"]
  valueEntityId: Scalars["Int"]
}

export type PageInfo = {
  __typename?: "PageInfo"
  hasNextPage: Scalars["Boolean"]
  hasPreviousPage: Scalars["Boolean"]
  startCursor?: Maybe<Scalars["String"]>
  endCursor?: Maybe<Scalars["String"]>
}

export enum PageType {
  AccountAddress = "ACCOUNT_ADDRESS",
  AccountAddAddress = "ACCOUNT_ADD_ADDRESS",
  AccountAddReturn = "ACCOUNT_ADD_RETURN",
  AccountAddWishlist = "ACCOUNT_ADD_WISHLIST",
  AccountDownloadItem = "ACCOUNT_DOWNLOAD_ITEM",
  AccountEdit = "ACCOUNT_EDIT",
  AccountInbox = "ACCOUNT_INBOX",
  AccountOrdersAll = "ACCOUNT_ORDERS_ALL",
  AccountOrdersCompleted = "ACCOUNT_ORDERS_COMPLETED",
  AccountOrdersDetails = "ACCOUNT_ORDERS_DETAILS",
  AccountOrdersInvoice = "ACCOUNT_ORDERS_INVOICE",
  AccountRecentItems = "ACCOUNT_RECENT_ITEMS",
  AccountReturns = "ACCOUNT_RETURNS",
  AccountReturnSaved = "ACCOUNT_RETURN_SAVED",
  AccountWishlists = "ACCOUNT_WISHLISTS",
  AccountWishlistDetails = "ACCOUNT_WISHLIST_DETAILS",
  AuthAccountCreated = "AUTH_ACCOUNT_CREATED",
  AuthCreateAcc = "AUTH_CREATE_ACC",
  AuthForgotPass = "AUTH_FORGOT_PASS",
  AuthLogin = "AUTH_LOGIN",
  AuthNewPass = "AUTH_NEW_PASS",
  Blog = "BLOG",
  Brands = "BRANDS",
  Cart = "CART",
  Compare = "COMPARE",
  GiftCertBalance = "GIFT_CERT_BALANCE",
  GiftCertPurchase = "GIFT_CERT_PURCHASE",
  GiftCertRedeem = "GIFT_CERT_REDEEM",
  Home = "HOME",
  OrderInfo = "ORDER_INFO",
  Search = "SEARCH",
  Sitemap = "SITEMAP",
  Subscribed = "SUBSCRIBED",
  Unsubscribe = "UNSUBSCRIBE"
}

export type PriceRanges = {
  __typename?: "PriceRanges"
  priceRange: MoneyRange
  retailPriceRange?: Maybe<MoneyRange>
}

export type PriceSearchFilterInput = {
  minPrice?: Maybe<Scalars["Float"]>
  maxPrice?: Maybe<Scalars["Float"]>
}

export type Prices = {
  __typename?: "Prices"
  price: Money
  salePrice?: Maybe<Money>
  basePrice?: Maybe<Money>
  retailPrice?: Maybe<Money>
  mapPrice?: Maybe<Money>
  priceRange: MoneyRange
  retailPriceRange?: Maybe<MoneyRange>
  saved?: Maybe<Money>
  bulkPricing: Array<BulkPricingTier>
}

export type Product = Node & {
  __typename?: "Product"
  id: Scalars["ID"]
  entityId: Scalars["Int"]
  sku: Scalars["String"]
  path: Scalars["String"]
  name: Scalars["String"]
  description: Scalars["String"]
  plainTextDescription: Scalars["String"]
  warranty: Scalars["String"]
  minPurchaseQuantity?: Maybe<Scalars["Int"]>
  maxPurchaseQuantity?: Maybe<Scalars["Int"]>
  addToCartUrl: Scalars["String"]
  /** @deprecated Deprecated. */
  addToWishlistUrl: Scalars["String"]
  prices?: Maybe<Prices>
  /** @deprecated Use priceRanges inside prices node instead. */
  priceRanges?: Maybe<PriceRanges>
  weight?: Maybe<Measurement>
  height?: Maybe<Measurement>
  width?: Maybe<Measurement>
  depth?: Maybe<Measurement>
  /** @deprecated Use productOptions instead. */
  options: OptionConnection
  productOptions: ProductOptionConnection
  reviewSummary: Reviews
  type: Scalars["String"]
  /** @deprecated Use status inside availabilityV2 instead. */
  availability: Scalars["String"]
  /** @deprecated Use description inside availabilityV2 instead. */
  availabilityDescription: Scalars["String"]
  availabilityV2: ProductAvailability
  categories: CategoryConnection
  brand?: Maybe<Brand>
  variants: VariantConnection
  customFields: CustomFieldConnection
  images: ImageConnection
  defaultImage?: Maybe<Image>
  relatedProducts: RelatedProductsConnection
  inventory: ProductInventory
  metafields: MetafieldConnection
  upc?: Maybe<Scalars["String"]>
  mpn?: Maybe<Scalars["String"]>
  gtin?: Maybe<Scalars["String"]>
  /** @deprecated Alpha version. Do not use in production. */
  createdAt: DateTimeExtended
  reviews: ReviewConnection
  seo: SeoDetails
  giftWrappingOptions: GiftWrappingConnection
  condition?: Maybe<ProductConditionType>
}

export type ProductPlainTextDescriptionArgs = {
  characterLimit?: Maybe<Scalars["Int"]>
}

export type ProductPricesArgs = {
  includeTax?: Maybe<Scalars["Boolean"]>
  currencyCode?: Maybe<CurrencyCode>
}

export type ProductPriceRangesArgs = {
  includeTax?: Maybe<Scalars["Boolean"]>
}

export type ProductOptionsArgs = {
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
}

export type ProductProductOptionsArgs = {
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
}

export type ProductCategoriesArgs = {
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
}

export type ProductVariantsArgs = {
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
  isPurchasable?: Maybe<Scalars["Boolean"]>
  entityIds?: Maybe<Array<Scalars["Int"]>>
  optionValueIds?: Maybe<Array<OptionValueId>>
}

export type ProductCustomFieldsArgs = {
  names?: Maybe<Array<Scalars["String"]>>
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
}

export type ProductImagesArgs = {
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
}

export type ProductRelatedProductsArgs = {
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
  hideOutOfStock?: Maybe<Scalars["Boolean"]>
}

export type ProductMetafieldsArgs = {
  namespace: Scalars["String"]
  keys?: Maybe<Array<Scalars["String"]>>
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
}

export type ProductReviewsArgs = {
  sort?: Maybe<ProductReviewsSortInput>
  filters?: Maybe<ProductReviewsFiltersInput>
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
}

export type ProductGiftWrappingOptionsArgs = {
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
}

export type ProductAttributeSearchFilterInput = {
  attribute: Scalars["String"]
  values: Array<Scalars["String"]>
}

export type ProductAvailability = {
  status: ProductAvailabilityStatus
  description: Scalars["String"]
}

export enum ProductAvailabilityStatus {
  Available = "Available",
  Preorder = "Preorder",
  Unavailable = "Unavailable"
}

export type ProductAvailable = ProductAvailability & {
  __typename?: "ProductAvailable"
  status: ProductAvailabilityStatus
  description: Scalars["String"]
}

export enum ProductConditionType {
  New = "NEW",
  Used = "USED",
  Refurbished = "REFURBISHED"
}

export type ProductConnection = {
  __typename?: "ProductConnection"
  pageInfo: PageInfo
  edges?: Maybe<Array<Maybe<ProductEdge>>>
}

export type ProductEdge = {
  __typename?: "ProductEdge"
  node: Product
  cursor: Scalars["String"]
}

export type ProductInventory = {
  __typename?: "ProductInventory"
  isInStock: Scalars["Boolean"]
  hasVariantInventory: Scalars["Boolean"]
  aggregated?: Maybe<AggregatedInventory>
}

export type ProductOption = {
  __typename?: "ProductOption"
  entityId: Scalars["Int"]
  displayName: Scalars["String"]
  isRequired: Scalars["Boolean"]
  values: OptionValueConnection
}

export type ProductOptionValuesArgs = {
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
}

export type ProductOptionConnection = {
  __typename?: "ProductOptionConnection"
  pageInfo: PageInfo
  edges?: Maybe<Array<Maybe<ProductOptionEdge>>>
}

export type ProductOptionEdge = {
  __typename?: "ProductOptionEdge"
  node: CatalogProductOption
  cursor: Scalars["String"]
}

export type ProductOptionValue = {
  __typename?: "ProductOptionValue"
  entityId: Scalars["Int"]
  label: Scalars["String"]
}

export type ProductOptionValueConnection = {
  __typename?: "ProductOptionValueConnection"
  pageInfo: PageInfo
  edges?: Maybe<Array<Maybe<ProductOptionValueEdge>>>
}

export type ProductOptionValueEdge = {
  __typename?: "ProductOptionValueEdge"
  node: CatalogProductOptionValue
  cursor: Scalars["String"]
}

export type ProductPickListOptionValue = CatalogProductOptionValue & {
  __typename?: "ProductPickListOptionValue"
  productId: Scalars["Int"]
  entityId: Scalars["Int"]
  label: Scalars["String"]
  isDefault: Scalars["Boolean"]
}

export type ProductPreOrder = ProductAvailability & {
  __typename?: "ProductPreOrder"
  message?: Maybe<Scalars["String"]>
  willBeReleasedAt?: Maybe<DateTimeExtended>
  status: ProductAvailabilityStatus
  description: Scalars["String"]
}

export type ProductReviewsFiltersInput = {
  rating?: Maybe<ProductReviewsRatingFilterInput>
}

export type ProductReviewsRatingFilterInput = {
  minRating?: Maybe<Scalars["Int"]>
  maxRating?: Maybe<Scalars["Int"]>
}

export enum ProductReviewsSortInput {
  Newest = "NEWEST",
  Oldest = "OLDEST",
  HighestRating = "HIGHEST_RATING",
  LowestRating = "LOWEST_RATING"
}

export type ProductUnavailable = ProductAvailability & {
  __typename?: "ProductUnavailable"
  message?: Maybe<Scalars["String"]>
  status: ProductAvailabilityStatus
  description: Scalars["String"]
}

export type PublicWishlist = {
  __typename?: "PublicWishlist"
  entityId: Scalars["Int"]
  name: Scalars["String"]
  token: Scalars["String"]
  items: WishlistItemConnection
}

export type PublicWishlistItemsArgs = {
  hideOutOfStock?: Maybe<Scalars["Boolean"]>
  first?: Maybe<Scalars["Int"]>
}

export type Query = {
  __typename?: "Query"
  site: Site
  customer?: Maybe<Customer>
  node?: Maybe<Node>
  /** @deprecated Alpha version. Do not use in production. */
  inventory: Inventory
}

export type QueryNodeArgs = {
  id: Scalars["ID"]
}

export type RatingSearchFilterInput = {
  minRating?: Maybe<Scalars["Float"]>
  maxRating?: Maybe<Scalars["Float"]>
}

export type Region = {
  __typename?: "Region"
  name: Scalars["String"]
  html: Scalars["String"]
}

export type RelatedProductsConnection = {
  __typename?: "RelatedProductsConnection"
  pageInfo: PageInfo
  edges?: Maybe<Array<Maybe<RelatedProductsEdge>>>
}

export type RelatedProductsEdge = {
  __typename?: "RelatedProductsEdge"
  node: Product
  cursor: Scalars["String"]
}

export type RenderedRegionsByPageType = {
  __typename?: "RenderedRegionsByPageType"
  regions: Array<Region>
}

export type Review = {
  __typename?: "Review"
  entityId: Scalars["Long"]
  author: Author
  title: Scalars["String"]
  text: Scalars["String"]
  rating: Scalars["Int"]
  createdAt: DateTimeExtended
}

export type ReviewConnection = {
  __typename?: "ReviewConnection"
  pageInfo: PageInfo
  edges?: Maybe<Array<Maybe<ReviewEdge>>>
}

export type ReviewEdge = {
  __typename?: "ReviewEdge"
  node: Review
  cursor: Scalars["String"]
}

export type Reviews = {
  __typename?: "Reviews"
  /** @deprecated Alpha version. Do not use in production. */
  averageRating: Scalars["Float"]
  numberOfReviews: Scalars["Int"]
  summationOfRatings: Scalars["Int"]
}

export type Route = {
  __typename?: "Route"
  node?: Maybe<Node>
}

export type Search = {
  __typename?: "Search"
  productFilteringEnabled: Scalars["Boolean"]
}

export type SearchProducts = {
  __typename?: "SearchProducts"
  products: ProductConnection
}

export type SearchProductsProductsArgs = {
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
}

export type SearchProductsFiltersInput = {
  searchTerm?: Maybe<Scalars["String"]>
  price?: Maybe<PriceSearchFilterInput>
  rating?: Maybe<RatingSearchFilterInput>
  categoryEntityId?: Maybe<Scalars["Int"]>
  categoryEntityIds?: Maybe<Array<Scalars["Int"]>>
  searchSubCategories?: Maybe<Scalars["Boolean"]>
  brandEntityIds?: Maybe<Array<Scalars["Int"]>>
  productAttributes?: Maybe<Array<ProductAttributeSearchFilterInput>>
  isFreeShipping?: Maybe<Scalars["Boolean"]>
  isFeatured?: Maybe<Scalars["Boolean"]>
  isInStock?: Maybe<Scalars["Boolean"]>
}

export enum SearchProductsSortInput {
  Featured = "FEATURED",
  Newest = "NEWEST",
  BestSelling = "BEST_SELLING",
  BestReviewed = "BEST_REVIEWED",
  AToZ = "A_TO_Z",
  ZToA = "Z_TO_A",
  LowestPrice = "LOWEST_PRICE",
  HighestPrice = "HIGHEST_PRICE"
}

export type SearchQueries = {
  __typename?: "SearchQueries"
  searchProducts: SearchProducts
}

export type SearchQueriesSearchProductsArgs = {
  filters: SearchProductsFiltersInput
  sort?: Maybe<SearchProductsSortInput>
}

export type SeoDetails = {
  __typename?: "SeoDetails"
  pageTitle: Scalars["String"]
  metaDescription: Scalars["String"]
  metaKeywords: Scalars["String"]
}

export type Settings = {
  __typename?: "Settings"
  storeName: Scalars["String"]
  storeHash: Scalars["String"]
  status: StorefrontStatusType
  logo: LogoField
  contact?: Maybe<ContactField>
  url: UrlField
  display: DisplayField
  channelId: Scalars["Long"]
  tax?: Maybe<TaxDisplaySettings>
  search: Search
}

export type ShopByPriceConnection = {
  __typename?: "ShopByPriceConnection"
  pageInfo: PageInfo
  edges?: Maybe<Array<Maybe<ShopByPriceEdge>>>
}

export type ShopByPriceEdge = {
  __typename?: "ShopByPriceEdge"
  node: ShopByPriceRange
  cursor: Scalars["String"]
}

export type ShopByPriceRange = {
  __typename?: "ShopByPriceRange"
  ranges: MoneyRange
}

export type Site = {
  __typename?: "Site"
  /** @deprecated Alpha version. Do not use in production. */
  search: SearchQueries
  categoryTree: Array<CategoryTreeItem>
  category?: Maybe<Category>
  brands: BrandConnection
  products: ProductConnection
  newestProducts: ProductConnection
  bestSellingProducts: ProductConnection
  featuredProducts: ProductConnection
  product?: Maybe<Product>
  route: Route
  settings?: Maybe<Settings>
  content: Content
  currency?: Maybe<Currency>
  currencies: CurrencyConnection
  publicWishlist?: Maybe<PublicWishlist>
}

export type SiteCategoryTreeArgs = {
  rootEntityId?: Maybe<Scalars["Int"]>
}

export type SiteCategoryArgs = {
  entityId: Scalars["Int"]
}

export type SiteBrandsArgs = {
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
  productEntityIds?: Maybe<Array<Scalars["Int"]>>
}

export type SiteProductsArgs = {
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
  ids?: Maybe<Array<Scalars["ID"]>>
  entityIds?: Maybe<Array<Scalars["Int"]>>
  hideOutOfStock?: Maybe<Scalars["Boolean"]>
}

export type SiteNewestProductsArgs = {
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
  hideOutOfStock?: Maybe<Scalars["Boolean"]>
}

export type SiteBestSellingProductsArgs = {
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
  hideOutOfStock?: Maybe<Scalars["Boolean"]>
}

export type SiteFeaturedProductsArgs = {
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
  hideOutOfStock?: Maybe<Scalars["Boolean"]>
}

export type SiteProductArgs = {
  id?: Maybe<Scalars["ID"]>
  entityId?: Maybe<Scalars["Int"]>
  variantEntityId?: Maybe<Scalars["Int"]>
  optionValueIds?: Maybe<Array<OptionValueId>>
  sku?: Maybe<Scalars["String"]>
}

export type SiteRouteArgs = {
  path: Scalars["String"]
}

export type SiteCurrencyArgs = {
  currencyCode: CurrencyCode
}

export type SiteCurrenciesArgs = {
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
}

export type SitePublicWishlistArgs = {
  token: Scalars["String"]
}

export enum StorefrontStatusType {
  Launched = "LAUNCHED",
  Maintenance = "MAINTENANCE",
  PreLaunch = "PRE_LAUNCH",
  Hibernation = "HIBERNATION"
}

export type SwatchOptionValue = CatalogProductOptionValue & {
  __typename?: "SwatchOptionValue"
  hexColors: Array<Scalars["String"]>
  imageUrl?: Maybe<Scalars["String"]>
  entityId: Scalars["Int"]
  label: Scalars["String"]
  isDefault: Scalars["Boolean"]
}

export type SwatchOptionValueImageUrlArgs = {
  width: Scalars["Int"]
  height?: Maybe<Scalars["Int"]>
}

export type TaxDisplaySettings = {
  __typename?: "TaxDisplaySettings"
  pdp: TaxPriceDisplay
  plp: TaxPriceDisplay
}

export enum TaxPriceDisplay {
  Inc = "INC",
  Ex = "EX",
  Both = "BOTH"
}

export type TextFieldOption = CatalogProductOption & {
  __typename?: "TextFieldOption"
  defaultValue?: Maybe<Scalars["String"]>
  minLength?: Maybe<Scalars["Int"]>
  maxLength?: Maybe<Scalars["Int"]>
  entityId: Scalars["Int"]
  displayName: Scalars["String"]
  isRequired: Scalars["Boolean"]
  isVariantOption: Scalars["Boolean"]
}

export type UrlField = {
  __typename?: "UrlField"
  vanityUrl: Scalars["String"]
  cdnUrl: Scalars["String"]
}

export type Variant = Node & {
  __typename?: "Variant"
  id: Scalars["ID"]
  entityId: Scalars["Int"]
  sku: Scalars["String"]
  weight?: Maybe<Measurement>
  height?: Maybe<Measurement>
  width?: Maybe<Measurement>
  depth?: Maybe<Measurement>
  options: OptionConnection
  productOptions: ProductOptionConnection
  defaultImage?: Maybe<Image>
  prices?: Maybe<Prices>
  inventory?: Maybe<VariantInventory>
  metafields: MetafieldConnection
  upc?: Maybe<Scalars["String"]>
  mpn?: Maybe<Scalars["String"]>
  gtin?: Maybe<Scalars["String"]>
  isPurchasable: Scalars["Boolean"]
}

export type VariantOptionsArgs = {
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
}

export type VariantProductOptionsArgs = {
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
}

export type VariantPricesArgs = {
  includeTax?: Maybe<Scalars["Boolean"]>
  currencyCode?: Maybe<CurrencyCode>
}

export type VariantMetafieldsArgs = {
  namespace: Scalars["String"]
  keys?: Maybe<Array<Scalars["String"]>>
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
}

export type VariantConnection = {
  __typename?: "VariantConnection"
  pageInfo: PageInfo
  edges?: Maybe<Array<Maybe<VariantEdge>>>
}

export type VariantEdge = {
  __typename?: "VariantEdge"
  node: Variant
  cursor: Scalars["String"]
}

export type VariantInventory = {
  __typename?: "VariantInventory"
  aggregated?: Maybe<Aggregated>
  isInStock: Scalars["Boolean"]
  byLocation?: Maybe<LocationConnection>
}

export type VariantInventoryByLocationArgs = {
  locationEntityIds?: Maybe<Array<Scalars["Int"]>>
  locationEntityCodes?: Maybe<Array<Scalars["String"]>>
  locationEntityTypeIds?: Maybe<Array<Scalars["String"]>>
  locationEntityServiceTypeIds?: Maybe<Array<Scalars["String"]>>
  distanceFilter?: Maybe<DistanceFilter>
  before?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
  last?: Maybe<Scalars["Int"]>
}

export type Wishlist = {
  __typename?: "Wishlist"
  entityId: Scalars["Int"]
  name: Scalars["String"]
  isPublic: Scalars["Boolean"]
  token: Scalars["String"]
  items: WishlistItemConnection
}

export type WishlistItemsArgs = {
  hideOutOfStock?: Maybe<Scalars["Boolean"]>
  first?: Maybe<Scalars["Int"]>
}

export type WishlistConnection = {
  __typename?: "WishlistConnection"
  pageInfo: PageInfo
  edges?: Maybe<Array<Maybe<WishlistEdge>>>
}

export type WishlistEdge = {
  __typename?: "WishlistEdge"
  node: Wishlist
  cursor: Scalars["String"]
}

export type WishlistFiltersInput = {
  entityIds?: Maybe<Array<Scalars["Int"]>>
}

export type WishlistItem = {
  __typename?: "WishlistItem"
  entityId: Scalars["Int"]
  product: Product
  productEntityId: Scalars["Int"]
  variantEntityId?: Maybe<Scalars["Int"]>
}

export type WishlistItemConnection = {
  __typename?: "WishlistItemConnection"
  pageInfo: PageInfo
  edges?: Maybe<Array<Maybe<WishlistItemEdge>>>
}

export type WishlistItemEdge = {
  __typename?: "WishlistItemEdge"
  node: WishlistItem
  cursor: Scalars["String"]
}

export enum CountryCode {
  Aw = "AW",
  Af = "AF",
  Ao = "AO",
  Ai = "AI",
  Ax = "AX",
  Al = "AL",
  Ad = "AD",
  Ae = "AE",
  Ar = "AR",
  Am = "AM",
  As = "AS",
  Aq = "AQ",
  Tf = "TF",
  Ag = "AG",
  Au = "AU",
  At = "AT",
  Az = "AZ",
  Bi = "BI",
  Be = "BE",
  Bj = "BJ",
  Bq = "BQ",
  Bf = "BF",
  Bd = "BD",
  Bg = "BG",
  Bh = "BH",
  Bs = "BS",
  Ba = "BA",
  Bl = "BL",
  By = "BY",
  Bz = "BZ",
  Bm = "BM",
  Bo = "BO",
  Br = "BR",
  Bb = "BB",
  Bn = "BN",
  Bt = "BT",
  Bv = "BV",
  Bw = "BW",
  Cf = "CF",
  Ca = "CA",
  Cc = "CC",
  Ch = "CH",
  Cl = "CL",
  Cn = "CN",
  Ci = "CI",
  Cm = "CM",
  Cd = "CD",
  Cg = "CG",
  Ck = "CK",
  Co = "CO",
  Km = "KM",
  Cv = "CV",
  Cr = "CR",
  Cu = "CU",
  Cw = "CW",
  Cx = "CX",
  Ky = "KY",
  Cy = "CY",
  Cz = "CZ",
  De = "DE",
  Dj = "DJ",
  Dm = "DM",
  Dk = "DK",
  Do = "DO",
  Dz = "DZ",
  Ec = "EC",
  Eg = "EG",
  Er = "ER",
  Eh = "EH",
  Es = "ES",
  Ee = "EE",
  Et = "ET",
  Fi = "FI",
  Fj = "FJ",
  Fk = "FK",
  Fr = "FR",
  Fo = "FO",
  Fm = "FM",
  Ga = "GA",
  Gb = "GB",
  Ge = "GE",
  Gg = "GG",
  Gh = "GH",
  Gi = "GI",
  Gn = "GN",
  Gp = "GP",
  Gm = "GM",
  Gw = "GW",
  Gq = "GQ",
  Gr = "GR",
  Gd = "GD",
  Gl = "GL",
  Gt = "GT",
  Gf = "GF",
  Gu = "GU",
  Gy = "GY",
  Hk = "HK",
  Hm = "HM",
  Hn = "HN",
  Hr = "HR",
  Ht = "HT",
  Hu = "HU",
  Id = "ID",
  Im = "IM",
  In = "IN",
  Io = "IO",
  Ie = "IE",
  Ir = "IR",
  Iq = "IQ",
  Is = "IS",
  Il = "IL",
  It = "IT",
  Jm = "JM",
  Je = "JE",
  Jo = "JO",
  Jp = "JP",
  Kz = "KZ",
  Ke = "KE",
  Kg = "KG",
  Kh = "KH",
  Ki = "KI",
  Kn = "KN",
  Kr = "KR",
  Kw = "KW",
  La = "LA",
  Lb = "LB",
  Lr = "LR",
  Ly = "LY",
  Lc = "LC",
  Li = "LI",
  Lk = "LK",
  Ls = "LS",
  Lt = "LT",
  Lu = "LU",
  Lv = "LV",
  Mo = "MO",
  Mf = "MF",
  Ma = "MA",
  Mc = "MC",
  Md = "MD",
  Mg = "MG",
  Mv = "MV",
  Mx = "MX",
  Mh = "MH",
  Mk = "MK",
  Ml = "ML",
  Mt = "MT",
  Mm = "MM",
  Me = "ME",
  Mn = "MN",
  Mp = "MP",
  Mz = "MZ",
  Mr = "MR",
  Ms = "MS",
  Mq = "MQ",
  Mu = "MU",
  Mw = "MW",
  My = "MY",
  Yt = "YT",
  Na = "NA",
  Nc = "NC",
  Ne = "NE",
  Nf = "NF",
  Ng = "NG",
  Ni = "NI",
  Nu = "NU",
  Nl = "NL",
  No = "NO",
  Np = "NP",
  Nr = "NR",
  Nz = "NZ",
  Om = "OM",
  Pk = "PK",
  Pa = "PA",
  Pn = "PN",
  Pe = "PE",
  Ph = "PH",
  Pw = "PW",
  Pg = "PG",
  Pl = "PL",
  Pr = "PR",
  Kp = "KP",
  Pt = "PT",
  Py = "PY",
  Ps = "PS",
  Pf = "PF",
  Qa = "QA",
  Re = "RE",
  Ro = "RO",
  Ru = "RU",
  Rw = "RW",
  Sa = "SA",
  Sd = "SD",
  Sn = "SN",
  Sg = "SG",
  Gs = "GS",
  Sh = "SH",
  Sj = "SJ",
  Sb = "SB",
  Sl = "SL",
  Sv = "SV",
  Sm = "SM",
  So = "SO",
  Pm = "PM",
  Rs = "RS",
  Ss = "SS",
  St = "ST",
  Sr = "SR",
  Sk = "SK",
  Si = "SI",
  Se = "SE",
  Sz = "SZ",
  Sx = "SX",
  Sc = "SC",
  Sy = "SY",
  Tc = "TC",
  Td = "TD",
  Tg = "TG",
  Th = "TH",
  Tj = "TJ",
  Tk = "TK",
  Tm = "TM",
  Tl = "TL",
  To = "TO",
  Tt = "TT",
  Tn = "TN",
  Tr = "TR",
  Tv = "TV",
  Tw = "TW",
  Tz = "TZ",
  Ug = "UG",
  Ua = "UA",
  Um = "UM",
  Uy = "UY",
  Us = "US",
  Uz = "UZ",
  Va = "VA",
  Vc = "VC",
  Ve = "VE",
  Vg = "VG",
  Vi = "VI",
  Vn = "VN",
  Vu = "VU",
  Wf = "WF",
  Ws = "WS",
  Ye = "YE",
  Za = "ZA",
  Zm = "ZM",
  Zw = "ZW"
}

export enum CurrencyCode {
  Adp = "ADP",
  Aed = "AED",
  Afa = "AFA",
  Afn = "AFN",
  Alk = "ALK",
  All = "ALL",
  Amd = "AMD",
  Ang = "ANG",
  Aoa = "AOA",
  Aok = "AOK",
  Aon = "AON",
  Aor = "AOR",
  Ara = "ARA",
  Arl = "ARL",
  Arm = "ARM",
  Arp = "ARP",
  Ars = "ARS",
  Ats = "ATS",
  Aud = "AUD",
  Awg = "AWG",
  Azm = "AZM",
  Azn = "AZN",
  Bad = "BAD",
  Bam = "BAM",
  Ban = "BAN",
  Bbd = "BBD",
  Bdt = "BDT",
  Bec = "BEC",
  Bef = "BEF",
  Bel = "BEL",
  Bgl = "BGL",
  Bgm = "BGM",
  Bgn = "BGN",
  Bgo = "BGO",
  Bhd = "BHD",
  Bif = "BIF",
  Bmd = "BMD",
  Bnd = "BND",
  Bob = "BOB",
  Bol = "BOL",
  Bop = "BOP",
  Bov = "BOV",
  Brb = "BRB",
  Brc = "BRC",
  Bre = "BRE",
  Brl = "BRL",
  Brn = "BRN",
  Brr = "BRR",
  Brz = "BRZ",
  Bsd = "BSD",
  Btn = "BTN",
  Buk = "BUK",
  Bwp = "BWP",
  Byb = "BYB",
  Byn = "BYN",
  Byr = "BYR",
  Bzd = "BZD",
  Cad = "CAD",
  Cdf = "CDF",
  Che = "CHE",
  Chf = "CHF",
  Chw = "CHW",
  Cle = "CLE",
  Clf = "CLF",
  Clp = "CLP",
  Cnx = "CNX",
  Cny = "CNY",
  Cop = "COP",
  Cou = "COU",
  Crc = "CRC",
  Csd = "CSD",
  Csk = "CSK",
  Cuc = "CUC",
  Cup = "CUP",
  Cve = "CVE",
  Cyp = "CYP",
  Czk = "CZK",
  Ddm = "DDM",
  Dem = "DEM",
  Djf = "DJF",
  Dkk = "DKK",
  Dop = "DOP",
  Dzd = "DZD",
  Ecs = "ECS",
  Ecv = "ECV",
  Eek = "EEK",
  Egp = "EGP",
  Ern = "ERN",
  Esa = "ESA",
  Esb = "ESB",
  Esp = "ESP",
  Etb = "ETB",
  Eur = "EUR",
  Fim = "FIM",
  Fjd = "FJD",
  Fkp = "FKP",
  Frf = "FRF",
  Gbp = "GBP",
  Gek = "GEK",
  Gel = "GEL",
  Ghc = "GHC",
  Ghs = "GHS",
  Gip = "GIP",
  Gmd = "GMD",
  Gnf = "GNF",
  Gns = "GNS",
  Gqe = "GQE",
  Grd = "GRD",
  Gtq = "GTQ",
  Gwe = "GWE",
  Gwp = "GWP",
  Gyd = "GYD",
  Hkd = "HKD",
  Hnl = "HNL",
  Hrd = "HRD",
  Hrk = "HRK",
  Htg = "HTG",
  Huf = "HUF",
  Idr = "IDR",
  Iep = "IEP",
  Ilp = "ILP",
  Ilr = "ILR",
  Ils = "ILS",
  Inr = "INR",
  Iqd = "IQD",
  Isj = "ISJ",
  Irr = "IRR",
  Isk = "ISK",
  Itl = "ITL",
  Jmd = "JMD",
  Jod = "JOD",
  Jpy = "JPY",
  Kes = "KES",
  Kgs = "KGS",
  Khr = "KHR",
  Kmf = "KMF",
  Kpw = "KPW",
  Krh = "KRH",
  Kro = "KRO",
  Krw = "KRW",
  Kwd = "KWD",
  Kyd = "KYD",
  Kzt = "KZT",
  Lak = "LAK",
  Lbp = "LBP",
  Lkr = "LKR",
  Lrd = "LRD",
  Lsl = "LSL",
  Ltl = "LTL",
  Ltt = "LTT",
  Luc = "LUC",
  Luf = "LUF",
  Lul = "LUL",
  Lvl = "LVL",
  Lvr = "LVR",
  Lyd = "LYD",
  Mad = "MAD",
  Maf = "MAF",
  Mcf = "MCF",
  Mdc = "MDC",
  Mdl = "MDL",
  Mga = "MGA",
  Mgf = "MGF",
  Mkd = "MKD",
  Mkn = "MKN",
  Mlf = "MLF",
  Mmk = "MMK",
  Mnt = "MNT",
  Mop = "MOP",
  Mro = "MRO",
  Mtl = "MTL",
  Mtp = "MTP",
  Mur = "MUR",
  Mvp = "MVP",
  Mvr = "MVR",
  Mwk = "MWK",
  Mxn = "MXN",
  Mxp = "MXP",
  Mxv = "MXV",
  Myr = "MYR",
  Mze = "MZE",
  Mzm = "MZM",
  Mzn = "MZN",
  Nad = "NAD",
  Ngn = "NGN",
  Nic = "NIC",
  Nio = "NIO",
  Nlg = "NLG",
  Nok = "NOK",
  Npr = "NPR",
  Nzd = "NZD",
  Omr = "OMR",
  Pab = "PAB",
  Pei = "PEI",
  Pen = "PEN",
  Pes = "PES",
  Pgk = "PGK",
  Php = "PHP",
  Pkr = "PKR",
  Pln = "PLN",
  Plz = "PLZ",
  Pte = "PTE",
  Pyg = "PYG",
  Qar = "QAR",
  Rhd = "RHD",
  Rol = "ROL",
  Ron = "RON",
  Rsd = "RSD",
  Rub = "RUB",
  Rur = "RUR",
  Rwf = "RWF",
  Sar = "SAR",
  Sbd = "SBD",
  Scr = "SCR",
  Sdd = "SDD",
  Sdg = "SDG",
  Sdp = "SDP",
  Sek = "SEK",
  Sgd = "SGD",
  Shp = "SHP",
  Sit = "SIT",
  Skk = "SKK",
  Sll = "SLL",
  Sos = "SOS",
  Srd = "SRD",
  Srg = "SRG",
  Ssp = "SSP",
  Std = "STD",
  Sur = "SUR",
  Svc = "SVC",
  Syp = "SYP",
  Szl = "SZL",
  Thb = "THB",
  Tjr = "TJR",
  Tjs = "TJS",
  Tmm = "TMM",
  Tmt = "TMT",
  Tnd = "TND",
  Top = "TOP",
  Tpe = "TPE",
  Trl = "TRL",
  Try = "TRY",
  Ttd = "TTD",
  Twd = "TWD",
  Tzs = "TZS",
  Uah = "UAH",
  Uak = "UAK",
  Ugs = "UGS",
  Ugx = "UGX",
  Usd = "USD",
  Usn = "USN",
  Uss = "USS",
  Uyi = "UYI",
  Uyp = "UYP",
  Uyu = "UYU",
  Uzs = "UZS",
  Veb = "VEB",
  Vef = "VEF",
  Vnd = "VND",
  Vnn = "VNN",
  Vuv = "VUV",
  Wst = "WST",
  Xaf = "XAF",
  Xcd = "XCD",
  Xeu = "XEU",
  Xfo = "XFO",
  Xfu = "XFU",
  Xof = "XOF",
  Xpf = "XPF",
  Xre = "XRE",
  Ydd = "YDD",
  Yer = "YER",
  Yud = "YUD",
  Yum = "YUM",
  Yun = "YUN",
  Yur = "YUR",
  Zal = "ZAL",
  Zar = "ZAR",
  Zmk = "ZMK",
  Zmw = "ZMW",
  Zrn = "ZRN",
  Zrz = "ZRZ",
  Zwd = "ZWD",
  Zwl = "ZWL",
  Zwr = "ZWR"
}
