import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ColorHex: any;
  DateTime: any;
  JSON: any;
  Upload: any;
};


export type CreateIogLabelInput = {
  id?: Maybe<Scalars['ID']>;
  imageId: Scalars['String'];
  x: Scalars['Float'];
  y: Scalars['Float'];
  width: Scalars['Float'];
  height: Scalars['Float'];
  centerPoint: Array<Scalars['Float']>;
  labelClassId?: Maybe<Scalars['ID']>;
};

export enum CurrentUserCanAcceptInvitation {
  Yes = 'Yes',
  AlreadyAccepted = 'AlreadyAccepted',
  AlreadyMemberOfTheWorkspace = 'AlreadyMemberOfTheWorkspace',
  AlreadyDeclined = 'AlreadyDeclined'
}

export type Dataset = {
  __typename?: 'Dataset';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  slug: Scalars['String'];
  images: Array<Image>;
  labels: Array<Label>;
  labelClasses: Array<LabelClass>;
  imagesAggregates: ImagesAggregates;
  labelsAggregates: LabelsAggregates;
  labelClassesAggregates: LabelClassesAggregates;
  workspace: Workspace;
};


export type DatasetImagesArgs = {
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};

export type DatasetCreateInput = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  workspaceSlug: Scalars['String'];
};

export type DatasetImportInput = {
  url: Scalars['String'];
  format: ExportFormat;
  options?: Maybe<ImportOptions>;
};

export type DatasetUpdateInput = {
  name: Scalars['String'];
};

export type DatasetWhereInput = {
  workspaceSlug: Scalars['String'];
};

export type DatasetWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
  slugs?: Maybe<WorkspaceSlugAndDatasetSlug>;
};


export type Example = {
  __typename?: 'Example';
  id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
};

export type ExampleCreateInput = {
  name: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
};

export enum ExampleOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC'
}

export type ExampleWhereInput = {
  id?: Maybe<Scalars['ID']>;
};

export type ExampleWhereUniqueInput = {
  id: Scalars['ID'];
};

export enum ExportFormat {
  Yolo = 'YOLO',
  Coco = 'COCO',
  Csv = 'CSV'
}

export type ExportOptions = {
  coco?: Maybe<ExportOptionsCoco>;
  yolo?: Maybe<ExportOptionsYolo>;
  csv?: Maybe<ExportOptionsCsv>;
};

export type ExportOptionsCoco = {
  name?: Maybe<Scalars['String']>;
  exportImages?: Maybe<Scalars['Boolean']>;
  avoidImageNameCollisions?: Maybe<Scalars['Boolean']>;
};

export type ExportOptionsCsv = {
  name?: Maybe<Scalars['String']>;
};

export type ExportOptionsYolo = {
  name?: Maybe<Scalars['String']>;
  exportImages?: Maybe<Scalars['Boolean']>;
  includePolygons?: Maybe<Scalars['Boolean']>;
  avoidImageNameCollisions?: Maybe<Scalars['Boolean']>;
};

export type ExportWhereUniqueInput = {
  datasetId: Scalars['ID'];
};

export type Geometry = {
  __typename?: 'Geometry';
  type: Scalars['String'];
  coordinates: Scalars['JSON'];
};

export type GeometryInput = {
  type: Scalars['String'];
  coordinates: Scalars['JSON'];
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
  externalUrl?: Maybe<Scalars['String']>;
  thumbnail20Url?: Maybe<Scalars['String']>;
  thumbnail50Url?: Maybe<Scalars['String']>;
  thumbnail100Url?: Maybe<Scalars['String']>;
  thumbnail200Url?: Maybe<Scalars['String']>;
  thumbnail500Url?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  path: Scalars['String'];
  mimetype: Scalars['String'];
  height: Scalars['Int'];
  width: Scalars['Int'];
  labels: Array<Label>;
  dataset: Dataset;
  metadata?: Maybe<Scalars['JSON']>;
};

export type ImageCreateInput = {
  id?: Maybe<Scalars['ID']>;
  datasetId: Scalars['ID'];
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  mimetype?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  width?: Maybe<Scalars['Int']>;
  file?: Maybe<Scalars['Upload']>;
  url?: Maybe<Scalars['String']>;
  externalUrl?: Maybe<Scalars['String']>;
  noThumbnails?: Maybe<Scalars['Boolean']>;
  thumbnail20Url?: Maybe<Scalars['String']>;
  thumbnail50Url?: Maybe<Scalars['String']>;
  thumbnail100Url?: Maybe<Scalars['String']>;
  thumbnail200Url?: Maybe<Scalars['String']>;
  thumbnail500Url?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
};

export type ImageCreateManyInput = {
  images: Array<ImageCreateManySingleInput>;
  datasetId: Scalars['ID'];
};

export type ImageCreateManySingleInput = {
  id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  mimetype?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  width?: Maybe<Scalars['Int']>;
  file?: Maybe<Scalars['Upload']>;
  url?: Maybe<Scalars['String']>;
  externalUrl?: Maybe<Scalars['String']>;
  noThumbnails?: Maybe<Scalars['Boolean']>;
  thumbnail20Url?: Maybe<Scalars['String']>;
  thumbnail50Url?: Maybe<Scalars['String']>;
  thumbnail100Url?: Maybe<Scalars['String']>;
  thumbnail200Url?: Maybe<Scalars['String']>;
  thumbnail500Url?: Maybe<Scalars['String']>;
};

export type ImageUpdateInput = {
  thumbnail20Url?: Maybe<Scalars['String']>;
  thumbnail50Url?: Maybe<Scalars['String']>;
  thumbnail100Url?: Maybe<Scalars['String']>;
  thumbnail200Url?: Maybe<Scalars['String']>;
  thumbnail500Url?: Maybe<Scalars['String']>;
};

export type ImageWhereInput = {
  datasetId?: Maybe<Scalars['ID']>;
};

export type ImageWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ImagesAggregates = {
  __typename?: 'ImagesAggregates';
  totalCount: Scalars['Int'];
};

export type ImportOptions = {
  coco?: Maybe<ImportOptionsCoco>;
};

export type ImportOptionsCoco = {
  annotationsOnly?: Maybe<Scalars['Boolean']>;
};

export type ImportStatus = {
  __typename?: 'ImportStatus';
  error?: Maybe<Scalars['String']>;
};

export enum InvitationResult {
  Sent = 'Sent',
  Error = 'Error',
  UserAlreadyIn = 'UserAlreadyIn'
}

export type InviteMemberInput = {
  email: Scalars['String'];
  role: MembershipRole;
  workspaceSlug: Scalars['String'];
};


export type Label = {
  __typename?: 'Label';
  id: Scalars['ID'];
  type: LabelType;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  imageId: Scalars['ID'];
  geometry: Geometry;
  labelClass?: Maybe<LabelClass>;
  x: Scalars['Float'];
  y: Scalars['Float'];
  height: Scalars['Float'];
  width: Scalars['Float'];
  smartToolInput?: Maybe<Scalars['JSON']>;
};

export type LabelClass = {
  __typename?: 'LabelClass';
  id: Scalars['ID'];
  index: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  color: Scalars['ColorHex'];
  labels: Array<Label>;
  dataset: Dataset;
  labelsAggregates: LabelsAggregates;
};

export type LabelClassCreateInput = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  color?: Maybe<Scalars['ColorHex']>;
  datasetId: Scalars['ID'];
};

export type LabelClassReorderInput = {
  index: Scalars['Int'];
};

export type LabelClassUpdateInput = {
  name?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['ColorHex']>;
};

export type LabelClassWhereInput = {
  datasetId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type LabelClassWhereUniqueInput = {
  id: Scalars['ID'];
};

export type LabelClassesAggregates = {
  __typename?: 'LabelClassesAggregates';
  totalCount: Scalars['Int'];
};

export type LabelCreateInput = {
  id?: Maybe<Scalars['ID']>;
  type?: Maybe<LabelType>;
  imageId: Scalars['ID'];
  labelClassId?: Maybe<Scalars['ID']>;
  geometry: GeometryInput;
  smartToolInput?: Maybe<Scalars['JSON']>;
};

export enum LabelType {
  Classification = 'Classification',
  Polygon = 'Polygon',
  Box = 'Box'
}

export type LabelUpdateInput = {
  labelClassId?: Maybe<Scalars['ID']>;
  geometry?: Maybe<GeometryInput>;
  smartToolInput?: Maybe<Scalars['JSON']>;
};

export type LabelWhereInput = {
  imageId?: Maybe<Scalars['ID']>;
  labelClassId?: Maybe<Scalars['ID']>;
  datasetId?: Maybe<Scalars['ID']>;
};

export type LabelWhereUniqueInput = {
  id: Scalars['ID'];
};

export type LabelsAggregates = {
  __typename?: 'LabelsAggregates';
  totalCount: Scalars['Int'];
};

export type Membership = {
  __typename?: 'Membership';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  declinedAt?: Maybe<Scalars['DateTime']>;
  role: MembershipRole;
  user?: Maybe<User>;
  workspace: Workspace;
  invitationEmailSentTo?: Maybe<Scalars['String']>;
  status: MembershipStatus;
  currentUserCanAcceptInvitation: CurrentUserCanAcceptInvitation;
};

export type MembershipCreateInput = {
  id?: Maybe<Scalars['ID']>;
  role: MembershipRole;
  userId?: Maybe<Scalars['ID']>;
  workspaceSlug: Scalars['String'];
};

export enum MembershipRole {
  Owner = 'Owner',
  Admin = 'Admin',
  Member = 'Member'
}

export enum MembershipStatus {
  Sent = 'Sent',
  Active = 'Active',
  Declined = 'Declined'
}

export type MembershipUpdateInput = {
  role?: Maybe<MembershipRole>;
};

export type MembershipWhereInput = {
  workspaceSlug?: Maybe<Scalars['String']>;
};

export type MembershipWhereUniqueInput = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createExample?: Maybe<Example>;
  createImage?: Maybe<Image>;
  createManyImages: Array<Image>;
  getUploadTarget: UploadTarget;
  updateImage?: Maybe<Image>;
  deleteImage?: Maybe<Image>;
  createLabel?: Maybe<Label>;
  updateLabel?: Maybe<Label>;
  deleteLabel?: Maybe<Label>;
  createLabelClass?: Maybe<LabelClass>;
  updateLabelClass?: Maybe<LabelClass>;
  reorderLabelClass?: Maybe<LabelClass>;
  deleteLabelClass?: Maybe<LabelClass>;
  updateIogLabel?: Maybe<Label>;
  createIogLabel?: Maybe<Label>;
  createDataset?: Maybe<Dataset>;
  updateDataset?: Maybe<Dataset>;
  deleteDataset?: Maybe<Dataset>;
  importDataset?: Maybe<ImportStatus>;
  createWorkspace?: Maybe<Workspace>;
  updateWorkspace?: Maybe<Workspace>;
  deleteWorkspace?: Maybe<Workspace>;
  createMembership?: Maybe<Membership>;
  updateMembership?: Maybe<Membership>;
  deleteMembership?: Maybe<Membership>;
  inviteMember?: Maybe<InvitationResult>;
  acceptInvitation?: Maybe<Membership>;
  declineInvitation?: Maybe<Membership>;
  updateUser?: Maybe<User>;
};


export type MutationCreateExampleArgs = {
  data: ExampleCreateInput;
};


export type MutationCreateImageArgs = {
  data: ImageCreateInput;
};


export type MutationCreateManyImagesArgs = {
  data: ImageCreateManyInput;
};


export type MutationGetUploadTargetArgs = {
  data: UploadTargetInput;
};


export type MutationUpdateImageArgs = {
  where: ImageWhereUniqueInput;
  data: ImageUpdateInput;
};


export type MutationDeleteImageArgs = {
  where: ImageWhereUniqueInput;
};


export type MutationCreateLabelArgs = {
  data: LabelCreateInput;
};


export type MutationUpdateLabelArgs = {
  where: LabelWhereUniqueInput;
  data: LabelUpdateInput;
};


export type MutationDeleteLabelArgs = {
  where: LabelWhereUniqueInput;
};


export type MutationCreateLabelClassArgs = {
  data: LabelClassCreateInput;
};


export type MutationUpdateLabelClassArgs = {
  where: LabelClassWhereUniqueInput;
  data: LabelClassUpdateInput;
};


export type MutationReorderLabelClassArgs = {
  where: LabelClassWhereUniqueInput;
  data: LabelClassReorderInput;
};


export type MutationDeleteLabelClassArgs = {
  where: LabelClassWhereUniqueInput;
};


export type MutationUpdateIogLabelArgs = {
  data: UpdateIogInput;
};


export type MutationCreateIogLabelArgs = {
  data: CreateIogLabelInput;
};


export type MutationCreateDatasetArgs = {
  data: DatasetCreateInput;
};


export type MutationUpdateDatasetArgs = {
  where: DatasetWhereUniqueInput;
  data: DatasetUpdateInput;
};


export type MutationDeleteDatasetArgs = {
  where: DatasetWhereUniqueInput;
};


export type MutationImportDatasetArgs = {
  where: DatasetWhereUniqueInput;
  data: DatasetImportInput;
};


export type MutationCreateWorkspaceArgs = {
  data: WorkspaceCreateInput;
  options?: Maybe<WorkspaceCreateOptions>;
};


export type MutationUpdateWorkspaceArgs = {
  where: WorkspaceWhereUniqueInput;
  data: WorkspaceUpdateInput;
};


export type MutationDeleteWorkspaceArgs = {
  where: WorkspaceWhereUniqueInput;
};


export type MutationCreateMembershipArgs = {
  data: MembershipCreateInput;
};


export type MutationUpdateMembershipArgs = {
  where: MembershipWhereUniqueInput;
  data: MembershipUpdateInput;
};


export type MutationDeleteMembershipArgs = {
  where: MembershipWhereUniqueInput;
};


export type MutationInviteMemberArgs = {
  where: InviteMemberInput;
};


export type MutationAcceptInvitationArgs = {
  where: MembershipWhereUniqueInput;
};


export type MutationDeclineInvitationArgs = {
  where: MembershipWhereUniqueInput;
};


export type MutationUpdateUserArgs = {
  where: UserWhereUniqueInput;
  data: UserUpdateInput;
};

export type Query = {
  __typename?: 'Query';
  hello?: Maybe<Scalars['String']>;
  example: Example;
  examples: Array<Example>;
  image: Image;
  images: Array<Image>;
  imagesAggregates: ImagesAggregates;
  labelClass: LabelClass;
  labelClasses: Array<LabelClass>;
  labelClassesAggregates: LabelClassesAggregates;
  labelClassExists: Scalars['Boolean'];
  labelsAggregates: LabelsAggregates;
  label: Label;
  labels: Array<Label>;
  dataset: Dataset;
  datasets: Array<Dataset>;
  searchDataset?: Maybe<Dataset>;
  workspace: Workspace;
  workspaces: Array<Workspace>;
  workspaceExists: Scalars['Boolean'];
  membership: Membership;
  memberships: Array<Membership>;
  user: User;
  users: Array<User>;
  exportDataset: Scalars['String'];
  debug: Scalars['JSON'];
};


export type QueryExampleArgs = {
  where: ExampleWhereUniqueInput;
};


export type QueryExamplesArgs = {
  where?: Maybe<ExampleWhereInput>;
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ExampleOrderByInput>;
};


export type QueryImageArgs = {
  where: ImageWhereUniqueInput;
};


export type QueryImagesArgs = {
  where?: Maybe<ImageWhereInput>;
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryLabelClassArgs = {
  where: LabelClassWhereUniqueInput;
};


export type QueryLabelClassesArgs = {
  where?: Maybe<LabelClassWhereInput>;
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryLabelClassExistsArgs = {
  where: LabelClassWhereInput;
};


export type QueryLabelArgs = {
  where: LabelWhereUniqueInput;
};


export type QueryLabelsArgs = {
  where?: Maybe<LabelWhereInput>;
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryDatasetArgs = {
  where: DatasetWhereUniqueInput;
};


export type QueryDatasetsArgs = {
  where?: Maybe<DatasetWhereInput>;
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QuerySearchDatasetArgs = {
  where: DatasetWhereUniqueInput;
};


export type QueryWorkspaceArgs = {
  where: WorkspaceWhereUniqueInput;
};


export type QueryWorkspacesArgs = {
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<WorkspaceWhereInput>;
};


export type QueryWorkspaceExistsArgs = {
  where: WorkspaceWhereUniqueInput;
};


export type QueryMembershipArgs = {
  where: MembershipWhereUniqueInput;
};


export type QueryMembershipsArgs = {
  where?: Maybe<MembershipWhereInput>;
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryExportDatasetArgs = {
  where: ExportWhereUniqueInput;
  format: ExportFormat;
  options?: Maybe<ExportOptions>;
};

export type RunIogInput = {
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  x?: Maybe<Scalars['Float']>;
  y?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  pointsInside?: Maybe<Array<Maybe<Array<Scalars['Float']>>>>;
  pointsOutside?: Maybe<Array<Maybe<Array<Scalars['Float']>>>>;
  centerPoint?: Maybe<Array<Scalars['Float']>>;
};

export type UpdateIogInput = {
  id: Scalars['ID'];
  x?: Maybe<Scalars['Float']>;
  y?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  pointsInside?: Maybe<Array<Maybe<Array<Scalars['Float']>>>>;
  pointsOutside?: Maybe<Array<Maybe<Array<Scalars['Float']>>>>;
  centerPoint?: Maybe<Array<Scalars['Float']>>;
};


export type UploadTarget = UploadTargetDirect | UploadTargetHttp;

export type UploadTargetDirect = {
  __typename?: 'UploadTargetDirect';
  direct: Scalars['Boolean'];
};

export type UploadTargetHttp = {
  __typename?: 'UploadTargetHttp';
  uploadUrl: Scalars['String'];
  downloadUrl: Scalars['String'];
};

export type UploadTargetInput = {
  key: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  memberships: Array<Membership>;
};

export type UserUpdateInput = {
  name?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

export type UserWhereUniqueInput = {
  id: Scalars['ID'];
};

export type Workspace = {
  __typename?: 'Workspace';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  slug: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  type: WorkspaceType;
  plan: WorkspacePlan;
  datasets: Array<Dataset>;
  memberships: Array<Membership>;
  stripeCustomerPortalUrl?: Maybe<Scalars['String']>;
  status: WorkspaceStatus;
};

export type WorkspaceCreateInput = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  plan?: Maybe<WorkspacePlan>;
};

export type WorkspaceCreateOptions = {
  createTutorial?: Maybe<Scalars['Boolean']>;
};

export enum WorkspacePlan {
  Community = 'Community',
  Starter = 'Starter',
  Pro = 'Pro'
}

export type WorkspaceSlugAndDatasetSlug = {
  slug: Scalars['String'];
  workspaceSlug: Scalars['String'];
};

export enum WorkspaceStatus {
  Active = 'Active',
  Trialing = 'Trialing',
  Incomplete = 'Incomplete',
  PastDue = 'PastDue',
  Unpaid = 'Unpaid',
  Canceled = 'Canceled',
  IncompleteExpired = 'IncompleteExpired'
}

export enum WorkspaceType {
  Local = 'Local',
  Online = 'Online'
}

export type WorkspaceUpdateInput = {
  name?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

export type WorkspaceWhereInput = {
  slug?: Maybe<Scalars['String']>;
};

export type WorkspaceWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  ColorHex: ResolverTypeWrapper<Scalars['ColorHex']>;
  CreateIogLabelInput: CreateIogLabelInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  CurrentUserCanAcceptInvitation: CurrentUserCanAcceptInvitation;
  Dataset: ResolverTypeWrapper<Dataset>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  DatasetCreateInput: DatasetCreateInput;
  DatasetImportInput: DatasetImportInput;
  DatasetUpdateInput: DatasetUpdateInput;
  DatasetWhereInput: DatasetWhereInput;
  DatasetWhereUniqueInput: DatasetWhereUniqueInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Example: ResolverTypeWrapper<Example>;
  ExampleCreateInput: ExampleCreateInput;
  ExampleOrderByInput: ExampleOrderByInput;
  ExampleWhereInput: ExampleWhereInput;
  ExampleWhereUniqueInput: ExampleWhereUniqueInput;
  ExportFormat: ExportFormat;
  ExportOptions: ExportOptions;
  ExportOptionsCoco: ExportOptionsCoco;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ExportOptionsCsv: ExportOptionsCsv;
  ExportOptionsYolo: ExportOptionsYolo;
  ExportWhereUniqueInput: ExportWhereUniqueInput;
  Geometry: ResolverTypeWrapper<Geometry>;
  GeometryInput: GeometryInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Image: ResolverTypeWrapper<Image>;
  ImageCreateInput: ImageCreateInput;
  ImageCreateManyInput: ImageCreateManyInput;
  ImageCreateManySingleInput: ImageCreateManySingleInput;
  ImageUpdateInput: ImageUpdateInput;
  ImageWhereInput: ImageWhereInput;
  ImageWhereUniqueInput: ImageWhereUniqueInput;
  ImagesAggregates: ResolverTypeWrapper<ImagesAggregates>;
  ImportOptions: ImportOptions;
  ImportOptionsCoco: ImportOptionsCoco;
  ImportStatus: ResolverTypeWrapper<ImportStatus>;
  InvitationResult: InvitationResult;
  InviteMemberInput: InviteMemberInput;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Label: ResolverTypeWrapper<Label>;
  LabelClass: ResolverTypeWrapper<LabelClass>;
  LabelClassCreateInput: LabelClassCreateInput;
  LabelClassReorderInput: LabelClassReorderInput;
  LabelClassUpdateInput: LabelClassUpdateInput;
  LabelClassWhereInput: LabelClassWhereInput;
  LabelClassWhereUniqueInput: LabelClassWhereUniqueInput;
  LabelClassesAggregates: ResolverTypeWrapper<LabelClassesAggregates>;
  LabelCreateInput: LabelCreateInput;
  LabelType: LabelType;
  LabelUpdateInput: LabelUpdateInput;
  LabelWhereInput: LabelWhereInput;
  LabelWhereUniqueInput: LabelWhereUniqueInput;
  LabelsAggregates: ResolverTypeWrapper<LabelsAggregates>;
  Membership: ResolverTypeWrapper<Membership>;
  MembershipCreateInput: MembershipCreateInput;
  MembershipRole: MembershipRole;
  MembershipStatus: MembershipStatus;
  MembershipUpdateInput: MembershipUpdateInput;
  MembershipWhereInput: MembershipWhereInput;
  MembershipWhereUniqueInput: MembershipWhereUniqueInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RunIogInput: RunIogInput;
  UpdateIogInput: UpdateIogInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  UploadTarget: ResolversTypes['UploadTargetDirect'] | ResolversTypes['UploadTargetHttp'];
  UploadTargetDirect: ResolverTypeWrapper<UploadTargetDirect>;
  UploadTargetHttp: ResolverTypeWrapper<UploadTargetHttp>;
  UploadTargetInput: UploadTargetInput;
  User: ResolverTypeWrapper<User>;
  UserUpdateInput: UserUpdateInput;
  UserWhereUniqueInput: UserWhereUniqueInput;
  Workspace: ResolverTypeWrapper<Workspace>;
  WorkspaceCreateInput: WorkspaceCreateInput;
  WorkspaceCreateOptions: WorkspaceCreateOptions;
  WorkspacePlan: WorkspacePlan;
  WorkspaceSlugAndDatasetSlug: WorkspaceSlugAndDatasetSlug;
  WorkspaceStatus: WorkspaceStatus;
  WorkspaceType: WorkspaceType;
  WorkspaceUpdateInput: WorkspaceUpdateInput;
  WorkspaceWhereInput: WorkspaceWhereInput;
  WorkspaceWhereUniqueInput: WorkspaceWhereUniqueInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  ColorHex: Scalars['ColorHex'];
  CreateIogLabelInput: CreateIogLabelInput;
  String: Scalars['String'];
  Float: Scalars['Float'];
  Dataset: Dataset;
  Int: Scalars['Int'];
  DatasetCreateInput: DatasetCreateInput;
  DatasetImportInput: DatasetImportInput;
  DatasetUpdateInput: DatasetUpdateInput;
  DatasetWhereInput: DatasetWhereInput;
  DatasetWhereUniqueInput: DatasetWhereUniqueInput;
  DateTime: Scalars['DateTime'];
  Example: Example;
  ExampleCreateInput: ExampleCreateInput;
  ExampleWhereInput: ExampleWhereInput;
  ExampleWhereUniqueInput: ExampleWhereUniqueInput;
  ExportOptions: ExportOptions;
  ExportOptionsCoco: ExportOptionsCoco;
  Boolean: Scalars['Boolean'];
  ExportOptionsCsv: ExportOptionsCsv;
  ExportOptionsYolo: ExportOptionsYolo;
  ExportWhereUniqueInput: ExportWhereUniqueInput;
  Geometry: Geometry;
  GeometryInput: GeometryInput;
  ID: Scalars['ID'];
  Image: Image;
  ImageCreateInput: ImageCreateInput;
  ImageCreateManyInput: ImageCreateManyInput;
  ImageCreateManySingleInput: ImageCreateManySingleInput;
  ImageUpdateInput: ImageUpdateInput;
  ImageWhereInput: ImageWhereInput;
  ImageWhereUniqueInput: ImageWhereUniqueInput;
  ImagesAggregates: ImagesAggregates;
  ImportOptions: ImportOptions;
  ImportOptionsCoco: ImportOptionsCoco;
  ImportStatus: ImportStatus;
  InviteMemberInput: InviteMemberInput;
  JSON: Scalars['JSON'];
  Label: Label;
  LabelClass: LabelClass;
  LabelClassCreateInput: LabelClassCreateInput;
  LabelClassReorderInput: LabelClassReorderInput;
  LabelClassUpdateInput: LabelClassUpdateInput;
  LabelClassWhereInput: LabelClassWhereInput;
  LabelClassWhereUniqueInput: LabelClassWhereUniqueInput;
  LabelClassesAggregates: LabelClassesAggregates;
  LabelCreateInput: LabelCreateInput;
  LabelUpdateInput: LabelUpdateInput;
  LabelWhereInput: LabelWhereInput;
  LabelWhereUniqueInput: LabelWhereUniqueInput;
  LabelsAggregates: LabelsAggregates;
  Membership: Membership;
  MembershipCreateInput: MembershipCreateInput;
  MembershipUpdateInput: MembershipUpdateInput;
  MembershipWhereInput: MembershipWhereInput;
  MembershipWhereUniqueInput: MembershipWhereUniqueInput;
  Mutation: {};
  Query: {};
  RunIogInput: RunIogInput;
  UpdateIogInput: UpdateIogInput;
  Upload: Scalars['Upload'];
  UploadTarget: ResolversParentTypes['UploadTargetDirect'] | ResolversParentTypes['UploadTargetHttp'];
  UploadTargetDirect: UploadTargetDirect;
  UploadTargetHttp: UploadTargetHttp;
  UploadTargetInput: UploadTargetInput;
  User: User;
  UserUpdateInput: UserUpdateInput;
  UserWhereUniqueInput: UserWhereUniqueInput;
  Workspace: Workspace;
  WorkspaceCreateInput: WorkspaceCreateInput;
  WorkspaceCreateOptions: WorkspaceCreateOptions;
  WorkspaceSlugAndDatasetSlug: WorkspaceSlugAndDatasetSlug;
  WorkspaceUpdateInput: WorkspaceUpdateInput;
  WorkspaceWhereInput: WorkspaceWhereInput;
  WorkspaceWhereUniqueInput: WorkspaceWhereUniqueInput;
};

export interface ColorHexScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ColorHex'], any> {
  name: 'ColorHex';
}

export type DatasetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Dataset'] = ResolversParentTypes['Dataset']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<DatasetImagesArgs, never>>;
  labels?: Resolver<Array<ResolversTypes['Label']>, ParentType, ContextType>;
  labelClasses?: Resolver<Array<ResolversTypes['LabelClass']>, ParentType, ContextType>;
  imagesAggregates?: Resolver<ResolversTypes['ImagesAggregates'], ParentType, ContextType>;
  labelsAggregates?: Resolver<ResolversTypes['LabelsAggregates'], ParentType, ContextType>;
  labelClassesAggregates?: Resolver<ResolversTypes['LabelClassesAggregates'], ParentType, ContextType>;
  workspace?: Resolver<ResolversTypes['Workspace'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type ExampleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Example'] = ResolversParentTypes['Example']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GeometryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Geometry'] = ResolversParentTypes['Geometry']> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  coordinates?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  externalUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  thumbnail20Url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  thumbnail50Url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  thumbnail100Url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  thumbnail200Url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  thumbnail500Url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mimetype?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  labels?: Resolver<Array<ResolversTypes['Label']>, ParentType, ContextType>;
  dataset?: Resolver<ResolversTypes['Dataset'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImagesAggregatesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImagesAggregates'] = ResolversParentTypes['ImagesAggregates']> = {
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImportStatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImportStatus'] = ResolversParentTypes['ImportStatus']> = {
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type LabelResolvers<ContextType = any, ParentType extends ResolversParentTypes['Label'] = ResolversParentTypes['Label']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['LabelType'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  imageId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  geometry?: Resolver<ResolversTypes['Geometry'], ParentType, ContextType>;
  labelClass?: Resolver<Maybe<ResolversTypes['LabelClass']>, ParentType, ContextType>;
  x?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  y?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  height?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  smartToolInput?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LabelClassResolvers<ContextType = any, ParentType extends ResolversParentTypes['LabelClass'] = ResolversParentTypes['LabelClass']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  color?: Resolver<ResolversTypes['ColorHex'], ParentType, ContextType>;
  labels?: Resolver<Array<ResolversTypes['Label']>, ParentType, ContextType>;
  dataset?: Resolver<ResolversTypes['Dataset'], ParentType, ContextType>;
  labelsAggregates?: Resolver<ResolversTypes['LabelsAggregates'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LabelClassesAggregatesResolvers<ContextType = any, ParentType extends ResolversParentTypes['LabelClassesAggregates'] = ResolversParentTypes['LabelClassesAggregates']> = {
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LabelsAggregatesResolvers<ContextType = any, ParentType extends ResolversParentTypes['LabelsAggregates'] = ResolversParentTypes['LabelsAggregates']> = {
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MembershipResolvers<ContextType = any, ParentType extends ResolversParentTypes['Membership'] = ResolversParentTypes['Membership']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  declinedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['MembershipRole'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  workspace?: Resolver<ResolversTypes['Workspace'], ParentType, ContextType>;
  invitationEmailSentTo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MembershipStatus'], ParentType, ContextType>;
  currentUserCanAcceptInvitation?: Resolver<ResolversTypes['CurrentUserCanAcceptInvitation'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createExample?: Resolver<Maybe<ResolversTypes['Example']>, ParentType, ContextType, RequireFields<MutationCreateExampleArgs, 'data'>>;
  createImage?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<MutationCreateImageArgs, 'data'>>;
  createManyImages?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<MutationCreateManyImagesArgs, 'data'>>;
  getUploadTarget?: Resolver<ResolversTypes['UploadTarget'], ParentType, ContextType, RequireFields<MutationGetUploadTargetArgs, 'data'>>;
  updateImage?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<MutationUpdateImageArgs, 'where' | 'data'>>;
  deleteImage?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<MutationDeleteImageArgs, 'where'>>;
  createLabel?: Resolver<Maybe<ResolversTypes['Label']>, ParentType, ContextType, RequireFields<MutationCreateLabelArgs, 'data'>>;
  updateLabel?: Resolver<Maybe<ResolversTypes['Label']>, ParentType, ContextType, RequireFields<MutationUpdateLabelArgs, 'where' | 'data'>>;
  deleteLabel?: Resolver<Maybe<ResolversTypes['Label']>, ParentType, ContextType, RequireFields<MutationDeleteLabelArgs, 'where'>>;
  createLabelClass?: Resolver<Maybe<ResolversTypes['LabelClass']>, ParentType, ContextType, RequireFields<MutationCreateLabelClassArgs, 'data'>>;
  updateLabelClass?: Resolver<Maybe<ResolversTypes['LabelClass']>, ParentType, ContextType, RequireFields<MutationUpdateLabelClassArgs, 'where' | 'data'>>;
  reorderLabelClass?: Resolver<Maybe<ResolversTypes['LabelClass']>, ParentType, ContextType, RequireFields<MutationReorderLabelClassArgs, 'where' | 'data'>>;
  deleteLabelClass?: Resolver<Maybe<ResolversTypes['LabelClass']>, ParentType, ContextType, RequireFields<MutationDeleteLabelClassArgs, 'where'>>;
  updateIogLabel?: Resolver<Maybe<ResolversTypes['Label']>, ParentType, ContextType, RequireFields<MutationUpdateIogLabelArgs, 'data'>>;
  createIogLabel?: Resolver<Maybe<ResolversTypes['Label']>, ParentType, ContextType, RequireFields<MutationCreateIogLabelArgs, 'data'>>;
  createDataset?: Resolver<Maybe<ResolversTypes['Dataset']>, ParentType, ContextType, RequireFields<MutationCreateDatasetArgs, 'data'>>;
  updateDataset?: Resolver<Maybe<ResolversTypes['Dataset']>, ParentType, ContextType, RequireFields<MutationUpdateDatasetArgs, 'where' | 'data'>>;
  deleteDataset?: Resolver<Maybe<ResolversTypes['Dataset']>, ParentType, ContextType, RequireFields<MutationDeleteDatasetArgs, 'where'>>;
  importDataset?: Resolver<Maybe<ResolversTypes['ImportStatus']>, ParentType, ContextType, RequireFields<MutationImportDatasetArgs, 'where' | 'data'>>;
  createWorkspace?: Resolver<Maybe<ResolversTypes['Workspace']>, ParentType, ContextType, RequireFields<MutationCreateWorkspaceArgs, 'data'>>;
  updateWorkspace?: Resolver<Maybe<ResolversTypes['Workspace']>, ParentType, ContextType, RequireFields<MutationUpdateWorkspaceArgs, 'where' | 'data'>>;
  deleteWorkspace?: Resolver<Maybe<ResolversTypes['Workspace']>, ParentType, ContextType, RequireFields<MutationDeleteWorkspaceArgs, 'where'>>;
  createMembership?: Resolver<Maybe<ResolversTypes['Membership']>, ParentType, ContextType, RequireFields<MutationCreateMembershipArgs, 'data'>>;
  updateMembership?: Resolver<Maybe<ResolversTypes['Membership']>, ParentType, ContextType, RequireFields<MutationUpdateMembershipArgs, 'where' | 'data'>>;
  deleteMembership?: Resolver<Maybe<ResolversTypes['Membership']>, ParentType, ContextType, RequireFields<MutationDeleteMembershipArgs, 'where'>>;
  inviteMember?: Resolver<Maybe<ResolversTypes['InvitationResult']>, ParentType, ContextType, RequireFields<MutationInviteMemberArgs, 'where'>>;
  acceptInvitation?: Resolver<Maybe<ResolversTypes['Membership']>, ParentType, ContextType, RequireFields<MutationAcceptInvitationArgs, 'where'>>;
  declineInvitation?: Resolver<Maybe<ResolversTypes['Membership']>, ParentType, ContextType, RequireFields<MutationDeclineInvitationArgs, 'where'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'where' | 'data'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  example?: Resolver<ResolversTypes['Example'], ParentType, ContextType, RequireFields<QueryExampleArgs, 'where'>>;
  examples?: Resolver<Array<ResolversTypes['Example']>, ParentType, ContextType, RequireFields<QueryExamplesArgs, never>>;
  image?: Resolver<ResolversTypes['Image'], ParentType, ContextType, RequireFields<QueryImageArgs, 'where'>>;
  images?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<QueryImagesArgs, never>>;
  imagesAggregates?: Resolver<ResolversTypes['ImagesAggregates'], ParentType, ContextType>;
  labelClass?: Resolver<ResolversTypes['LabelClass'], ParentType, ContextType, RequireFields<QueryLabelClassArgs, 'where'>>;
  labelClasses?: Resolver<Array<ResolversTypes['LabelClass']>, ParentType, ContextType, RequireFields<QueryLabelClassesArgs, never>>;
  labelClassesAggregates?: Resolver<ResolversTypes['LabelClassesAggregates'], ParentType, ContextType>;
  labelClassExists?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryLabelClassExistsArgs, 'where'>>;
  labelsAggregates?: Resolver<ResolversTypes['LabelsAggregates'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['Label'], ParentType, ContextType, RequireFields<QueryLabelArgs, 'where'>>;
  labels?: Resolver<Array<ResolversTypes['Label']>, ParentType, ContextType, RequireFields<QueryLabelsArgs, never>>;
  dataset?: Resolver<ResolversTypes['Dataset'], ParentType, ContextType, RequireFields<QueryDatasetArgs, 'where'>>;
  datasets?: Resolver<Array<ResolversTypes['Dataset']>, ParentType, ContextType, RequireFields<QueryDatasetsArgs, never>>;
  searchDataset?: Resolver<Maybe<ResolversTypes['Dataset']>, ParentType, ContextType, RequireFields<QuerySearchDatasetArgs, 'where'>>;
  workspace?: Resolver<ResolversTypes['Workspace'], ParentType, ContextType, RequireFields<QueryWorkspaceArgs, 'where'>>;
  workspaces?: Resolver<Array<ResolversTypes['Workspace']>, ParentType, ContextType, RequireFields<QueryWorkspacesArgs, never>>;
  workspaceExists?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryWorkspaceExistsArgs, 'where'>>;
  membership?: Resolver<ResolversTypes['Membership'], ParentType, ContextType, RequireFields<QueryMembershipArgs, 'where'>>;
  memberships?: Resolver<Array<ResolversTypes['Membership']>, ParentType, ContextType, RequireFields<QueryMembershipsArgs, never>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'where'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUsersArgs, never>>;
  exportDataset?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<QueryExportDatasetArgs, 'where' | 'format'>>;
  debug?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UploadTargetResolvers<ContextType = any, ParentType extends ResolversParentTypes['UploadTarget'] = ResolversParentTypes['UploadTarget']> = {
  __resolveType: TypeResolveFn<'UploadTargetDirect' | 'UploadTargetHttp', ParentType, ContextType>;
};

export type UploadTargetDirectResolvers<ContextType = any, ParentType extends ResolversParentTypes['UploadTargetDirect'] = ResolversParentTypes['UploadTargetDirect']> = {
  direct?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UploadTargetHttpResolvers<ContextType = any, ParentType extends ResolversParentTypes['UploadTargetHttp'] = ResolversParentTypes['UploadTargetHttp']> = {
  uploadUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  downloadUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  memberships?: Resolver<Array<ResolversTypes['Membership']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkspaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Workspace'] = ResolversParentTypes['Workspace']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['WorkspaceType'], ParentType, ContextType>;
  plan?: Resolver<ResolversTypes['WorkspacePlan'], ParentType, ContextType>;
  datasets?: Resolver<Array<ResolversTypes['Dataset']>, ParentType, ContextType>;
  memberships?: Resolver<Array<ResolversTypes['Membership']>, ParentType, ContextType>;
  stripeCustomerPortalUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['WorkspaceStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  ColorHex?: GraphQLScalarType;
  Dataset?: DatasetResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Example?: ExampleResolvers<ContextType>;
  Geometry?: GeometryResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  ImagesAggregates?: ImagesAggregatesResolvers<ContextType>;
  ImportStatus?: ImportStatusResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Label?: LabelResolvers<ContextType>;
  LabelClass?: LabelClassResolvers<ContextType>;
  LabelClassesAggregates?: LabelClassesAggregatesResolvers<ContextType>;
  LabelsAggregates?: LabelsAggregatesResolvers<ContextType>;
  Membership?: MembershipResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  UploadTarget?: UploadTargetResolvers<ContextType>;
  UploadTargetDirect?: UploadTargetDirectResolvers<ContextType>;
  UploadTargetHttp?: UploadTargetHttpResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Workspace?: WorkspaceResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
