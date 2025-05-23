USE [BeanOfTheDay]
GO
/****** Object:  Table [dbo].[BeanOfTheDay]    Script Date: 06/05/2025 16:44:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BeanOfTheDay](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[date] [date] NOT NULL,
	[bean_id] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Beans]    Script Date: 06/05/2025 16:44:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Beans](
	[Id] [varchar](50) NOT NULL,
	[IndexNum] [int] NULL,
	[IsBOTD] [bit] NULL,
	[Cost] [varchar](20) NULL,
	[ImageUrl] [varchar](255) NULL,
	[Colour] [varchar](50) NULL,
	[Name] [varchar](100) NULL,
	[Description] [text] NULL,
	[Country] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CartDetails]    Script Date: 06/05/2025 16:44:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CartDetails](
	[bean_id] [varchar](50) NOT NULL,
	[bean_name] [nvarchar](100) NOT NULL,
	[bean_price] [varchar](50) NOT NULL,
	[bean_quantity] [int] NOT NULL,
	[user_name] [nvarchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[bean_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderItems]    Script Date: 06/05/2025 16:44:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderItems](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OrderId] [int] NOT NULL,
	[ProductId] [varchar](50) NOT NULL,
	[ProductName] [varchar](50) NOT NULL,
	[Quantity] [int] NOT NULL,
	[Price] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 06/05/2025 16:44:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [varchar](100) NOT NULL,
	[TotalAmount] [decimal](10, 2) NOT NULL,
	[OrderDate] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserDetails]    Script Date: 06/05/2025 16:44:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserDetails](
	[user_id] [uniqueidentifier] NOT NULL,
	[user_email] [nvarchar](255) NOT NULL,
	[user_name] [nvarchar](100) NOT NULL,
	[user_password] [nvarchar](255) NOT NULL,
	[role] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK__UserDeta__B9BE370FEDC2E382] PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[BeanOfTheDay] ON 

INSERT [dbo].[BeanOfTheDay] ([id], [date], [bean_id]) VALUES (13, CAST(N'2025-05-04' AS Date), N'66a374593a88b14d9fff0e2e')
INSERT [dbo].[BeanOfTheDay] ([id], [date], [bean_id]) VALUES (14, CAST(N'2025-05-05' AS Date), N'66a374599018ca32d01fee66')
INSERT [dbo].[BeanOfTheDay] ([id], [date], [bean_id]) VALUES (15, CAST(N'2025-05-06' AS Date), N'66a374596122a40616cb8599')
SET IDENTITY_INSERT [dbo].[BeanOfTheDay] OFF
GO
INSERT [dbo].[Beans] ([Id], [IndexNum], [IsBOTD], [Cost], [ImageUrl], [Colour], [Name], [Description], [Country]) VALUES (N'66a374590abf949489fb28f7', 8, 0, N'£17.59', N'https://images.unsplash.com/photo-1442550528053-c431ecb55509', N'golden', N'XLEEN', N'Commodo veniam voluptate elit reprehenderit incididunt. Ut laboris dolor sint cupidatat ut adipisicing. Nostrud magna labore voluptate commodo in sunt proident sunt deserunt dolor ullamco officia tempor dolor. Laboris exercitation est mollit eiusmod nostrud. Sit qui ullamco minim cillum officia irure cillum tempor eu. Et cupidatat proident amet dolore non minim.
', N'Colombia')
INSERT [dbo].[Beans] ([Id], [IndexNum], [IsBOTD], [Cost], [ImageUrl], [Colour], [Name], [Description], [Country]) VALUES (N'66a374591a995a2b48761408', 1, 0, N'£18.57', N'https://images.unsplash.com/photo-1641399756770-9b0b104e67c1', N'golden', N'ISONUS', N'Dolor fugiat duis dolore ut occaecat. Excepteur nostrud velit aute dolore sint labore do eu amet. Anim adipisicing quis ut excepteur tempor magna reprehenderit non ut excepteur minim. Anim dolore eiusmod nisi nulla aliquip aliqua occaecat.
', N'Vietnam')
INSERT [dbo].[Beans] ([Id], [IndexNum], [IsBOTD], [Cost], [ImageUrl], [Colour], [Name], [Description], [Country]) VALUES (N'66a374592169e1bfcca2fb1c', 11, 0, N'£16.44', N'https://images.unsplash.com/photo-1694763768576-0c7c3af6a4d8', N'medium roast', N'FUTURIS', N'Incididunt exercitation mollit duis consectetur consequat duis culpa tempor. Fugiat nisi fugiat dolore irure in. Fugiat nulla amet dolore labore laboris sint laborum pariatur commodo amet. Ut velit sit proident fugiat cillum cupidatat ea.
', N'Colombia')
INSERT [dbo].[Beans] ([Id], [IndexNum], [IsBOTD], [Cost], [ImageUrl], [Colour], [Name], [Description], [Country]) VALUES (N'66a374593a88b14d9fff0e2e', 9, 0, N'£25.49', N'https://images.unsplash.com/photo-1549420751-ea3f7ab42006', N'green', N'LOCAZONE', N'Deserunt consequat ea incididunt aliquip. Occaecat excepteur minim occaecat aute amet adipisicing. Tempor id veniam ipsum et tempor pariatur anim elit laboris commodo mollit. Ipsum incididunt Lorem veniam id fugiat incididunt consequat est et. Id deserunt eiusmod esse duis cupidatat Lorem. Ullamco Lorem ullamco cupidatat nostrud amet id minim ut voluptate adipisicing ipsum. Fugiat reprehenderit laborum proident eiusmod esse sint adipisicing fugiat ex.
', N'Vietnam')
INSERT [dbo].[Beans] ([Id], [IndexNum], [IsBOTD], [Cost], [ImageUrl], [Colour], [Name], [Description], [Country]) VALUES (N'66a374593ae6cb5148781b9b', 2, 0, N'£33.87', N'https://images.unsplash.com/photo-1522809269485-981d0c303355', N'green', N'ZILLAN', N'Cillum nostrud mollit non ad dolore ad dolore veniam. Adipisicing anim commodo fugiat aute commodo occaecat officia id officia ullamco. Dolore irure magna aliqua fugiat incididunt ullamco ea. Aliqua eu pariatur cupidatat ut.
', N'Colombia')
INSERT [dbo].[Beans] ([Id], [IndexNum], [IsBOTD], [Cost], [ImageUrl], [Colour], [Name], [Description], [Country]) VALUES (N'66a3745945fcae53593c42e7', 4, 0, N'£26.53', N'https://images.unsplash.com/photo-1512568400610-62da28bc8a13', N'green', N'EARWAX', N'Labore veniam amet ipsum eu dolor. Aliquip Lorem et eiusmod exercitation. Amet ex eu deserunt labore est ex consectetur ut fugiat. Duis veniam voluptate elit consequat tempor nostrud enim mollit occaecat.
', N'Vietnam')
INSERT [dbo].[Beans] ([Id], [IndexNum], [IsBOTD], [Cost], [ImageUrl], [Colour], [Name], [Description], [Country]) VALUES (N'66a37459591e872ce11c3b41', 5, 0, N'£36.56', N'https://images.unsplash.com/photo-1692299108834-038511803008', N'light roast', N'EVENTEX', N'Reprehenderit est laboris tempor quis exercitation laboris. Aute nulla aliqua consectetur nostrud ullamco cupidatat do cillum amet reprehenderit mollit non voluptate. Deserunt consectetur reprehenderit nostrud enim proident ea. Quis quis voluptate ex dolore non reprehenderit minim veniam nisi aute do incididunt voluptate. Duis aliquip commodo cupidatat anim ut ullamco eiusmod culpa velit incididunt.
', N'Vietnam')
INSERT [dbo].[Beans] ([Id], [IndexNum], [IsBOTD], [Cost], [ImageUrl], [Colour], [Name], [Description], [Country]) VALUES (N'66a374596122a40616cb8599', 0, 0, N'£39.26', N'https://images.unsplash.com/photo-1672306319681-7b6d7ef349cf', N'dark roast', N'TURNABOUT', N'Ipsum cupidatat nisi do elit veniam Lorem magna. Ullamco qui exercitation fugiat pariatur sunt dolore Lorem magna magna pariatur minim. Officia amet incididunt ad proident. Dolore est irure ex fugiat. Voluptate sunt qui ut irure commodo excepteur enim labore incididunt quis duis. Velit anim amet tempor ut labore sint deserunt.
', N'Peru')
INSERT [dbo].[Beans] ([Id], [IndexNum], [IsBOTD], [Cost], [ImageUrl], [Colour], [Name], [Description], [Country]) VALUES (N'66a37459771606d916a226ff', 3, 1, N'£17.69', N'https://images.unsplash.com/photo-1598198192305-46b0805890d3', N'dark roast', N'RONBERT', N'Et deserunt nisi in anim cillum sint voluptate proident. Est occaecat id cupidatat cupidatat ex veniam irure veniam pariatur excepteur duis labore occaecat amet. Culpa adipisicing nisi esse consequat adipisicing anim. Fugiat tempor enim ullamco sint anim qui enim. Voluptate duis proident reprehenderit et duis nisi. In consectetur nisi eu cupidatat voluptate ullamco nulla esse cupidatat dolore sit. Cupidatat laboris adipisicing ullamco mollit culpa cupidatat ex laborum consectetur consectetur.
', N'Brazil')
INSERT [dbo].[Beans] ([Id], [IndexNum], [IsBOTD], [Cost], [ImageUrl], [Colour], [Name], [Description], [Country]) VALUES (N'66a374599018ca32d01fee66', 6, 0, N'£22.92', N'https://images.unsplash.com/photo-1692296115158-38194aafa7df', N'green', N'NITRACYR', N'Mollit deserunt tempor qui consectetur excepteur non. Laborum voluptate voluptate laborum non magna et. Ea velit ipsum labore occaecat ea do cupidatat duis adipisicing. Ut eiusmod dolor anim et ea ea. Aliquip mollit aliqua nisi velit consequat nisi. Laborum velit anim non incididunt non qui commodo. Ea voluptate dolore pariatur eu enim.
', N'Brazil')
INSERT [dbo].[Beans] ([Id], [IndexNum], [IsBOTD], [Cost], [ImageUrl], [Colour], [Name], [Description], [Country]) VALUES (N'66a3745997fa4069ce1b418f', 14, 0, N'£29.42', N'https://images.unsplash.com/photo-1544486864-3087e2e20d91', N'green', N'XEREX', N'Esse ad eiusmod eiusmod nisi cillum magna quis non voluptate nulla est labore in sunt. Magna aliqua pariatur commodo deserunt. Pariatur pariatur pariatur id excepteur ex elit veniam.
', N'Brazil')
INSERT [dbo].[Beans] ([Id], [IndexNum], [IsBOTD], [Cost], [ImageUrl], [Colour], [Name], [Description], [Country]) VALUES (N'66a37459b7933d86991ce243', 10, 0, N'£10.27', N'https://images.unsplash.com/photo-1508690207469-5c5aebedf76d', N'light roast', N'ZYTRAC', N'Qui deserunt adipisicing nulla ad enim commodo reprehenderit id veniam consequat ut do ea officia. Incididunt ex esse cupidatat consequat. Sit incididunt ex magna sint reprehenderit id minim non.
', N'Vietnam')
INSERT [dbo].[Beans] ([Id], [IndexNum], [IsBOTD], [Cost], [ImageUrl], [Colour], [Name], [Description], [Country]) VALUES (N'66a37459caf60416d0571db4', 13, 0, N'£19.07', N'https://images.unsplash.com/photo-1673208127664-23a2f3b27921', N'dark roast', N'ZANITY', N'Velit quis veniam velit et sint. Irure excepteur officia ipsum sint. Est ipsum pariatur exercitation voluptate commodo. Ex irure commodo exercitation labore nulla qui dolore ad quis.
', N'Honduras')
INSERT [dbo].[Beans] ([Id], [IndexNum], [IsBOTD], [Cost], [ImageUrl], [Colour], [Name], [Description], [Country]) VALUES (N'66a37459cc0f1fb1d1a24cf0', 12, 0, N'£32.77', N'https://images.unsplash.com/photo-1692299108333-471157a30882', N'green', N'KLUGGER', N'Pariatur qui Lorem sunt labore Lorem nulla nulla ea excepteur Lorem cillum amet. Amet ea officia incididunt culpa non. Do reprehenderit qui eiusmod dolore est deserunt labore do et dolore eiusmod quis elit.
', N'Peru')
INSERT [dbo].[Beans] ([Id], [IndexNum], [IsBOTD], [Cost], [ImageUrl], [Colour], [Name], [Description], [Country]) VALUES (N'66a37459cca42ce9e15676a3', 7, 0, N'£37.91', N'https://images.unsplash.com/photo-1522120378538-41fb9564bc75', N'medium roast', N'PARAGONIA', N'Veniam laborum consequat minim laborum mollit id ea Lorem in. Labore aliqua dolore quis sunt aliquip commodo aute excepteur. Voluptate tempor consequat pariatur do esse consectetur sunt ut mollit magna enim.
', N'Colombia')
GO
SET IDENTITY_INSERT [dbo].[OrderItems] ON 

INSERT [dbo].[OrderItems] ([Id], [OrderId], [ProductId], [ProductName], [Quantity], [Price]) VALUES (6, 13, N'66a374592169e1bfcca2fb1c', N'FUTURIS', 3, N'£16.44')
INSERT [dbo].[OrderItems] ([Id], [OrderId], [ProductId], [ProductName], [Quantity], [Price]) VALUES (7, 13, N'66a374593ae6cb5148781b9b', N'ZILLAN', 1, N'£33.87')
INSERT [dbo].[OrderItems] ([Id], [OrderId], [ProductId], [ProductName], [Quantity], [Price]) VALUES (8, 13, N'66a3745945fcae53593c42e7', N'EARWAX', 1, N'£26.53')
INSERT [dbo].[OrderItems] ([Id], [OrderId], [ProductId], [ProductName], [Quantity], [Price]) VALUES (9, 13, N'66a37459591e872ce11c3b41', N'EVENTEX', 2, N'£36.56')
INSERT [dbo].[OrderItems] ([Id], [OrderId], [ProductId], [ProductName], [Quantity], [Price]) VALUES (10, 13, N'66a374596122a40616cb8599', N'TURNABOUT', 1, N'£39.26')
INSERT [dbo].[OrderItems] ([Id], [OrderId], [ProductId], [ProductName], [Quantity], [Price]) VALUES (11, 16, N'66a37459591e872ce11c3b41', N'EVENTEX', 2, N'£36.56')
INSERT [dbo].[OrderItems] ([Id], [OrderId], [ProductId], [ProductName], [Quantity], [Price]) VALUES (12, 17, N'66a374590abf949489fb28f7', N'XLEEN', 3, N'£17.59')
INSERT [dbo].[OrderItems] ([Id], [OrderId], [ProductId], [ProductName], [Quantity], [Price]) VALUES (13, 18, N'66a374591a995a2b48761408', N'ISONUS', 2, N'£18.57')
INSERT [dbo].[OrderItems] ([Id], [OrderId], [ProductId], [ProductName], [Quantity], [Price]) VALUES (14, 19, N'66a374591a995a2b48761408', N'ISONUS', 2, N'£18.57')
SET IDENTITY_INSERT [dbo].[OrderItems] OFF
GO
SET IDENTITY_INSERT [dbo].[Orders] ON 

INSERT [dbo].[Orders] ([Id], [UserId], [TotalAmount], [OrderDate]) VALUES (13, N'7D708017-9086-4930-9964-C98BE1ABAB6B', CAST(222.10 AS Decimal(10, 2)), CAST(N'2025-05-06T11:19:32.737' AS DateTime))
INSERT [dbo].[Orders] ([Id], [UserId], [TotalAmount], [OrderDate]) VALUES (14, N'7D708017-9086-4930-9964-C98BE1ABAB6B', CAST(0.00 AS Decimal(10, 2)), CAST(N'2025-05-06T11:55:42.800' AS DateTime))
INSERT [dbo].[Orders] ([Id], [UserId], [TotalAmount], [OrderDate]) VALUES (15, N'7D708017-9086-4930-9964-C98BE1ABAB6B', CAST(0.00 AS Decimal(10, 2)), CAST(N'2025-05-06T12:00:27.140' AS DateTime))
INSERT [dbo].[Orders] ([Id], [UserId], [TotalAmount], [OrderDate]) VALUES (16, N'7D708017-9086-4930-9964-C98BE1ABAB6B', CAST(73.12 AS Decimal(10, 2)), CAST(N'2025-05-06T12:01:29.747' AS DateTime))
INSERT [dbo].[Orders] ([Id], [UserId], [TotalAmount], [OrderDate]) VALUES (17, N'7D708017-9086-4930-9964-C98BE1ABAB6B', CAST(52.77 AS Decimal(10, 2)), CAST(N'2025-05-06T13:39:39.357' AS DateTime))
INSERT [dbo].[Orders] ([Id], [UserId], [TotalAmount], [OrderDate]) VALUES (18, N'7D708017-9086-4930-9964-C98BE1ABAB6B', CAST(37.14 AS Decimal(10, 2)), CAST(N'2025-05-06T13:57:00.203' AS DateTime))
INSERT [dbo].[Orders] ([Id], [UserId], [TotalAmount], [OrderDate]) VALUES (19, N'0A323D98-585D-49D4-B80F-0DB055CE4A83', CAST(37.14 AS Decimal(10, 2)), CAST(N'2025-05-06T16:41:36.623' AS DateTime))
SET IDENTITY_INSERT [dbo].[Orders] OFF
GO
INSERT [dbo].[UserDetails] ([user_id], [user_email], [user_name], [user_password], [role]) VALUES (N'0a323d98-585d-49d4-b80f-0db055ce4a83', N'vaefsda@bmail.com', N'Test123', N'$2b$10$LvEk0IgrsfFU8lLn2QmNt.q0yX.UIGI0eUBJaI.62A6qmI8GHBnyG', N'user')
INSERT [dbo].[UserDetails] ([user_id], [user_email], [user_name], [user_password], [role]) VALUES (N'08840a3a-ae59-4fb6-b73d-207df535c632', N'chitrac20@gmail.com', N'chitra', N'$2b$10$.ygoePBfAbtiq.MWIW7Ksu8L8jlrz9l/OXRPK85FEcctaDA/GCeQS', N'user')
INSERT [dbo].[UserDetails] ([user_id], [user_email], [user_name], [user_password], [role]) VALUES (N'6adef615-bff8-462e-a177-28a4b003ea6c', N'test@ymail.com', N'TestUser', N'$2b$10$YQHJkdgfuIOnryHYGGODKu91SvKmwJO2E5zxWFcXG/0nFG4p15fh.', N'user')
INSERT [dbo].[UserDetails] ([user_id], [user_email], [user_name], [user_password], [role]) VALUES (N'b03e4166-c02f-4f6b-a6b1-f85b1532d82d', N'chitrac20@gmail.com', N'Test01', N'$2b$10$VqWITwmMRNKbeOZ.i.OVLOF7Ad3MrFbmgBemIJGxHArzimpTrpRtq', N'user')
GO
/****** Object:  Index [UQ_BeanOfTheDay]    Script Date: 06/05/2025 16:44:05 ******/
ALTER TABLE [dbo].[BeanOfTheDay] ADD  CONSTRAINT [UQ_BeanOfTheDay] UNIQUE NONCLUSTERED 
(
	[date] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_UserDetails]    Script Date: 06/05/2025 16:44:05 ******/
ALTER TABLE [dbo].[UserDetails] ADD  CONSTRAINT [IX_UserDetails] UNIQUE NONCLUSTERED 
(
	[user_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT (getdate()) FOR [OrderDate]
GO
ALTER TABLE [dbo].[UserDetails] ADD  DEFAULT (newid()) FOR [user_id]
GO
ALTER TABLE [dbo].[BeanOfTheDay]  WITH CHECK ADD FOREIGN KEY([bean_id])
REFERENCES [dbo].[Beans] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[OrderItems]  WITH CHECK ADD FOREIGN KEY([OrderId])
REFERENCES [dbo].[Orders] ([Id])
GO
