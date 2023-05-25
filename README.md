## デモLIVEサイト
Azure AD B2C 認証付きの Single Page Application に加え、API Management 経由で API として動作する Azure Functions がユーザーオペレーションによりデータベースにテキスト挿入してくれるあるあるシナリオです。
ライブデモサイトを2023年6月末まで期間限定で公開中です。

https://brave-grass-055a2a000.3.azurestaticapps.net

![Architecture](https://github.com/TK3214-MS/POC-AUTH/assets/89323076/32e84fc2-d2d7-4599-a852-55a11b07672b)

## 事前準備
### 1. Azure AD B2C テナントの作成
新規 Azure AD B2C テナントを作成します。

[Azure AD B2C テナントを作成する](https://learn.microsoft.com/ja-jp/azure/active-directory-b2c/tutorial-create-tenant#create-an-azure-ad-b2c-tenant)

### 2. サインアップ／サインインポリシーの作成
サインアップとサインインユーザーフローを作成します。

[サインアップとサインインユーザーフローを作成する](https://learn.microsoft.com/ja-jp/azure/active-directory-b2c/add-sign-up-and-sign-in-policy?pivots=b2c-user-flow)

### 3. B2C テナントへの Azure AD アプリケーション登録
#### 3-1. Static Web App 用アプリケーションの登録


#### 3-2. API 用アプリケーションの登録


### 4. Static Web App 用アプリに対する API アクセス許可を設定

## リソース展開
以下ボタンをクリック頂くとお持ちの Azure サブスクリプションにリソースが自動作成されます。

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FTK3214-MS%2FPOC-AUTH%2Fmain%2Fbicep%2Fmain.json)

設定頂くパラメーターは以下の通りです。

- Region：リソースを展開するリージョンを指定します。
- Prefix：作成されるリソースのプレフィックスを指定します。（小文字英字のみ）
- Location：指定頂く必要はありません。
- Administrator User Name：Azure SQL Databaseで利用する管理者ユーザー名を指定します。
- Administrator User Email：Azure SQL Databaseで利用する管理者ユーザーメールアドレスを指定します。
- Administrator Login Password：Azure SQL Databaseで利用する管理者ユーザーパスワードを指定します。

## 展開後構成
### 1. Azure Functions へのインバウンドポリシーの設定


### 2. Azure Functions への認証設定


### 3. ソースコードのプッシュ


### 4. Azure SQL Database への Azure Functions 認証の設定
```
CREATE USER [Azure Functions App のリソース名] FROM EXTERNAL PROVIDER;
ALTER ROLE db_datareader ADD MEMBER [Azure Functions App のリソース名];
ALTER ROLE db_datawriter ADD MEMBER [Azure Functions App のリソース名];
GO
```

### 5. Azure SQL Database へのサンプルテーブル作成
```
CREATE TABLE dbo.SampleTable (
    InputText NVARCHAR(MAX) COLLATE Japanese_CI_AS NOT NULL,
    CreatedAt DATETIME NOT NULL,
);
```

## 動作確認
### 1. Static Web Apps の URL へアクセス


### 2. ユーザーサインアップ


### 3. データベースからのテキスト値 GET/POST 動作確認

## リソース
[SPA から使用される Azure API Management と Azure AD B2C によってサーバーレス API を保護する](https://learn.microsoft.com/ja-jp/azure/api-management/howto-protect-backend-frontend-azure-ad-b2c)
[Azure Active Directory B2C を使用してサンプルの React シングルページ アプリケーションで認証を構成する](https://learn.microsoft.com/ja-jp/azure/active-directory-b2c/configure-authentication-sample-react-spa-app)
