/* eslint-disable max-len */
export const salesAgreementHTMLtr = ({ foodOrder }) => `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="" xml:lang="">
<head>
    <title>Sözleşme ve Bilgilendirme</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <style type="text/css">
        @page { size: auto;  margin-top: 8mm; }
        body {
            font-family: "Open Sans", sans-serif;
            color: #3e3e3e;
            font-weight: 600;
            font-size: 12px !important;
            margin: 0;
            padding: 0;
        }
        main {
            font-family: "Open Sans", sans-serif;
            font-weight: 600;
            font-size: 12px !important;
            padding: 20px 15px 5px 15px;
            color: #3e3e3e;
        }
        div {
            font-family: "Open Sans", sans-serif;
            font-weight: 600;
            padding: 0px !important;
            font-size: 12px !important;
        }
        p {
            font-family: "Open Sans", sans-serif;
            font-weight: 600;
            margin-top: -4px !important;
            font-size: 12px !important;
        }
        table {
            margin-bottom: 6px;
        }
        span {
            font-family: "Open Sans", sans-serif;
            font-weight: 600;
            font-size: 12px !important
        }
        span > p {
            font-family: "Open Sans", sans-serif;
            font-weight: 600;
            font-size: 12px !important
        }
        strong {
            font-family: "Open Sans", sans-serif;
            font-weight: bold;
            font-size: 12px !important
        }
        blockquote {
            font-family: "Open Sans", sans-serif;
            font-weight: 600;
            font-size: 12px !important;
            margin: 2px 0px 0px 0px !important;
            padding: 0px !important;
            border: none !important;
        }
        blockquote > div {
            font-family: "Open Sans", sans-serif;
            font-weight: 600;
            font-size: 12px !important;
            margin-top: 0px;
            margin-bottom: 2px;
            padding-bottom: 2px;
            text-indent: 2em;
        }
        blockquote > p {
            font-family: "Open Sans", sans-serif;
            font-weight: 600;
            margin-top: 0px;
            margin-bottom: 2px;
            padding-bottom: 2px;
            text-indent: 2em;
            font-size: 12px !important
        }
        blockquote > div > p {
            font-family: "Open Sans", sans-serif;
            font-weight: 600;
            font-size: 12px !important
        }
        .primary-title, .section-header, th, .secondary-title{
            font-family: "Open Sans", sans-serif;
            font-weight: 600;
            font-style: normal;
            font-stretch: normal;
            line-height: 1.14;
            letter-spacing: normal;
            color: #5d38c0;
        }
    </style>
</head>
<body>
<main>
    <p class="section-header"><strong>GETİR PERAKENDE LOJİSTİK ANONİM ŞİRKETİ ÖN BİLGİLENDİRME FORMU</strong></p>
    <p><strong>İşbu Ön Bilgilendirme Formu, Getir Uygulaması üzerinden vermekte olduğunuz sipariş için yapacağınız Mesafeli Satış Sözleşmesi (Sözleşme) öncesinde bilgi amaçlı olarak tarafınıza sunulmaktadır.</strong></p>
    <p class="secondary-title"><strong>ARACI HİZMET SAĞLAYICI BİLGİLERİ</strong></p>
    <p>Ünvan: Getir Perakende Lojistik A.Ş. (“Getir”)</p>
    <p>Etiler Mah. Tanburi Ali Efendi Sok. Maya Residences Sit. T Blok No: 13/334 Beşiktaş/İstanbul</p>
    <p>Telefon: +90 (850) 532 50 50</p>
    <p>E-posta: info@getir.com</p>
    <p>Mersis No: 0394048265800010</p>
    <p class="secondary-title"><strong>SATICI BİLGİLERİ</strong></p>
    <p>Ünvan: ${foodOrder?.restaurant?.companyName}</p>
    <p>Adres: ${foodOrder?.restaurant?.companyAddress}</p>
    <p>Telefon: </p>
    <p>E-posta: ${foodOrder?.restaurant?.email}</p>
    <p>Mersis No: </p>
    <p class="secondary-title"><strong>MÜŞTERİ BİLGİLERİ</strong></p>
    <p>Teslim edilecek kişi: ${foodOrder?.client?.name}</p>
    <p>Teslimat Adresi: ${foodOrder?.address}</p>
    <p>Telefon: ${foodOrder?.client?.gsm}</p>
    <p>E-posta: ${foodOrder?.client?.email}</p>
    <p class="secondary-title"><strong>FATURA BİLGİLERİ</strong></p>
    <p>Adı/Soyadı/Unvanı: ${foodOrder?.invoice?.title}</p>
    <p>Adres: ${foodOrder?.invoice?.address}</p>
    <p>Telefon: ${foodOrder?.invoice?.gsm}</p>
    <p>E-posta: ${foodOrder?.invoice?.email}</p>
    <p class="secondary-title"><strong>ÜRÜN AÇIKLAMASI</strong></p>
    <div align="center">
        <table style="border: 1px dashed #000000;" border="0" cellpadding="0" width="100%">
            <thead>
            <tr height="30px">
                <th width="50%">Ürün Açıklaması</th>
                <th width="5%">Adet</th>
                <th width="20%">Satış Bedeli (KDV Dahil)</th>
            </tr>
            </thead>
            <tbody>
            ${foodOrder?.products?.map(product => `
              <tr height="28px">
                <td style="text-align:center;">${product?.name} ${product?.selectedAmount ? product?.selectedAmount : ''}</td>
                <td style="text-align:center;">${product?.count}</td>
                <td style="text-align:center;">₺${product?.price}</td>
              </tr>
            `)}
            </tbody>
        </table>
    </div>
    <p class="secondary-title"><strong>TANIMLAR</strong></p>
    <p>Ön Bilgilendirme Formu ve Mesafeli Satış Sözleşmesi’nin yorumlanmasında aşağıdaki ifadeler, burada atfedilen anlamları taşımaktadır.</p>
    <p><strong>Getir/Aracı Hizmet Sağlayıcı:</strong> Getir Perakende Lojistik Anonim Şirketi.</p>
    <p><strong>Satıcı:</strong> Müşteri’ye mal sunan ya da mal sunanın adına  ya da  hesabına  hareket eden yukarıda bilgileri bulunan gerçek ve/veya tüzel kişiyi,</p>
    <p><strong>Uygulama:</strong> Getir’e ait mobil ve diğer internet bağlantısı olan cihazlarda kullanılabilen Getir’in müşterilerine sunduğu ürünlerin/hizmetlerin sipariş edilebildiği tüm fikri ve sınai hakları Getir’e ait olan uygulama.</p>
    <p><strong>Müşteri:</strong> Uygulama üzerinden mal veya hizmetlere ilişkin sipariş talebi oluşturan kişi.</p>
    <p><strong>Taraf(lar):</strong> Müşteri, Satıcı ve/veya Getir.</p>
    <p><strong>Sözleşme:</strong> Taraflar arasında bu Form’da yer alan bilgiler uyarınca kurulan mesafeli satış sözleşmesi.</p>
    <p><strong>Ürün:</strong> Getir’in hizmet verdiği bölgelerde, Satıcı tarafından sunulan ve Uygulama’da yer alan seçenekler arasından, Müşteri tarafından seçilen ve Satıcı tarafından, Müşteri’ye sunulan hizmet veya mal.</p>
    <p><strong>Mücbir Sebep Halleri:</strong> Nakliyeyi engelleyen hava muhalefetleri, ulaşım kesintisi, altyapı ve internet arızaları, yangın, deprem, sel baskını, diğer doğal afetler ile salgın hastalık gibi olağanüstü olayları, kargaşa, yaygın şiddet hareketleri, grev veya resmi makamların düzenlemeleri dahil ancak bunlarla sınırlı olmaksızın Taraflar’ın yükümlülüklerini yerine getirmesini objektif olarak engelleyebilecek veya geciktirebilecek nitelikteki durumlar.</p>
    <p class="secondary-title"><strong>ÖDEME</strong></p>
    <p>Online ödeme seçeneğinin seçilmesi halinde, Ürün satış fiyatı, teslimat masrafları, taşıma araçlarına ilişkin bedeller ve diğer her türlü vergi, resim, harç gibi ek ücretler, Müşteri’nin seçtiği kredi/banka kartından veya yemek kartından, sipariş verildiğinde tahsil edilecektir. Müşteri’nin, siparişini getiren kuryeye, Uygulama üzerinden bahşiş ödemesi yapmak istemesi halinde, ki bahşiş tamamıyla Müşteri memnuniyeti bağlı olup isteğe tabidir, Uygulama'da yer alan bahşiş tutarlarından birini seçip ya da tutarı girdikten sonra yönlendirileceği ödeme ekranında işlem yapması gerekecektir. Ürün satış fiyatı, Getir tarafından Satıcı adına tahsil edilmektedir. </p>
    <p>Uygulama üzerinden aksi açıkça belirtilmediği takdirde, Ürün’ün teslimat masrafları, taşıma araçlarına ilişkin bedeller ve diğer her türlü vergi, resim, harç gibi ek ücretler Müşteri’ye aittir. Herhangi bir nedenle Müşteri tarafından ödeme yapılmaz veya yapılan ödeme banka/finans kuruluşu tarafından iptal edilirse, Getir veya Satıcı , teslim yükümlülüğünden kurtulmuş kabul edilir. Bahşiş ödemesi iptal edilemez; ödeme yapıldıktan sonra ödeme banka/finans kuruşu tarafından iptal edilmediği sürece Getir tüm Bahşiş tutarını tahsil etmiş olacaktır ve sonrasında herhangi bir iade işlemi gerçekleştirilemeyecektir.</p>
    <p>Müşteri, kredi kartı ile yapılan ödemelerde, kredi kartı faiz oranlarının, Müşteri ile banka arasındaki sözleşme kapsamında uygulanacağını kabul eder.</p>
    <p>Müşteri tarafından kapıda  ödeme  seçeneğinin  seçilmesi halinde, Ürün  satış fiyatı  ve varsa  diğer  her türlü bedeller ve her  türlü vergi, resim, harç gibi ek ücretler teslimat  sırasında Müşteri’den  nakit olarak, kredi veya banka  kartından veya yemek kartından Satıcı tarafından  tahsil edilecektir. </p>
    <p class="secondary-title"><strong>TESLİMAT</strong></p>
    <p>Uygulama üzerinden gösterilen teslim süresi, Getir’in veya Satıcı’nın teslimatı gerçekleştirmeyi hedeflediği tahmini ve bağlayıcı olmayan bir süredir. Ürün, sipariş tarihinden itibaren yasal 30 (otuz) günlük yasal süreyi aşmamak koşulu ile Müşteri veya Müşteri’nin gösterdiği adresteki kişi/kuruluşa en kısa zamanda teslim edilir. Sipariş tarihinden itibaren 30 (otuz) günlük süre içerisinde teslimatın gerçekleşmemiş olması halinde Müşteri, siparişini iptal edebilir.</p>
    <p>Satıcı ve Getir, Getir’in belirlediği ve Uygulama üzerinden sipariş verilebilen kapsama alanlarında teslimat yapmaktadır. Uygulama üzerinden sipariş alınabilen bu kapsama alanları haricinde teslimat gerçekleştirilmez. Ürün, Müşteri’nin sipariş verirken bildirdiği adrese Getir veya Satıcı tarafından teslim edilecektir. Müşteri’nin sonradan adresi değiştirebilmesi mümkün değildir. Müşteri veya belirlediği alıcının teslimat adresinde bulunmaması, Ürün’ü teslim almaması veya hatalı adres bildirilmesi durumunda Getir veya Satıcı , hiçbir sorumluluk kabul etmez, bu durumda Getir veya Satıcı , edimini tam ve eksiksiz olarak yerine getirmiş kabul edilecektir. Bu nedenle, Müşteri’nin Ürün’ü geç teslim almasından kaynaklanan her türlü zarar ile Ürün’ün Müşteri’nin kusurundan dolayı beklemiş olması ve/veya Ürün’ün teslim edilememesi nedeniyle iade edilmesinden dolayı oluşan giderler de Müşteri’ye aittir.</p>
    <p>Getir veya Getir aracılığıyla Satıcı , Ürün’ü tedarik edemeyeceğinin anlaşılması halinde, Müşteri’yi bilgilendirerek açıkça onayını almak koşuluyla, ilgili Ürün ile eşit kalite ve fiyatta farklı bir ürün veya hizmet tedarik edebilir. Müşteri’nin bu duruma onay vermediği hallerde siparişi iptal edilir.</p>
    <p>Mücbir Sebep Halleri’nin varlığı nedeniyle teslimatın gerçekleştirilemeyeceğinin anlaşılması üzerine Getir veya Getir aracılığıyla satıcı , durumu Müşteri’ye, mümkün olan en kısa sürede bildirir.</p>
    <p class="secondary-title"><strong>CAYMA HAKKI</strong></p>
    <p>Müşteri, Ürün’ü teslim aldığı tarihten itibaren 14 (on dört) gün içinde herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin Sözleşme’den cayma hakkına sahiptir. Hizmet sunumuna ilişkin mesafeli sözleşmelerde ise, bu süre Sözleşme’nin kurulduğu tarihten itibaren başlar. Ancak Müşteri, Sözleşme’nin kurulmasından Ürün’ün teslimine kadar olan süre içinde de cayma hakkını kullanabilir.</p>
    <p>Cayma hakkının kullanılması, Ürün’ün ambalajının açılmamış, bozulmamış ve kullanılmamış olması şartına bağlıdır. İade edilecek Ürün’ün, kutusu, ambalajı, varsa standart aksesuarları ile birlikte eksiksiz ve hasarsız olarak teslim edilmesi gerekmektedir.</p>
    <p>Ayrıca, aşağıdaki sözleşmelerde cayma hakkı kullanılamaz:</p>
    <ol type="a">
        <li>Fiyatı finansal piyasalardaki dalgalanmalara bağlı olarak değişen ve satıcı veya sağlayıcının kontrolünde olmayan mal veya hizmetlere ilişkin sözleşmeler.</li>
        <li>Tüketicinin istekleri veya kişisel ihtiyaçları doğrultusunda hazırlanan mallara ilişkin sözleşmeler.</li>
        <li>Çabuk bozulabilen veya son kullanma tarihi geçebilecek malların teslimine ilişkin sözleşmeler.</li>
        <li>Tesliminden sonra ambalaj, bant, mühür, paket gibi koruyucu unsurları açılmış olan mallardan; iadesi sağlık ve hijyen açısından uygun olmayanların teslimine ilişkin sözleşmeler.</li>
        <li>Tesliminden sonra başka ürünlerle karışan ve doğası gereği ayrıştırılması mümkün olmayan mallara ilişkin sözleşmeler.</li>
        <li>Malın tesliminden sonra ambalaj, bant, mühür, paket gibi koruyucu unsurları açılmış olması halinde maddi ortamda sunulan kitap, dijital içerik ve bilgisayar sarf malzemelerine ilişkin sözleşmeler.</li>
        <li>Abonelik sözleşmesi kapsamında sağlananlar dışında, gazete ve dergi gibi süreli yayınların teslimine ilişkin sözleşmeler.</li>
        <li>Belirli bir tarihte veya dönemde yapılması gereken, konaklama, eşya taşıma, araba kiralama, yiyecek-içecek tedariki ve eğlence veya dinlenme amacıyla yapılan boş zamanın değerlendirilmesine ilişkin sözleşmeler.</li>
        <li>Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayri maddi mallara ilişkin sözleşmeler.</li>
        <li>Cayma hakkı süresi sona ermeden önce, tüketicinin onayı ile ifasına başlanan hizmetlere ilişkin sözleşmeler.</li>
    </ol>
    <p>Cayma hakkının istisnasını teşkil eden hallerde cayma hakkından faydalanılamayacağı gibi, bu hakkı usulüne uygun veya zamanında kullanmadığı durumda Müşteri, cayma hakkını kaybeder.</p>
    <p>Müşteri, cayma hakkını kullanarak Ürün’ü iade etmek istemesi halinde, bu talebini yukarıda belirtilen 14 (on dört) günlük süre içinde Satıcı’ya veya Getir’e, Getir Müşteri hizmetlerini +90 (850) 532 5050 telefon numarasından arayarak, info@getir.com adresine e-posta atarak ya da ekte yer alan örnek cayma formunu (EK – CAYMA FORMU) doldurarak ve iadeli taahhütlü posta, faks veya e-posta aracılığıyla bildirecek ve ilgili cayma bildirimini yönelttiği tarihten itibaren 10 (on) gün içerisinde Ürün’ü herhangi bir kargo şirketi ile masrafları Getir’e veya Satıcı’ya ait olmak üzere iade edebilecektir. Getir, Müşteri’nin talebini aldıktan sonra en geç 14 (on dört) gün içerisinde, Ürün’ün iadesini kabul edip Ürün bedelini ilgili bankaya ödemekle yükümlüdür.</p>
    <p>Kredi kartı veya banka kartı ile alınmış Ürün için cayma hakkının kullanılması veya başka herhangi bir sebeple Ürün’ün iadesi veya siparişin iptal edilmesi durumunda Müşteri’ye nakit para ile ödeme yapılmamaktadır. Ürün bedelinin kredi kartına veya banka kartına iadesi, ilgili bankanın prosedürlerine göre yapılmaktadır. Müşteri’nin tanımlı yemek kartı ile online ödeme yapması halinde, iadeler ilgili karta ilgili kuruluşun prosedürlerine göre yapılmaktadır. </p>
    <p>Kapıda nakit ödeme yapılan hallerde, Müşteri tarafından ödenen ücret Satıcı tarafından Müşteri’ye iade edilecektir. Kapıda kredi kartı veya banka kartıyla ödeme yapılan hallerde, aynı gün içerisinde gelen talepler kapsamında Satıcı tarafından işlem pos cihazı üzerinden iptal edilecek ve ücret Müşteri’ye iade edilecektir. Aynı gün içerisinde yapılmayan talepler için iadeler ilgili bankanın prosedürlerine göre yapılacaktır. Kapıda ödeme esnasında, yemek kartı ile yapılan ödemelere ilişkin iadeler, Satıcı tarafından belirlenen prosedürlere göre yapılacaktır.</p>
    <p>Müşteri, siparişe ilişkin tüm iptal ve iade durumları için müşteri hizmetleri ile +90 (850) 532 50 50 numaralı telefon veya info@getir.com e-posta adresi ile irtibata geçilebilir.</p>
    <p class="secondary-title"><strong>İLETİŞİM</strong></p>
    <p>Siparişe ilişkin tüm sorular için müşteri hizmetleri ile +90 (850) 532 50 50 numaralı telefon veya info@getir.com e-posta adresi ile irtibata geçilebilir.</p>
    <p class="secondary-title"><strong>YETKİLİ YARGILAMA MAKAMLARI</strong></p>
    <p>Taraflar, Sözleşme’den doğan ihtilaflarda mevzuat çerçevesinde belirlenen parasal sınırlar dahilinde Müşteri ve Satıcı’nın kayıtlı adresinin bulunduğu yerdeki tüketici hakem heyetlerinin, parasal sınırları aşan uyuşmazlıklarda Müşteri’nin ve Satıcı’nın bulunduğu yerdeki tüketici mahkemelerinin yetkili olacağını kabul etmiştir.</p>
    <p class="secondary-title"><strong>DİĞER HUSUSLAR</strong></p>
    <p>Ön Bilgilendirme Formu ve Sözleşme, Uygulama üzerinden kabul edilmesi üzerine, Uygulama’ya kayıt olurken iletilen e- posta adresine gönderilir. Bu belgelere Uygulama üzerinden her zaman erişilebilir. Siparişe ilişkin tüm kayıtlar, ilgili yasalar çerçevesinde 10 (on) yıl süre ile Getir’in kayıtlarında saklanacaktır.</p>
    <p>Müşteri, onayı halinde Sözleşme'nin ayrılmaz bir parçasını oluşturacak bu Form ile, satışa konu Ürün’ün temel özellik-nitelikleri, satış fiyatı, ödeme şekli, teslimat işlemleri, iade ve cayma hakkı ile iletişim dahil tüm hususlarda bilgilendirilmiş bulunmaktadır.</p>
    <p>Bu Form’daki tüm hususlar Müşteri’nin Uygulama üzerinden elektronik olarak onayladığı an itibariyle geçerli olup, Sözleşme ile birlikte bağlayıcı olarak uygulanır.</p>
    <p class="secondary-title"><strong>EK - CAYMA FORMU</strong></p>
    <p>(Bu form, ürün/ürünlere ilişkin cayma hakkı kullanılmak istenildiğinde doldurup gönderilecektir.)</p>
    <p>GETİR PERAKENDE LOJİSTİK A.Ş.’ye veya Satıcı’ya</p>
    <p>Bu formla aşağıdaki malların satışına veya hizmetlerin sunulmasına ilişkin sözleşmeden cayma hakkımı kullandığımı beyan ederim.</p>
    <ul>
        <li>Sipariş tarihi veya teslim tarihi:</li>
        <li>Cayma hakkına konu mal veya hizmet:</li>
        <li>Cayma hakkına konu mal veya hizmetin bedeli:</li>
        <li>Müşteri’nin adı ve soyadı:</li>
        <li>Müşteri’nin Uygulama’da kayıtlı telefon numarası:</li>
        <li>Müşteri’nin bildirdiği teslimat adresi:</li>
        <li>İmza: (Sadece kağıt üzerinde gönderilmesi halinde)</li>
        <li>Tarih:</li>
    </ul>
    <p class="section-header"><strong>GETİR PERAKENDE LOJİSTİK ANONİM ŞİRKETİ MESAFELİ SATIŞ SÖZLEŞMESİ</strong></p>
    <p class="primary-title"><strong>1. KONU</strong></p>
    <p>Sözleşme’nin konusu, Müşteri’nin Satıcı’ya Uygulama üzerinden türünü/adını, adedini, satış bedelini, teslimat bedelini, ödeme şeklini belirlemek suretiyle siparişini verdiği Ürün’ün, Getir veya Satıcı tarafından Müşteri’ye satışı ve teslimi hakkında 6502 sayılı Tüketicinin Korunması Hakkında Kanun, Mesafeli Sözleşmeler Yönetmeliği ve ilgili diğer yasal düzenlemeler uyarınca Taraflar’ın hak ve yükümlülüklerinin belirlenmesine ilişkindir.</p>
    <p>Sözleşme’de büyük harf ile başlayan ifadeler Ön Bilgilendirme Formu’nda belirlenen anlamı taşımaktadır.</p>
    <p class="primary-title"><strong>2. SATICI, ARACI HİZMET SAĞLAYICI, MÜŞTERİ VE ÜRÜN’E İLİŞKİN BİLGİLER</strong></p>
    <p class="secondary-title"><strong>ARACI HİZMET SAĞLAYICI BİLGİLERİ</strong></p>
    <p>Ünvan: Getir Perakende Lojistik A.Ş. (“Getir”)</p>
    <p>Etiler Mah. Tanburi Ali Efendi Sok. Maya Residences Sit. T Blok No: 13/334 Beşiktaş/İstanbul</p>
    <p>Telefon: +90 (850) 532 50 50</p>
    <p>E-posta: info@getir.com</p>
    <p>Mersis No: 0394048265800010</p>
    <p class="secondary-title"><strong>SATICI BİLGİLERİ</strong></p>
    <p>Ünvan: ${foodOrder?.restaurant?.companyName}</p>
    <p>Adres: ${foodOrder?.restaurant?.companyAddress}</p>
    <p>Telefon: </p>
    <p>E-posta: ${foodOrder?.restaurant?.email}</p>
    <p>Mersis No: </p>
    <p class="secondary-title"><strong>MÜŞTERİ BİLGİLERİ</strong></p>
    <p>Teslim edilecek kişi: ${foodOrder?.client?.name}</p>
    <p>Teslimat Adresi: ${foodOrder?.address}</p>
    <p>Telefon: ${foodOrder?.client?.gsm}</p>
    <p>E-posta: ${foodOrder?.client?.email}</p>
    <p class="secondary-title"><strong>FATURA BİLGİLERİ</strong></p>
    <p>Adı/Soyadı/Unvanı: ${foodOrder?.invoice?.title}</p>
    <p>Adres: ${foodOrder?.invoice?.address}</p>
    <p>Telefon: ${foodOrder?.invoice?.gsm}</p>
    <p>E-posta: ${foodOrder?.invoice?.email}</p>
    <p class="secondary-title"><strong>ÜRÜN AÇIKLAMASI</strong></p>
    <div align="center">
        <table style="border: 1px dashed #000000;" border="0" cellpadding="0" width="100%">
            <thead>
            <tr height="30px">
                <th width="50%">Ürün Açıklaması</th>
                <th width="5%">Adet</th>
                <th width="20%">Peşin Fiyatı</th>
                <th width="20%">Satış Bedeli (KDV Dahil)</th>
            </tr>
            </thead>
            <tbody>
            ${foodOrder?.products?.map(product => `
              <tr height="28px">
                <td style="text-align:center;">${product?.name} ${product?.selectedAmount ? product?.selectedAmount : ''}</td>
                <td style="text-align:center;">${product?.count}</td>
                <td style="text-align:center;">${product?.priceTaxExcluded ? product?.priceTaxExcluded : '-'}</td>
                <td style="text-align:center;">₺${product?.price}</td>
              </tr>
            `)}
            </tbody>
        </table>
    </div>
    <p class="primary-title"><strong>3. ÜCRETLER VE TAHSİLİ</strong></p>
    <p><strong>3.1.</strong> Müşteri, sipariş öncesinde Uygulama üzerinden, Ürün satış fiyatı, teslimat masrafları, taşıma araçlarına ilişkin bedeller ve diğer her türlü vergi, resim, harç gibi ek ücretlere ilişkin olarak bilgilendirilmiştir.</p>
    <p><strong>3.2.</strong> Kredi kartı/banka kartı veya yemek kartı ile ödemeyi gerçekleştirmek için, Müşteri’nin, Uygulama’ya kayıt olurken kart bilgilerini girmesi gerekmektedir. Uygulama, sipariş esnasında Müşteri’nin kart bilgilerini gizli ve güvenli bir biçimde girmesini sağlayacak şekilde düzenlenmiştir.</p>
    <p><strong>3.3.</strong> Ürün satış fiyatı, teslimat masrafları, taşıma araçlarına ilişkin bedeller ve diğer her türlü vergi, resim, harç gibi ek ücretler, Müşteri’nin seçtiği kredi kartından/banka kartından veya yemek kartından, sipariş verildiğinde derhal tahsil edilecektir. Ürün satış fiyatı, Getir tarafından Satıcı adına tahsil edilmektedir. Müşteri kapıda ödeme seçeneğini de tercih edebilecektir. Müşteri tarafından kapıda ödeme seçeneğinin seçilmesi halinde, Ürün satış fiyatı ve varsa diğer her türlü bedeller ve her türlü vergi, resim, harç gibi ek ücretler Müşteri’den teslimat sırasında nakit olarak, kredi veya banka kartından veya yemek kartından tahsil edilecektir.</p>
    <p><strong>3.4.</strong> Herhangi bir nedenle Müşteri tarafından Ürün bedeli ödenmez veya yapılan ödeme banka/finans kuruluşu tarafından iptal edilirse, Getir veya Satıcı, teslim yükümlülüğünden kurtulmuş kabul edilir.</p>
    <p><strong>3.5.</strong> Her koşulda Müşteri, Satıcı’ya olan borçlarını ifada temerrüde düşmesi halinde, Satıcı’nın uğradığı zarar ve ziyanı tazmin edeceğini kabul eder.</p>
    <p><strong>3.6.</strong> Müşteri, kredi kartı ile yapılan ödemelerde kredi kartı faiz oranlarının, Müşteri ile banka arasındaki sözleşme kapsamında uygulanacağını kabul eder.</p>
    <p><strong>3.7.</strong> Kredi kartı veya banka kartı veya yemek kartı ile alınmış Ürün için cayma hakkının kullanılması veya Ürün’ün başka herhangi bir sebeple iadesi veya siparişin iptal edilmesi durumunda Müşteri’ye nakit para ile ödeme yap ılmamaktadır . Ürün bedelinin kredi kartına veya banka kartına iadesi, ilgili bankanın prosedürlerine göre yapılmaktadır.  Müşteri’nin tanımlı yemek kartı ile online ödeme yapması halinde, iadeler ilgili karta ilgili kuruluşun prosedürlerine göre yapılmaktadır</p>
    <p>Kapıda nakit ödeme yapılan hallerde, Müşteri tarafından ödenen ücret Satıcı tarafından Müşteri’ye iade edilecektir. Kapıda kredi kartı veya banka kartıyla ödeme yapılan hallerde, aynı gün içerisinde gelen talepler kapsamında Satıcı tarafından işlem pos cihazı üzerinden iptal edilecek ve ücret Müşteri’ye iade edilecektir. Aynı gün içerisinde yapılmayan talepler için iadeler ilgili bankanın prosedürlerine göre yapılacaktır.  Kapıda ödeme esnasında, yemek kartı ile yapılan ödemelere ilişkin iadeler, Satıcı tarafından belirlenen prosedürlere göre yapılacaktır.</p>
    <p class="primary-title"><strong>4. KULLANIM ŞARTLARI VE GENEL HÜKÜMLER</strong></p>
    <p><strong>4.1.</strong> Getir ve Satıcı, Ön Bilgilendirme Formu’nda yer alan kendisine ilişkin bilgilerin doğru ve güncel olduğunu, Müşteri’yi sahip olduğu tüm haklara ilişkin olarak Ön Bilgilendirme Formu ve Sözleşme ile bilgilendirdiğini kabul eder.</p>
    <p><strong>4.2.</strong> Satıcı, Ürün’ün mevzuata uygun olarak, sağlam, eksiksiz, siparişte belirtilen niteliklere uygun ve varsa garanti belgeleri ve kullanım kılavuzları ile Müşteri’ye teslim edilmesinden sorumludur.</p>
    <p><strong>4.3.</strong> Getir veya Satıcı, Ön Bilgilendirme Formu ve Sözleşme’de ilettiği iletişim bilgileri üzerinden siparişe ilişkin sorularını yanıtlayacaktır. Bu kapsamda, Müşteri’nin kimliğini teyit etmeye yarayacak bilgileri, kişisel verilerin işlenmesine ilişkin prosedürleri uyarınca talep edilebilecektir.</p>
    <p><strong>4.4.</strong> Uygulama’da yer alan, ücretler dahil olmak üzere tüm bilgiler, Uygulama üzerinden değiştirilene kadar geçerlidir.</p>
    <p><strong>4.5.</strong> Uygulama’da kullanılan görsel öğeler temsili olabilir. Uygulama’da yer alan içerik ve görsel öğelerin tüm telif hakları saklı olup, kısmen veya tamamen kullanılması, çoğaltılması, yayınlanması veya yeniden işlenmesi yasaktır.</p>
    <p><strong>4.6.</strong> Müşteri, Uygulama’da Ürün’ün temel özellik ve nitelikleri, satış fiyatı, ödeme şekli, teslimatına ilişkin Ön Bilgilendirme Formunu okuyup bilgi sahibi olduğunu ve teyit ettiğini kabul eder. Müşteri’nin Ön Bilgilendirme Formunu elektronik ortamda teyit etmesi, mesafeli satış sözleşmesinin kurulmasından evvel, Müşteri’ye verilmesi gereken adresi, Ürün’e ait temel özellikleri, ürünlerin vergiler dahil fiyatını ve teslimata ilişkin diğer bedelleri, ödeme ve teslimat bilgileri de dahil olmak üzere mevzuat uyarınca verilmesi zorunlu tüm bilgileri doğru ve eksiksiz olarak edindiğini kabul eder.</p>
    <p><strong>4.7.</strong> Müşteri cayma hakkının kapsamı ve kullanılma koşullarına ilişkin olarak Ön Bilgilendirme Formu’nda detaylı olarak bilgilendirilmiştir.</p>
    <p><strong>4.8.</strong> Müşteri’ye, bir veya birden fazla ürünün bedelini ödemesine yarayan bir hediye çeki tanımlanmış olması halinde, hediye çekinin süresi içinde kullanılmaması veya Müşteri tarafından kullanım koşullarına aykırı ya da suiistimal edecek şekilde kullanılması nedeniyle siparişin iptal edilmesi durumunda, Müşteri hiçbir geri ödeme veya telafi talep edemez.</p>
    <p><strong>4.9.</strong> Müşteri ile sipariş esnasında kullanılan kredi kartı veya banka kartı hamilinin aynı kişi olmaması ve Ürün’ün, Uygulama üzerinden belirlenen alıcıya tesliminden evvel siparişte kullanılan karta ilişkin güvenlik açığı tespit edilmesi halinde, Getir, siparişi iptal edebilir.</p>
    <p><strong>4.10.</strong> Uygulama üzerinden Getir’in kontrolünde olmayan ve/veya başkaca üçüncü kişilerin sahip olduğu ve/veya işlettiği başka web sitelerine, elektronik uygulamalara ve/veya başka içeriklere bağlantı verilebilir. Bu bağlantılar Müşteri’ye yönlendirme kolaylığı sağlamak amacıyla konmuş olup, Getir’in bağlantı verilen içeriğe yönelik herhangi bir sorumluluğu bulunmamaktadır. Uygulamadan ulaşılan diğer sitelerde veya uygulamalarda kendilerine ait gizlilik-güvenlik politikaları geçerlidir.</p>
    <p class="primary-title"><strong>5. TESLİMAT</strong></p>
    <p><strong>5.1.</strong> Müşteri’nin Satıcı’dan Getir üzerinden satın almış olduğu Ürün, Uygulama üzerinden belirlediği, Ön Bilgilendirme Formu’nda açıkça yer alan adreste bulunan kişi/kişilere teslim edilecektir. </p>
    <p><strong>5.2.</strong> Uygulama üzerinden aksi açıkça belirtilmediği takdirde, Ürün’ün teslimat masrafları, taşıma araçlarına ilişkin bedeller ve diğer her türlü vergi, resim, harç gibi ek ücretler Müşteri’ye aittir.</p>
    <p><strong>5.3.</strong> Ürün’ün teslimatı, Satıcı’nın stokunun müsait olması ve ödemenin gerçekleşmesinden sonra Ön Bilgilendirme Formu’nda belirtilen süre içerisinde gerçekleştirir.</p>
    <p><strong>5.4.</strong> Herhangi bir nedenle Müşteri tarafından Ürün bedeli ödenmez veya yapılan ödeme banka/finans kuruşu tarafından iptal edilirse, Getir veya Satıcı, teslim yükümlülüğünden kurtulmuş kabul edilir. Herhangi bir sebeple banka/finans kuruluşu tarafından başarısız kodu gönderilen ancak banka/finans kuruşu tarafından Getir’e yapılan ödemelere ilişkin Müşteri, Getir’in herhangi bir sorumluluğunun bulunmadığını kabul eder.</p>
    <p><strong>5.5</strong>Müşteri tarafından kapıda ödeme seçeneğinin seçilmesi halinde, Ürün satış fiyatı ve varsa diğer her türlü bedeller ve her türlü vergi, resim, harç gibi ek ücretler Müşteri’den teslimat sırasında nakit olarak, kredi veya banka kartından veya yemek kartından tahsil edilecektir.</p>
    <p class="primary-title"><strong>6. MÜŞTERİ’NİN BEYAN VE TAAHHÜTLERİ</strong></p>
    <p><strong>6.1.</strong> Müşteri, Uygulama’ya üye olurken verdiği; vergi numarası, vergi dairesi bilgileri ile diğer tüm bilgilerin gerçeğe uygun olduğunu, Getir’in/Satıcı’nın bu bilgilerin gerçeğe aykırılığı nedeniyle uğrayacağı tüm zararları, Getir’in/Satıcı’nın ilk bildirimi üzerine derhal tazmin edeceğini taahhüt eder.</p>
    <p><strong>6.2.</strong> Müşteri, Ürün’ün temel nitelikleri, satış fiyatı ve ödeme şekli, teslimatı, cayma hakkı ve diğer hususlara ilişkin olarak sunulan Ön Bilgilendirme Formu’nu incelediğini, kendisine mevzuatta öngörülen gerekli tüm bilgilendirmenin yapıldığını ve elektronik ortamda teyit ettiğini beyan eder.</p>
    <p><strong>6.3.</strong> Müşteri, Uygulama’yı kullanırken mevzuata uygun davranmayı kabul eder. Müşteri, Uygulama’yı hiçbir şekilde kamu düzenine ve genel ahlaka aykırı, başkalarını rahatsız ve taciz edici şekilde, yasalara uygun olmayan bir amaç için, başkalarının maddi ve manevi haklarına tecavüz edecek şekilde kullanamaz. Ayrıca, başkalarının Uygulama’yı kullanmasını önleyici veya zorlaştırıcı (spam, virüs, truva atı vb.) işlemlerde bulunamaz. Aksi takdirde, tüm hukuki ve cezai yükümlülük münhasıran Müşteri’ye aittir. Ayrıca mevzuat veya Sözleşme’nin ihlali nedeniyle, Getir’in Müşteri’ye karşı yasal yollara başvurma hakkı saklıdır.</p>
    <p><strong>6.4.</strong> Getir’in Uygulama’da ilan ettiği promosyonları/kampanyaları ve hediye çeklerinin geçerliğini dilediği zaman durdurma, güncelleme veya koşullarını değiştirme hakkı saklıdır. Müşteri’nin Uygulama üzerinden vereceği her sipariş öncesinde promosyon/kampanya, hediye çeki kullanım koşullarını incelemesi gerekmektedir.</p>
    <p><strong>6.5.</strong> Müşteri, aksi Uygulama üzerinden açıkça bildirilmediği takdirde, aynı siparişte birden fazla promosyon, kampanya veya hediye çekinden yararlanamaz.</p>
    <p><strong>6.6.</strong> Müşteri, Sözleşme konusu Ürünler’i teslim almadan önce muayene etmelidir. Tahrip olmuş, ezik, kırık, ambalajı yırtılmış vb. hasarlı ve ayıplı Ürün’ü teslim alması veya eksik bir Ürüne ilişkin Getir’e veya Satıcı’ya derhal bildirimde bulunmaması halinde, sorumluluk Müşteri’ye aittir. Aksi takdirde, Müşteri tarafından teslim alınan Ürün’ün hasarsız, eksiksiz, sağlam ve Siparişteki taleplerine uygun olduğu kabul edilecektir.</p>
    <p><strong>6.7.</strong> Satıcı ve Getir, Getir’in kendi belirlediği ve Uygulama üzerinden sipariş verilebilen kapsama alanlarında teslimat yapmaktadır. Uygulama üzerinden sipariş alınabilen bu kapsama alanları haricinde teslimat gerçekleştirilmez. Ürün, Müşteri’nin sipariş verirken bildirdiği adrese teslim edilecektir. Müşteri’nin sonradan adresi değiştirebilmesi mümkün değildir. Müşteri veya belirlediği alıcının teslimat adresinde bulunmaması, Ürün’ü teslim almaması veya hatalı adres bildirilmesi durumunda Getir veya Satıcı, hiçbir sorumluluk kabul etmez, bu durumda Getir veya Satıcı, edimini tam ve eksiksiz olarak yerine getirmiş kabul edilecektir. Bu nedenle, Müşteri’nin Ürün’ü geç teslim almasından kaynaklanan her türlü zarar ile Ürün’ün Müşteri’nin kusurundan dolayı beklemiş olması ve/veya Ürün’ün teslim edilememesi nedeniyle Getir’e veya Satıcı’ya iade edilmesinden dolayı oluşan giderler de Müşteri’ye aittir.</p>
    <p class="primary-title"><strong>7. SORUMLULUK</strong></p>
    <p>Getir’in ve Satıcı’nın, Ön Bilgilendirme Formu ve Sözleşme’de yer alan yükümlülüklerinin Mücbir Sebep Halleri veya objektif olarak kendi kusurundan kaynaklanmayan diğer nedenlerle yerine getirilememesi durumunda hiçbir sorumluluğu bulunmamaktadır.</p>
    <p class="primary-title"><strong>8. İLETİŞİM</strong></p>
    <p>Siparişe ilişkin tüm sorular için müşteri hizmetleri ile +90 (850) 532 50 50 numaralı telefon veya info@getir.com e-posta adresi ile irtibata geçilebilir.</p>
    <p class="primary-title"><strong>9. YETKİLİ YARGILAMA MAKAMLARI</strong></p>
    <p>Taraflar, Sözleşme’den doğan ihtilaflarda mevzuat çerçevesinde belirlenen parasal sınırlar dahilinde Müşteri ve Satıcı’nın kayıtlı adresinin bulunduğu yerdeki Tüketici Hakem Heyetlerinin, parasal sınırları aşan uyuşmazlıklarda Müşteri’nin ve Satıcı’nın bulunduğu yerdeki Tüketici Mahkemelerinin yetkili olacağını kabul etmiştir.</p>
    <p class="primary-title"><strong>10. DELİL SÖZLEŞMESİ</strong></p>
    <p>Müşteri, Sözleşme’den doğabilecek her türlü ihtilafta Getir’in veya Satıcı’nın resmi defter ve ticari kayıtlarıyla, veritabanında ve sunucularında tuttuğu elektronik bilgilerin, bilgisayar ve ses kayıtlarının, delil teşkil edeceğini, bu maddenin Hukuk Muhakemeleri Kanunu’nun 193. maddesi anlamında delil sözleşmesi niteliğinde olduğunu kabul eder.</p>
    <p class="primary-title"><strong>11. YÜRÜRLÜK</strong></p>
    <p>Müşteri,’nin Uygulama’da “Ön Bilgilendirme Formu ve Mesafeli Satış Sözleşmesi’ni okudum ve kabul ediyorum” seçeneğini onaylaması ile Form ve Sözleşme’nin tüm koşulları derhal yürürlüğe girer.</p>
</main>
</body>
</html>
`.replace(/\n/g, '');
