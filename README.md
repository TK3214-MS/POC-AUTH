## Deployment
[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FTK3214-MS%2FPOC-AUTH%2Fmain%2Fbicep%2Fmain.json)


- Static Web Apps の URL
  - https://brave-grass-055a2a000.3.azurestaticapps.net
## 各種実装
### バックエンド（API Management + Function）の実装
- [SPA から使用される Azure API Management と Azure AD B2C によってサーバーレス API を保護する](https://learn.microsoft.com/ja-jp/azure/api-management/howto-protect-backend-frontend-azure-ad-b2c)

### フロントエンド（SPA）の実装
- [Azure Active Directory B2C を使用してサンプルの React シングルページ アプリケーションで認証を構成する](https://learn.microsoft.com/ja-jp/azure/active-directory-b2c/configure-authentication-sample-react-spa-app)

## SQL Database の設定
### Azure Function に対する Azure AD 認証の有効化
```
CREATE USER [b2csamplescenario-function] FROM EXTERNAL PROVIDER;
ALTER ROLE db_datareader ADD MEMBER [b2csamplescenario-function];
ALTER ROLE db_datawriter ADD MEMBER [b2csamplescenario-function];
GO
```
### テーブルの作成
```
CREATE TABLE dbo.SampleTable (
    InputText NVARCHAR(MAX) COLLATE Japanese_CI_AS NOT NULL,
    CreatedAt DATETIME NOT NULL,
);
```
