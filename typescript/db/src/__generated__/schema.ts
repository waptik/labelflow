export const typeDefs = [
  `
  scalar ColorHex

  input CreateIogLabelInput {
    id: ID
    imageId: String!
    x: Float!
    y: Float!
    width: Float!
    height: Float!
    centerPoint: [Float!]!
    labelClassId: ID
  }

  enum CurrentUserCanAcceptInvitation {
    Yes
    AlreadyAccepted
    AlreadyMemberOfTheWorkspace
    AlreadyDeclined
  }

  type Dataset {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    slug: String!
    images(first: Int, skip: Int): [Image!]!
    labels: [Label!]!
    labelClasses: [LabelClass!]!
    imagesAggregates: ImagesAggregates!
    labelsAggregates: LabelsAggregates!
    labelClassesAggregates: LabelClassesAggregates!
    workspace: Workspace!
  }

  input DatasetCreateInput {
    id: ID
    name: String!
    workspaceSlug: String!
  }

  input DatasetImportInput {
    url: String!
    format: ExportFormat!
    options: ImportOptions
  }

  input DatasetUpdateInput {
    name: String!
  }

  input DatasetWhereInput {
    workspaceSlug: String!
  }

  input DatasetWhereUniqueInput {
    id: ID
    slugs: WorkspaceSlugAndDatasetSlug
  }

  scalar DateTime

  type Example {
    id: ID
    createdAt: DateTime
    updatedAt: DateTime
    name: String
  }

  input ExampleCreateInput {
    name: String!
    id: ID
  }

  enum ExampleOrderByInput {
    id_ASC
    id_DESC
  }

  input ExampleWhereInput {
    id: ID
  }

  input ExampleWhereUniqueInput {
    id: ID!
  }

  enum ExportFormat {
    YOLO
    COCO
    CSV
  }

  input ExportOptions {
    coco: ExportOptionsCoco
    yolo: ExportOptionsYolo
    csv: ExportOptionsCsv
  }

  input ExportOptionsCoco {
    name: String
    exportImages: Boolean
    avoidImageNameCollisions: Boolean
  }

  input ExportOptionsCsv {
    name: String
  }

  input ExportOptionsYolo {
    name: String
    exportImages: Boolean
    includePolygons: Boolean
    avoidImageNameCollisions: Boolean
  }

  input ExportWhereUniqueInput {
    datasetId: ID!
  }

  type Geometry {
    type: String!
    coordinates: JSON!
  }

  input GeometryInput {
    type: String!
    coordinates: JSON!
  }

  type Image {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    url: String!
    externalUrl: String
    thumbnail20Url: String
    thumbnail50Url: String
    thumbnail100Url: String
    thumbnail200Url: String
    thumbnail500Url: String
    name: String!
    path: String!
    mimetype: String!
    height: Int!
    width: Int!
    labels: [Label!]!
    dataset: Dataset!
    metadata: JSON
  }

  input ImageCreateInput {
    id: ID
    datasetId: ID!
    createdAt: DateTime
    name: String
    path: String
    mimetype: String
    height: Int
    width: Int
    file: Upload
    url: String
    externalUrl: String
    noThumbnails: Boolean
    thumbnail20Url: String
    thumbnail50Url: String
    thumbnail100Url: String
    thumbnail200Url: String
    thumbnail500Url: String
    metadata: JSON
  }

  input ImageCreateManyInput {
    images: [ImageCreateManySingleInput!]!
    datasetId: ID!
  }

  input ImageCreateManySingleInput {
    id: ID
    createdAt: DateTime
    name: String
    path: String
    mimetype: String
    height: Int
    width: Int
    file: Upload
    url: String
    externalUrl: String
    noThumbnails: Boolean
    thumbnail20Url: String
    thumbnail50Url: String
    thumbnail100Url: String
    thumbnail200Url: String
    thumbnail500Url: String
  }

  input ImageUpdateInput {
    thumbnail20Url: String
    thumbnail50Url: String
    thumbnail100Url: String
    thumbnail200Url: String
    thumbnail500Url: String
  }

  input ImageWhereInput {
    datasetId: ID
  }

  input ImageWhereUniqueInput {
    id: ID!
  }

  type ImagesAggregates {
    totalCount: Int!
  }

  input ImportOptions {
    coco: ImportOptionsCoco
  }

  input ImportOptionsCoco {
    annotationsOnly: Boolean
  }

  type ImportStatus {
    error: String
  }

  enum InvitationResult {
    Sent
    Error
    UserAlreadyIn
  }

  input InviteMemberInput {
    email: String!
    role: MembershipRole!
    workspaceSlug: String!
  }

  scalar JSON

  type Label {
    id: ID!
    type: LabelType!
    createdAt: DateTime!
    updatedAt: DateTime!
    imageId: ID!
    geometry: Geometry!
    labelClass: LabelClass
    x: Float!
    y: Float!
    height: Float!
    width: Float!
    smartToolInput: JSON
  }

  type LabelClass {
    id: ID!
    index: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    color: ColorHex!
    labels: [Label!]!
    dataset: Dataset!
    labelsAggregates: LabelsAggregates!
  }

  input LabelClassCreateInput {
    id: ID
    name: String!
    color: ColorHex
    datasetId: ID!
  }

  input LabelClassCreateManyInput {
    labelClasses: [LabelClassCreateManySingleInput!]!
    datasetId: ID!
  }

  input LabelClassCreateManySingleInput {
    id: ID
    name: String!
    color: ColorHex
  }

  input LabelClassReorderInput {
    index: Int!
  }

  input LabelClassUpdateInput {
    name: String
    color: ColorHex
  }

  input LabelClassWhereInput {
    datasetId: ID
    name: String
  }

  input LabelClassWhereUniqueInput {
    id: ID!
  }

  type LabelClassesAggregates {
    totalCount: Int!
  }

  input LabelCreateInput {
    id: ID
    type: LabelType
    imageId: ID!
    labelClassId: ID
    geometry: GeometryInput!
    smartToolInput: JSON
  }

  enum LabelType {
    Classification
    Polygon
    Box
  }

  input LabelUpdateInput {
    labelClassId: ID
    geometry: GeometryInput
    smartToolInput: JSON
  }

  input LabelWhereInput {
    imageId: ID
    labelClassId: ID
    datasetId: ID
  }

  input LabelWhereUniqueInput {
    id: ID!
  }

  type LabelsAggregates {
    totalCount: Int!
  }

  type Membership {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    declinedAt: DateTime
    role: MembershipRole!
    user: User
    workspace: Workspace!
    invitationEmailSentTo: String
    status: MembershipStatus!
    currentUserCanAcceptInvitation: CurrentUserCanAcceptInvitation!
  }

  input MembershipCreateInput {
    id: ID
    role: MembershipRole!
    userId: ID
    workspaceSlug: String!
  }

  enum MembershipRole {
    Owner
    Admin
    Member
  }

  enum MembershipStatus {
    Sent
    Active
    Declined
  }

  input MembershipUpdateInput {
    role: MembershipRole
  }

  input MembershipWhereInput {
    workspaceSlug: String
  }

  input MembershipWhereUniqueInput {
    id: ID!
  }

  type Mutation {
    createExample(data: ExampleCreateInput!): Example
    createImage(data: ImageCreateInput!): Image
    createManyImages(data: ImageCreateManyInput!): [Image!]!
    getUploadTarget(data: UploadTargetInput!): UploadTarget!
    updateImage(where: ImageWhereUniqueInput!, data: ImageUpdateInput!): Image
    deleteImage(where: ImageWhereUniqueInput!): Image
    createLabel(data: LabelCreateInput!): Label
    updateLabel(where: LabelWhereUniqueInput!, data: LabelUpdateInput!): Label
    deleteLabel(where: LabelWhereUniqueInput!): Label
    createLabelClass(data: LabelClassCreateInput!): LabelClass
    createManyLabelClasses(data: LabelClassCreateManyInput!): [LabelClass!]!
    updateLabelClass(where: LabelClassWhereUniqueInput!, data: LabelClassUpdateInput!): LabelClass
    reorderLabelClass(where: LabelClassWhereUniqueInput!, data: LabelClassReorderInput!): LabelClass
    deleteLabelClass(where: LabelClassWhereUniqueInput!): LabelClass
    updateIogLabel(data: UpdateIogInput!): Label
    createIogLabel(data: CreateIogLabelInput!): Label
    createDataset(data: DatasetCreateInput!): Dataset
    updateDataset(where: DatasetWhereUniqueInput!, data: DatasetUpdateInput!): Dataset
    deleteDataset(where: DatasetWhereUniqueInput!): Dataset
    importDataset(where: DatasetWhereUniqueInput!, data: DatasetImportInput!): ImportStatus
    createWorkspace(data: WorkspaceCreateInput!, options: WorkspaceCreateOptions): Workspace
    updateWorkspace(where: WorkspaceWhereUniqueInput!, data: WorkspaceUpdateInput!): Workspace
    deleteWorkspace(where: WorkspaceWhereUniqueInput!): Workspace
    createMembership(data: MembershipCreateInput!): Membership
    updateMembership(where: MembershipWhereUniqueInput!, data: MembershipUpdateInput!): Membership
    deleteMembership(where: MembershipWhereUniqueInput!): Membership
    inviteMember(where: InviteMemberInput!): InvitationResult
    acceptInvitation(where: MembershipWhereUniqueInput!): Membership
    declineInvitation(where: MembershipWhereUniqueInput!): Membership
    updateUser(where: UserWhereUniqueInput!, data: UserUpdateInput!): User
  }

  type Query {
    hello: String
    example(where: ExampleWhereUniqueInput!): Example!
    examples(where: ExampleWhereInput, first: Int, skip: Int, orderBy: ExampleOrderByInput): [Example!]!
    image(where: ImageWhereUniqueInput!): Image!
    images(where: ImageWhereInput, first: Int, skip: Int): [Image!]!
    imagesAggregates: ImagesAggregates!
    labelClass(where: LabelClassWhereUniqueInput!): LabelClass!
    labelClasses(where: LabelClassWhereInput, first: Int, skip: Int): [LabelClass!]!
    labelClassesAggregates: LabelClassesAggregates!
    labelClassExists(where: LabelClassWhereInput!): Boolean!
    labelsAggregates: LabelsAggregates!
    label(where: LabelWhereUniqueInput!): Label!
    labels(where: LabelWhereInput, first: Int, skip: Int): [Label!]!
    dataset(where: DatasetWhereUniqueInput!): Dataset!
    datasets(where: DatasetWhereInput, first: Int, skip: Int): [Dataset!]!
    searchDataset(where: DatasetWhereUniqueInput!): Dataset
    workspace(where: WorkspaceWhereUniqueInput!): Workspace!
    workspaces(first: Int, skip: Int, where: WorkspaceWhereInput): [Workspace!]!
    workspaceExists(where: WorkspaceWhereUniqueInput!): Boolean!
    membership(where: MembershipWhereUniqueInput!): Membership!
    memberships(where: MembershipWhereInput, first: Int, skip: Int): [Membership!]!
    user(where: UserWhereUniqueInput!): User!
    users(first: Int, skip: Int): [User!]!
    exportDataset(where: ExportWhereUniqueInput!, format: ExportFormat!, options: ExportOptions): String!
    debug: JSON!
  }

  input RunIogInput {
    id: ID!
    imageUrl: String
    x: Float
    y: Float
    width: Float
    height: Float
    pointsInside: [[Float!]]
    pointsOutside: [[Float!]]
    centerPoint: [Float!]
  }

  input UpdateIogInput {
    id: ID!
    x: Float
    y: Float
    width: Float
    height: Float
    pointsInside: [[Float!]]
    pointsOutside: [[Float!]]
    centerPoint: [Float!]
  }

  scalar Upload

  union UploadTarget = UploadTargetDirect | UploadTargetHttp

  type UploadTargetDirect {
    direct: Boolean!
  }

  type UploadTargetHttp {
    uploadUrl: String!
    downloadUrl: String!
  }

  input UploadTargetInput {
    key: String!
  }

  type User {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String
    email: String
    image: String
    memberships: [Membership!]!
  }

  input UserUpdateInput {
    name: String
    image: String
  }

  input UserWhereUniqueInput {
    id: ID!
  }

  type Workspace {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    slug: String!
    image: String
    type: WorkspaceType!
    plan: WorkspacePlan!
    datasets: [Dataset!]!
    memberships: [Membership!]!
    stripeCustomerPortalUrl: String
  }

  input WorkspaceCreateInput {
    id: ID
    name: String!
    image: String
  }

  input WorkspaceCreateOptions {
    createTutorial: Boolean
  }

  enum WorkspacePlan {
    Community
    Starter
    Pro
    Enterprise
  }

  input WorkspaceSlugAndDatasetSlug {
    slug: String!
    workspaceSlug: String!
  }

  enum WorkspaceType {
    Local
    Online
  }

  input WorkspaceUpdateInput {
    name: String
    image: String
  }

  input WorkspaceWhereInput {
    slug: String
  }

  input WorkspaceWhereUniqueInput {
    id: ID
    slug: String
  }
`,
];
