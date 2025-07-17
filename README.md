# Turborepo + Module Federation Microfrontend Örnek Projesi

Bu proje, modern frontend mimarisi için **Turborepo** ve **Webpack 5 Module Federation** kullanılarak hazırlanmış, domain bazlı microfrontend yapısını örnekleyen bir monorepodur.

## Klasör Yapısı

```
workspace/turborepo/
  apps/
    host-app/        # Ana uygulama (adminpanel.getir.com)
    user-app/        # user.getir.com (microfrontend)
    product-app/     # product.getir.com (microfrontend)
    order-app/       # order.getir.com (microfrontend)
  packages/
    ui/              # Ortak UI componentleri (örn: Button)
    utils/           # Ortak yardımcı fonksiyonlar
  turbo.json         # Turborepo pipeline ayarları
  package.json       # Monorepo root package
  tsconfig.json      # Ortak TypeScript ayarları
```

## Uygulamalar ve Portlar

- **host-app**: Ana uygulama (port: 3000)
- **user-app**: User microfrontend (port: 3001)
- **product-app**: Product microfrontend (port: 3002)
- **order-app**: Order microfrontend (port: 3003)

## Kurulum

1. **Kök dizinde bağımlılıkları yükle:**
   ```sh
   npm install
   ```

2. **Her app ve package için bağımlılıkları yükle:**
   (Turborepo workspaces ile otomatik yapılır)

## Geliştirme Ortamı

Her app'i ayrı ayrı başlatabilirsin. Örneğin:

```sh
# Host app (adminpanel.getir.com)
cd apps/host-app
npm run dev

# User app (user.getir.com)
cd ../user-app
npm run dev

# Product app (product.getir.com)
cd ../product-app
npm run dev

# Order app (order.getir.com)
cd ../order-app
npm run dev
```

> Her app için webpack-dev-server scripti package.json'a eklenmelidir.

## Build

Tüm app ve package'ları build etmek için:
```sh
npm run build
```

## Mimari Açıklama

- **Host App** (`host-app`):
  - React Router ile route yönetimi yapar.
  - React.lazy ve Suspense ile microfrontend'leri dinamik olarak yükler.
  - Sol menüde linkler ile /user, /product, /order route'larına yönlendirme yapar.
  - Her route'da ilgili microfrontend (user-app, product-app, order-app) dinamik olarak yüklenir.

- **Microfrontendler** (`user-app`, `product-app`, `order-app`):
  - Her biri bağımsız bir React uygulamasıdır.
  - Webpack 5 Module Federation ile kendi remoteEntry.js dosyasını üretir.
  - Ortak UI componentlerini (örn: Button) doğrudan packages/ui'dan import eder.
  - Kendi başına da çalışabilir, host-app üzerinden de dinamik olarak yüklenebilir.

- **Ortak UI ve Utils** (`packages/ui`, `packages/utils`):
  - Tüm app'ler tarafından doğrudan import edilebilen ortak component ve yardımcı fonksiyonlar.

## Önemli Notlar

- **Portlar:** Her app farklı bir portta çalışır. Host-app remote'ları localhost:3001, 3002, 3003 üzerinden yükler.
- **Module Federation:**
  - host-app: remote olarak user_app, product_app, order_app'ı tanımlar.
  - microfrontendler: kendi App componentini expose eder (ör: './UserApp').
- **Ortak Component Kullanımı:**
  - packages/ui içindeki Button componenti, microfrontend app'lerde doğrudan import edilip kullanılabilir.
- **TypeScript:** Tüm projede TypeScript kullanılır. Ortak tsconfig.json ile ayarlar paylaşılır.
- **Babel ve Webpack:** Her app için ayrı .babelrc ve webpack.config.js dosyası bulunur.

## Geliştirme ve Çalıştırma Akışı

1. Tüm app'leri ve package'ları başlat.
2. Host-app'e (localhost:3000) git.
3. Sol menüden bir microfrontend seç (ör: User App). İlgili microfrontend dinamik olarak yüklenir ve gösterilir.
4. Her microfrontend kendi başına da (örn: localhost:3001) çalıştırılabilir.

## Ekstra

- Yeni bir microfrontend eklemek için apps/ altında yeni bir klasör oluşturup benzer şekilde webpack, babel, tsconfig ve public dosyalarını ekleyebilirsin.
- Ortak bir component veya util eklemek için packages/ui veya packages/utils altında ekleyip, app'lerde doğrudan import edebilirsin.

---

Her türlü soru ve katkı için: [Proje sahibiyle iletişime geçin]
