/* eslint-disable max-len */
import { get } from 'lodash';

import LogoForCommitmentDoc from './images/logo-for-commitment-doc.png';
import FooterForCommitmentDoc from './images/footer-for-commitment-doc.png';

const getAssetCommitmentDocumentForTR = ({ assetList, employee }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
  <div style="width: 100%; text-align: center;">
    <p><b>ZİMMET FORMU VE KULLANIM TAAHHÜTNAMESİ</b></p>
    <br>
  </div>
  <div style="width: 100%; text-align: justify;">
    <p>İşbu Zimmet Formu ve Kullanım Taahhütnamesi <b>(“Taahhütname”)</b>, aşağıda kimlik bilgileri yer alan ve kayıtlı merkezi Tanburi Ali Efendi Sok. Etiler Mah. Maya Residences. Sitesi T Blok 13/334 Beşiktaş/İstanbul adresinde yer alan <b>GETİR PERAKENDE LOJİSTİK A.Ş.</b>’de <b>(“Getir”)</b> çalışmakta olan kişinin <b>("${get(employee, 'fullName', '')}")</b> kendisine işe giriş tarihinde teslim edilen GSM hattı, cep telefonu, bilgisayar gibi ekte detayları yer alan envanterin <b>(“Envanter”)</b> kullanım koşullarını teyit amaçlı olarak imzalanmıştır.</p>
    <ol>
      <li>
        <p style="margin-left: 10px;">Getir, Envanter’i, Çalışan’ın kullanımına özgülemiş, Çalışan da bu Envanter’i tam ve çalışır vaziyette teslim almıştır.</p>
      </li>
      <li>
        <p style="margin-left: 10px;">Çalışan, kendisine tahsis ve teslim edilen Envanter’i işbu Taahhütname’nin imza tarihine kadar Getir’in belirlediği/belirleyeceği veri güvenliği politikalarına ve Taahhütname’ye uygun biçimde kullandığını teyit eder. Çalışan, işbu Taahütname’nin imza tarihinden sonra da Envanter’i Taahütname’ye uygun olarak, yalnızca Getir’deki görevinin ifası ile doğrudan alakalı olarak kullanacağını kabul ve taahhüt eder.</p>
      </li>
      <li>
        <p style="margin-left: 10px;">Çalışan, kendisine görevinin ifası gereği test amacıyla tahsis ve teslim edilen cep telefonunu bu amaç dışında kullanmayacağını, test telefonunun hat ile kullanılmasını gerektiren hallerde yalnızca şirket hattıyla kullanacağını ve Ek-1’de yer alan Envanter Listesi’ne kullanım amacını test olarak bildireceğini kabul ve taahhüt eder.</p>
      </li>
      <li>
        <p style="margin-left: 10px;">Çalışan, Getir kaynaklarına erişebilmesi amacıyla kendisine tanımlanan şifre ve benzeri kimlik doğrulama araçlarının kişiye özgü olduğunu bildiğini, bu konuda Getir tarafından bilgilendirildiğini, bu bilgileri veya Envanter’i üçüncü kişiler ile paylaşmayacağını, kaybetmesi veya bu bilgilerin genel erişime açık hale gelmesi durumunda bunu en kısa sürede ilgili birime bildireceğini kabul ve taahhüt eder. Çalışan, bu bilgileri veya Envanter’i üçüncü kişilerle paylaşması, kaybetmesi veya rızası dışında başkaları tarafından ele geçirilmiş olmasına rağmen ilgili birime haber vermemesinden kaynaklanan kullanımlar nedeniyle oluşabilecek her türlü zarardan sorumlu olacağını ve bu zararları tazmin etmeyi kabul ve taahhüt eder.</p>
      </li>
      <li>
        <p style="margin-left: 10px;">Çalışan, kendisine tahsis ve teslim edilmiş olan Envanter’i ve diğer bilgi sistemleri kaynaklarını <i>(e-mail sistemleri, uygulama sistemleri, veri depolama sistemleri, vb.)</i> Getir’e zarar vermek amacıyla kullanmayacağını, kötü amaçlı kodlar yerleştirmeyeceğini ve bu kodların sistemler üzerinde yayılmasını sağlamak üzere çalışmayacağını kabul ve taahhüt eder.</p>
      </li>
      <li>
        <p style="margin-left: 10px;">Çalışan, Envanter’i ve diğer bilgi sistemleri kaynaklarını Türkiye Cumhuriyeti yasalarınca suç kabul edilen işlem, eylem ve uygulamalar için kullanmayacağını, (Envanter’i işbu Taahhütname’nin imza tarihinden önceki bir tarihte teslim almış olması halinde teslimden itibaren) yasadışı kullanımlarından doğan tüm hukuki, cezai ve idari sorumluğun yalnızca kendisine ait olduğunu, açılacak dava, icra takipleri ve resmi kurumlara yapılan şikayetlerde, masrafları kendisine ait olmak üzere, söz konusu hukuki takip ve şikayetlerin muhatabı olacağını ve Getir’i, Getir’in yönetim kurulu üyelerini, temsilcilerini ve çalışanlarını her türlü yargılama ve sorumluluktan ari kılacağını kabul ve beyan eder.</p>
      </li>
      <li>
        <p style="margin-left: 10px;">Çalışan, kendisine tahsis edilen Envanterin ve bunlar üzerinde kullanılan sistemlerin ve bilgi işlem altyapısının mülkiyetinin Getir’e ait olması nedeniyle gerçekleştireceği yasadışı işlemlerden ötürü Getir’in sorumlu tutulabileceğini anlamaktadır; bu nedenle Envanter’i ve diğer Getir kaynaklarını kullandığı sürece her türlü işlem ve bilgi akışının Getir tarafından denetim amacıyla izlenmesine, anlaşmazlık durumunda delil kabul edilmesine açık rıza verdiğini beyan, kabul ve taahhüt eder.</p>
      </li>
      <li>
        <p style="margin-left: 10px;">Çalışan, ilgili birimlerin bilgisi ve izni dışında Envanter’i tümüyle veya kısmen, üstü ve astı da dahil olmak üzere herhangi bir kişi ile değiştirmeyeceğini, devretmeyeceğini, Envanter’in iç aksamını yerinden çıkarmayacağını ve değiştirmeyeceğini, yeni bir parça eklemeyeceğini; ilgili birimden izinsiz hiçbir yazılım kurmayacağını, işbu Taahhütname’de yazılı şartlara uymadığı takdirde oluşabilecek her türlü zarardan sorumlu olacağını ve meydana gelen zararı tazmin etmeyi kabul ve taahhüt eder.</p>
      </li>
      <li>
        <p style="margin-left: 10px;">Çalışan, Envanter ve birlikte teslim edilen diğer cihaz ve yardımcı ekipmanlarda garanti kapsamı dışında oluşabilecek her türlü hasar ve bunların çalınması/kaybolmasından kaynaklanan zararı tazmin edeceğini ve Envanter’i Getir ile arasındaki iş akdinin son bulması halinde eksiksiz ve çalışır durumda ilgili birime teslim edeceğini kabul ve taahhüt eder.</p>
      </li>
    </ol>
  </div>
  <div style="page-break-after: always;"></div>
  <div style="width: 100%; text-align: center;">
    <p><b>EK-1: Envanter Listesi</b></p>
    <br>
  </div>
  <div>
    <table>
      <thead>
        <tr>
          <th colspan="3" style="text-align: left;">
            <p>Çalışan</p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><p><b>İsim Soyisim</b></p></td>
          <td><p><b>:</b></p></td>
          <td id="employeeName">${get(employee, 'fullName', '')}</td>
        </tr>
        <tr>
          <td><p><b>Departman/Görev</b></p></td>
          <td><p><b>:</b></p></td>
          <td id="employeeDepartment">${get(employee, 'department', '')}/${get(employee, 'jobTitle', '')}</td>
        </tr>
        <tr>
          <td><p><b>T.C. Kimlik No</b></p></td>
          <td><p><b>:</b></p></td>
          <td id="employeeTCKN">${get(employee, 'uniqueIdentifier', '')}</td>
        </tr>
        <tr>
          <td><p><b>Tarih</b></p></td>
          <td><p><b>:</b></p></td>
          <td id="printDate">___________________________</td>
        </tr>
        <tr>
          <td><p><b>İmza</b></p></td>
          <td><p><b>:</b></p></td>
          <td>___________________________</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div style="page-break-after: always;"></div>
  <div>
    <table style="border: 1px solid; border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th style="text-align: left; border: 1px solid;">No</th>
          <th style="text-align: left; border: 1px solid;">Tür</th>
          <th style="text-align: left; border: 1px solid;">Envanter</th>
          <th style="text-align: left; border: 1px solid;">Seri no</th>
          <th style="text-align: left; border: 1px solid;">Çalışanın Teslim Aldığı Tarih</th>
          <th style="text-align: left; border: 1px solid;">Çalışanın Teslim Ettiği Tarih</th>
        </tr>
      </thead>
      <tbody id="assetRows">
      ${assetList.map((asset, idx) => (`<tr>
            <td style="text-align: left; border: 1px solid"><b>${idx + 1}</b></td>
            <td style="text-align: left; border: 1px solid">${asset.type}</td>
            <td style="text-align: left; border: 1px solid">${asset.name}</td>
            <td style="text-align: left; border: 1px solid">${asset.deviceSerialNumber}</td>
            <td style="text-align: left; border: 1px solid">${asset.assignDate}</td>
            <td style="text-align: left; border: 1px solid">${asset.returnDate}</td>
        </tr>`)).join('')}
      </tbody>
    </table>
  </div>
</body>
</html>
`;

const getAssetCommitmentDocumentForDE = ({ assetList, employee }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
  <div style="width: 100%; text-align: center;">
    <p><b>TERMS OF INVENTORY USE</b></p>
    <br>
  </div>
  <div style="width: 100%; text-align: justify;">
    <p>
      These Terms of Inventory Use <b>(“Terms”)</b> are signed between the employee of Getir
      Germany GmbH <b>(“Getir”)</b>, registered address at Prenzlauer Allee 242-247, 10405, Berlin, Germany,
      whose identity information is provided below <b>("${get(employee, 'fullName', '')}")</b>,
      for confirming the terms of use of the inventory of which the details,
      such as SIM Card, cell phone and laptop delivered to the employee on the recruitment date are specified in the annex <b>(the "Inventory")</b>.
    </p>
    <ol>
      <li>
        <p style="margin-left: 10px;">
          Getir has allocated the Inventory for the use of the Employee, and the Employee has received this Inventory in full and working condition.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          The Employee confirms that he/she has used and will use the Inventory allocated and delivered to him/her, in accordance with applicable data privacy policies and the Terms and will use the Inventory solely for the performance of his/her duties at Getir. Private use of the Inventory is not permitted.
        </p>
      </li>
      <li>
      <p style="margin-left: 10px;">
        The Employee acknowledges that the password and similar identity verification tools defined to him/her, in order to access Getir’s resources, are specifically assigned to the Employee, and that he/she has been informed of such by Getir. The Employee accepts and undertakes that he/she will not share this information or the Inventory with third parties and commits that if he/she loses the Inventory or information and if this information becomes publicly accessible, he/she will notify his/her line manager or the relevant department in due course.
      </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          The Employee accepts and undertakes that he/she shall not use the Inventory and other information system resources (email systems, application systems, data storage systems, etc.) that have been allocated and delivered to him/her in a way that could cause damage to Getir, and will not place malicious codes and/or work to spread these codes over the systems.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          The Employee accepts and declares that he/she will not use the Inventory and other information systems resources for any transaction, action or practice (from the date of delivery, if the Inventory is received on a date before the signature date of this Commitment) that are considered criminal by the laws of the Republic of Germany and that he/she shall be solely liable for any and all legal, criminal and administrative liabilities that may arise from their illegal use, that he/she shall be the addressee of and bear the costs arising from any legal proceedings, execution proceedings and complaints to be made to official authorities, and he/she will hold Getir, Getir's board members, representatives and employees harmless from all kinds of judgment and liability.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          The Employee agrees and undertakes that he/she shall not replace or exchange the Inventory with any person, including his/her superior or subordinate, in whole or in part, without the knowledge and permission of his/her line manager, shall not dismantle or replace the internal parts of the Inventory, nor add a new part and that he/she will not install any software without permission from the relevant unit.
        </p>
      </li>
    </ol>
  </div>
  <div style="page-break-after: always;"></div>
  <div>
    <p><b>Employee</b></p>
    <p><b>Name/Surname: </b>${get(employee, 'fullName', '')}</p>
    <p><b>Department/Duty: </b>${get(employee, 'department', '')}/${get(employee, 'jobTitle', '')}</p>
    <p><b>Date: </b>___________________________</p>
    <p><b>Signature: </b>___________________________</p>
  </div>
  <div style="page-break-after: always;"></div>
  <div>
    <div style="width: 100%; text-align: center;">
      <p><b>ANNEX-1: INVENTORY LIST</b></p><br>
    </div>
    <table style="border: 1px solid; border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th style="text-align: left; border: 1px solid;">No</th>
          <th style="text-align: left; border: 1px solid;">Type</th>
          <th style="text-align: left; border: 1px solid;">Brand</th>
          <th style="text-align: left; border: 1px solid;">Model</th>
          <th style="text-align: left; border: 1px solid;">Device Serial Number/Line Number/IME Number</th>
        </tr>
      </thead>
      <tbody id="assetRows">
      ${assetList.map((asset, idx) => (`<tr>
            <td style="text-align: left; border: 1px solid"><b>${idx + 1}</b></td>
            <td style="text-align: left; border: 1px solid">${asset.type}</td>
            <td style="text-align: left; border: 1px solid">${asset.brand}</td>
            <td style="text-align: left; border: 1px solid">${asset.model}</td>
            <td style="text-align: left; border: 1px solid">${asset.deviceSerialNumber}</td>
        </tr>`)).join('')}
      </tbody>
    </table>
  </div>
</body>
</html>
`;

const getAssetCommitmentDocumentForFR = ({ assetList, employee }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
  <div style="width: 100%; text-align: center;">
    <p><b>TERMS OF INVENTORY USE</b></p>
    <br>
  </div>
  <div style="width: 100%; text-align: justify;">
    <p>
      These Terms of Inventory Use <b>(“Terms”)</b> are signed between the employee Getir France S.A.S. <b>(“Getir”)</b>, registered address at 7 rue de Madrid 75008 Paris, France whose identity information is provided below <b>(${employee.fullName})</b>, for confirming the terms of use of the inventory of which the details, such as GSM line, mobile phone, computer delivered to the employee on the recruitment date are specified in the annex <b>(the "Inventory")</b>.
    </p>
    <ol>
      <li>
        <p style="margin-left: 10px;">
          Getir has allocated the Inventory for the use of the Employee, and the Employee has received this Inventory in full and working condition.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          The Employee confirms that he/she has used and will use the Inventory allocated and delivered to him/her, in accordance with applicable data privacy policies and the Terms and will use the Inventory solely for the performance of his/her duties at Getir. Private use of the Inventory is not permitted.
        </p>
      </li>
      <li>
      <p style="margin-left: 10px;">
        The employee will always handle the Inventory with care. In case of damage to the Inventory, he/she will notify his/her line manager or the People Department in due course. The Employee accepts that he/she will compensate Getir for any damages caused intentionally or through “gross negligence” to the Inventory and other auxiliary devices and equipment of the Inventory, which are outside the scope of product warranty and the damages arising from their theft / loss caused by intent or “gross negligence” of the Employee, and that he/she will deliver the Inventory to the People Department in full and operational condition if the employment contract between Getir and the Employee is terminated, for whatever reason. In the case of damage or theft / loss caused by negligence of the Employee, the extent of liability shall be quoted based on the degree of fault. In the event of damage caused by unauthorized private use of the inventory, the employee shall in any case be solely and fully liable.
      </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          The Employee acknowledges that the password and similar identity verification tools defined to him/her, in order to access Getir’s resources, are specifically assigned to the Employee, and that he/she has been informed of such by Getir. The Employee accepts and undertakes that he/she will not share this information or the Inventory with third parties and commits that if he/she loses the Inventory or information and if this information becomes publicly accessible, he/she will notify his/her line manager or the People Department in due course.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          The Employee agrees and undertakes that he/she shall be liable for all kinds of damages that may arise
          <ul>
            <li>from unauthorized sharing this information or the Inventory with third parties,</li>
            <li>for failure to notify his/her line manager or the People Department in cases where the information or the Inventory has been compromised by others without his/her consent</li>
          </ul>
          He/she shall compensate Getir for all related damages, which may arise in this regard.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          The Employee accepts and undertakes that he/she shall not use the Inventory and other information system resources (e-mail systems, application systems, data storage systems, etc.) that have been allocated and delivered to him/her in a way that could cause damage to Getir, will not place malicious codes and will not work to spread these codes over the systems.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          The Employee accepts and declares that he/she will not use the Inventory and information system resources for any operation, action or practice against applicable laws, that he/she shall be solely liable for any and all legal, criminal and administrative liabilities that may arise from their illegal use, that he/she shall be the addressee of and bear the costs arising from any legal proceedings, execution proceedings and complaints to be made to official authorities, and he/she will hold Getir, Getir's board members, representatives and employees harmless from all kinds of judgment and liability.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          The Employee understands that Getir, as the owner of the Inventory assigned to him/her, the systems and the information processing infrastructure used on these systems, may be held liable for illegal transactions performed by him/her; for this reason, the Employee declares, accepts and undertakes that he/she is hereby granting explicit consent to the monitoring of all transactions and information flows by Getir on the Inventory and other resources for audit purposes for as long as he/she continues to use the Inventory and other Getir resources, and hereby agrees to the use of any such findings as evidence in case of dispute.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          The Employee agrees and undertakes that he/she shall not replace or exchange the Inventory with any person, including his/her superior or subordinate, in whole or in part, without the knowledge and permission of his/her line manager, shall not dismantle or replace the internal parts of the Inventory, nor add a new part; that he/she will not install any software without permission, and that he/she will be liable for any damage that may occur if he/she does not comply with the Terms.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          The Inventory must be returned no later than
          <ul>
            <li>upon termination of the activity for which the device was required;</li>
            <li>upon termination of the employment relationship;</li>
            <li>at any time upon Getir’s request.</li>
          </ul>
          The Employee has no right of retention regarding the return of the Inventory. The Inventory must be returned in proper condition.
        </p>
      </li>
    </ol>
  </div>
  <br /><br />
  <div>
    <p><b>Employee</b></p>
    <p><b>Name/Surname: </b>${get(employee, 'fullName', '')}</p>
    <p><b>Department/Duty: </b>${get(employee, 'department', '')}/${get(employee, 'jobTitle', '')}</p>
    <p><b>Date: </b>___________________________</p>
    <p><b>Signature: </b>___________________________</p>
  </div>
  <div style="page-break-after: always;"></div>
  <div>
    <div style="width: 100%; text-align: center;">
      <p><b>ANNEX-1: INVENTORY LIST</b></p><br>
    </div>
    <table style="border: 1px solid; border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th style="text-align: left; border: 1px solid;">No</th>
          <th style="text-align: left; border: 1px solid;">Type</th>
          <th style="text-align: left; border: 1px solid;">Brand</th>
          <th style="text-align: left; border: 1px solid;">Model</th>
          <th style="text-align: left; border: 1px solid;">Device Serial Number/Line Number/IME Number</th>
        </tr>
      </thead>
      <tbody id="assetRows">
      ${assetList.map((asset, idx) => (`<tr>
            <td style="text-align: left; border: 1px solid"><b>${idx + 1}</b></td>
            <td style="text-align: left; border: 1px solid">${asset.type}</td>
            <td style="text-align: left; border: 1px solid">${asset.brand}</td>
            <td style="text-align: left; border: 1px solid">${asset.model}</td>
            <td style="text-align: left; border: 1px solid">${asset.deviceSerialNumber}</td>
        </tr>`)).join('')}
      </tbody>
    </table>
  </div>
</body>
</html>
`;

const getAssetCommitmentDocumentForNL = ({ assetList, employee }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
  <div style="width: 100%; text-align: center;">
    <p><b>TERMS OF INVENTORY USE</b></p>
    <br>
  </div>
  <div style="width: 100%; text-align: justify;">
    <p>
    These Terms of Inventory Use <b>(“Terms”)</b> are signed between the employee of Getir Netherlands B.V. <b>(“Getir”)</b>, registered address at Keizersgracht 572, 1017EM Amsterdam, the Netherlands, whose identity information is provided below <b>("${get(employee, 'fullName', '')}")</b>, for confirming the terms of use of the inventory of which the details, such as SIM Card, cell phone and laptop delivered to the employee on or after the recruitment date are specified in the annex <b>(the “Inventory”)</b>.
    </p>
    <ol>
      <li>
        <p style="margin-left: 10px;">
        Getir has allocated the Inventory for the use of the Employee for the performance of his/her duties at Getir, and the Employee has received this Inventory in full and working condition.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
        he Employee confirms that he/she has used and/or will use the Inventory allocated and delivered to him/her, in accordance with the applicable data privacy policies and the Terms.
        </p>
      </li>
      <li>
      <p style="margin-left: 10px;">
      The Employee acknowledges that the password and similar identity verification tools defined to him/her, in order to access Getir’s resources, are specifically assigned to the Employee, and that he/she has been informed of such by Getir. The Employee accepts and undertakes that he/she will not share this information, the Inventory or any password(s) created by the Employee him/herself with third parties and commits that if he/she loses the Inventory or information and if this information becomes publicly accessible, he/she will notify his/her line manager or the relevant department in due course.
      </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
        The Employee accepts and undertakes that he/she shall always use the Inventory with due care and not use the Inventory and other information system resources (email systems, application systems, data storage systems, etc.) that have been allocated and delivered to him/her in a way that could cause damage to Getir, and will not place malicious codes and/or work to spread these codes over the systems.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
        The Employee agrees and undertakes that he/she shall not replace or exchange the Inventory with any person, including his/her superior or subordinate, in whole or in part, without the knowledge and permission of his/her line manager, shall not dismantle or replace the internal parts of the Inventory, nor add a new part.
        </p>
      </li>
    </ol>
  </div>
  <br/><br/>
  <div>
    <p><b>Employee</b></p>
    <p><b>Name/Surname: </b>${get(employee, 'fullName', '')}</p>
    <p><b>Department/Duty: </b>${get(employee, 'department', '')}/${get(employee, 'jobTitle', '')}</p>
    <p><b>Date: </b>___________________________</p>
    <p><b>Signature: </b>___________________________</p>
  </div>
  <div style="page-break-after: always;"></div>
  <div>
    <div style="width: 100%; text-align: center;">
      <p><b>ANNEX-1: INVENTORY LIST</b></p><br>
    </div>
    <table style="border: 1px solid; border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th style="text-align: left; border: 1px solid;">No</th>
          <th style="text-align: left; border: 1px solid;">Type</th>
          <th style="text-align: left; border: 1px solid;">Brand</th>
          <th style="text-align: left; border: 1px solid;">Model</th>
          <th style="text-align: left; border: 1px solid;">Device Serial Number/Line Number/IME Number</th>
        </tr>
      </thead>
      <tbody id="assetRows">
      ${assetList.map((asset, idx) => (`<tr>
            <td style="text-align: left; border: 1px solid"><b>${idx + 1}</b></td>
            <td style="text-align: left; border: 1px solid">${asset.type}</td>
            <td style="text-align: left; border: 1px solid">${asset.brand}</td>
            <td style="text-align: left; border: 1px solid">${asset.model}</td>
            <td style="text-align: left; border: 1px solid">${asset.deviceSerialNumber}</td>
        </tr>`)).join('')}
      </tbody>
    </table>
  </div>
</body>
</html>
`;

const getAssetCommitmentDocumentForIN = ({ assetList, employee }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
  <div style="width: 100%; text-align: left;">
    <p><b>Laptop Handover Letter</b></p>
    <br>
  </div>
  <div style="width: 100%; text-align: justify;">
    <p><b>Prepared for: ${get(employee, 'fullName', '')}</b></p>
    <p>As per your request the Laptop and accessories(if any) have been handed over to you on </p>
    <br/><br/>
    <p>
    As part of the terms of your employment at Getir India Technology Pvt Ltd. Please do check and acknowledge the following terms and conditions:
    </p>
    <ol>
      <li>
        <p style="margin-left: 10px;">
        I (the Receiver) will be solely responsible for the security of the Laptop and accessories if any. Both laptop and accessories will remain the property of Getir India Technology Pvt Ltd <b>(“Company”)</b> at all times. The physical security of Company provided assets is the employee’s personal responsibility.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
        At the end of my employment with the Company, I will return the laptop and all the accessories within 5 days of resignation or termination unless otherwise stated. I agree to save the packaging and return the laptop and the accessories along with the packaging at the time of exit form the company..
        </p>
      </li>
      <li>
      <p style="margin-left: 10px;">
      The laptop shall be used for authorized work use only, and the Company will not tolerate inappropriate materials such as pornographic, racist, defamatory or harassing files, pictures, videos or email messages that might cause offence or embarrassment to either the Company, its employees or any third party.
      </p>
      </li>
    </ol>
  </div>
  <br/><br/>
  <div>
    <p><b>${get(employee, 'fullName', '')}</b></p>
  </div>
  <div style="page-break-after: always;"></div>
  <div>
    <div style="width: 100%; text-align: center;">
      <p><b>ANNEX-1: INVENTORY LIST</b></p><br>
    </div>
    <table style="border: 1px solid; border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th style="text-align: left; border: 1px solid;">No</th>
          <th style="text-align: left; border: 1px solid;">Type</th>
          <th style="text-align: left; border: 1px solid;">Brand</th>
          <th style="text-align: left; border: 1px solid;">Model</th>
          <th style="text-align: left; border: 1px solid;">Device Serial Number/Line Number/IME Number</th>
        </tr>
      </thead>
      <tbody id="assetRows">
      ${assetList.map((asset, idx) => (`<tr>
            <td style="text-align: left; border: 1px solid"><b>${idx + 1}</b></td>
            <td style="text-align: left; border: 1px solid">${asset.type}</td>
            <td style="text-align: left; border: 1px solid">${asset.brand}</td>
            <td style="text-align: left; border: 1px solid">${asset.model}</td>
            <td style="text-align: left; border: 1px solid">${asset.deviceSerialNumber}</td>
        </tr>`)).join('')}
      </tbody>
    </table>
  </div>
</body>
</html>
`;

const getAssetCommitmentDocumentForGB = ({ assetList, employee }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
  <div style="width: 100%; text-align: center;">
    <p><b>CUSTODIAN LETTER AND TERMS OF INVENTORY USE
    </b></p>
    <br>
  </div>
  <div style="width: 100%; text-align: justify;">
    <p>
    This Custodian Letter and Terms of Inventory Use <b>(the “Undertaking”)</b> is signed between Getir UK Limited  <b>(“Getir”)</b>, registered address at WeWork 10 York Road, London, United Kingdom SE1 7ND, and the employee of Getir whose identity information is provided below <b>(${get(employee, 'fullName', '')})</b>, to confirm the terms of use of the inventory, such as the  mobile phone, laptop/PC or other hardware or assets (details of which are specified in the annex to this  Undertaking) <b>(the "Inventory")</b>.
    </p>
    <ol>
      <li>
        <p style="margin-left: 10px;">
        Getir has allocated the Inventory for use by the Employee, and the Employee has received this Inventory in  full and working condition.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
        The Employee confirms that he/she has used the Inventory allocated and delivered to him/her, in  accordance with all data security policies during the period prior to the signing of this Undertaking. The  Employee hereby accepts and undertakes that he or she shall use the Inventory in accordance with the  terms of this Undertaking, and use the Inventory solely for the performance of his/her duties at Getir,  following the date of this Undertaking.
        </p>
      </li>
      <li>
      <p style="margin-left: 10px;">
      The Employee acknowledges that the password and similar identity verification tools defined to him/her, in  order to access Getir’s resources, are privately assigned to the person, and that he/she has been informed  of such by Getir. The Employee accepts and undertakes that he/she will not share this information or the  Inventory with third parties and agrees that if he/she loses the Inventory or information and if this  information becomes publicly accessible, he/she will notify the relevant department in due course. The  Employee agrees and undertakes that he/she shall be liable for all damage that may arise from sharing this  information or the Inventory with third parties, for losing the Inventory or for failure to notify the relevant  department in cases where the information or the Inventory has been compromised by others without his/ her consent; and he/she shall compensate Getir for all related damages which may arise in this regard.
      </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
        The Employee accepts and undertakes that he/she shall not use the Inventory and other information system  resources (e-mail systems, application systems, data storage systems, etc.) that have been allocated and  delivered to him/her in a way that causes damage to Getir, and will not place malicious codes and/or work  to spread these codes in any way.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
        The Employee accepts and declares that he/she will not use the Inventory and information system  resources for any operation, action or practice that is contrary to the laws of England and Wales, (in cases  where the Inventory has been delivered to the Employee prior to signing this Undertaking, commencing  from the date of receipt), and that he/she shall be solely liable for any and all legal, criminal and  administrative liabilities that may arise from their illegal use, that he/she shall be the addressee of and bear  the costs arising from any legal proceedings, execution proceedings and complaints to be made to official  authorities, and he/she will hold Getir, Getir's board members, representatives and employees harmless  from all kinds of judgment and legal liability.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
        The Employee understands that Getir, as the owner of the Inventory, systems and system processing  infrastructure used on these systems assigned to the Employee, may be held liable for illegal transactions  performed by the Employee; for this reason, the Employee declares, accepts and undertakes that he/she is  hereby granting explicit consent to the monitoring of all transactions and information flows by Getir on the  Inventory and other resources for audit purposes for as long as the Employee continues to use the  Inventory and other Getir resources, and hereby agrees to the use of any such findings as evidence in case  of dispute.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
        The Employee agrees and undertakes that he/she shall not replace or exchange the Inventory with any  person, including his/her superior or subordinate, in whole or in part, without the knowledge and  permission of the relevant department, shall not dismantle or replace the internal parts of the Inventory,  nor add a new part; that he/she will not install any software without permission from the relevant  department, and that he/she will be liable for any damage that may occur if he/she does not comply with  the terms written in this Undertaking, and will compensate the damage arising from the Employee’s failure  to comply with the terms provided in this Undertaking.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
        The Employee accepts that he/she will compensate Getir for any damage that may occur to the Inventory  and other devices and auxiliary equipment outside the scope of warranty and any damage arising from  their theft/loss, and that he/she will deliver the Inventory to the relevant department in full and operational  condition on expiry or termination of the employment contract between Getir and the Employee.
        </p>
      </li>
    </ol>
  </div>
  <div style="page-break-after: always;"></div>
  <p><b>By signing this form, I acknowledge that I have read, understood and agree to the above Terms and also confirm  that the information is correct and accurate to the best of my knowledge.
  </b></p>
  <br />
  <div>
    <p><b>Employee</b></p>
    <p><b>Full Name: </b>${get(employee, 'fullName', '')}</p>
    <p><b>Department: </b>${get(employee, 'department', '')}</p>
    <p><b>Date: </b>___________________________</p>
    <p><b>Signature: </b>___________________________</p>
  </div>
  <div style="page-break-after: always;"></div>
  <div>
    <div style="width: 100%; text-align: center;">
      <p><b>ANNEX-1: INVENTORY LIST</b></p><br>
    </div>
    <table style="border: 1px solid; border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th style="text-align: left; border: 1px solid;">No</th>
          <th style="text-align: left; border: 1px solid;">Type</th>
          <th style="text-align: left; border: 1px solid;">Brand</th>
          <th style="text-align: left; border: 1px solid;">Model</th>
          <th style="text-align: left; border: 1px solid;">Device Serial Number/Line Number/IME Number</th>
        </tr>
      </thead>
      <tbody id="assetRows">
      ${assetList.map((asset, idx) => (`<tr>
            <td style="text-align: left; border: 1px solid"><b>${idx + 1}</b></td>
            <td style="text-align: left; border: 1px solid">${asset.type}</td>
            <td style="text-align: left; border: 1px solid">${asset.brand}</td>
            <td style="text-align: left; border: 1px solid">${asset.model}</td>
            <td style="text-align: left; border: 1px solid">${asset.deviceSerialNumber}</td>
        </tr>`)).join('')}
      </tbody>
    </table>
  </div>
</body>
</html>
`;

const getAssetCommitmentDocumentForUS = ({ assetList, employee }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body{
      font-size: 1.2rem;
      line-height: 1.5rem;
    }
  </style>
</head>
<body style="font-size: 18px">
  <div style="width: 100%; text-align: center;">
    <div>
      <img src="${LogoForCommitmentDoc}" alt="logo" />
    </div>
  </div>
  <h2><b>Acceptable Use of Technology Agreement  </b></h2>
  <br>
  <div style="width: 100%; text-align: justify;">
    <p>
      Getir US authorizes employees to use electronic equipment and technology owned or otherwise provided by the company as necessary to fulfill the requirements of their position. The use of Getir electronic
      property and technology is a privilege permitted at the company's discretion and is subject to the
      conditions and restrictions set forth in applicable policies, and this Acceptable Use of Technology
      Agreement. Getir reserves the right to suspend access at any time, without notice, for any reason. Getir also reserves the right to request the return of all company property at any time, without notice, and for
      any reason.
    </p>
    <p>
      Getir expects all employees to use technology and equipment responsibly in order to avoid potential
      problems and liability. Getir may place reasonable restrictions on the sites, material, and/or information
      that employees may access through the system.
    </p>
    <p>
    Getir makes no guarantee that the functions or services provided by or through the company will be
    without defect. In addition, Getir is not responsible for financial obligations arising from unauthorized use of the system or electronic devices.
    </p>
    <p>
    Each employee who is authorized to use Getir technology and electronic devices shall sign this Use of
    Technology Agreement as an indication that he/she has read and understands the agreement.
    </p>
    <p>
      DEFINITIONS <br /><br />
      Getir electronic devices and technology include, but is not limited to, computers, the company’s computer network including servers and wireless computer networking technology (wi-fi), the Internet, email, USB drives, wireless access points (routers), tablet computers, telephones, cellular telephones, wearable
      technology, any wireless communication device including emergency radios, and/or future technological innovations, whether accessed on or off site or through Getir-owned or personally owned equipment or
      devices.
    </p>
    <div style="position: fixed; left:0;bottom:0;width:100%">
      <img style="width:100%" src="${FooterForCommitmentDoc}" alt="" />
    </div>
    <div style="page-break-after: always;"></div>
    <p>
      EMPLOYEE OBLIGATIONS AND RESPONSIBILITIES <br />
      Employees are expected to use the company electronic devices and technology safely, responsibly, and for work-related purposes. Any incidental personal use of company technology and electronic devices
      shall not interfere with Getir business and operations, the work and productivity of any other Getir
      employee, or the safety and security of Getir technology. Getir is not responsible for any loss or damage incurred by an employee as a result of his/her personal use of company technology.
    </p>
    <p>
      The employee in whose name company electronic devices are issued is responsible for proper use and
      care at all times. Employees shall not share their assigned electronic devices with others and employees shall not gain access to electronic devices belonging to others.
    </p>
    <p>
      Employees are prohibited from using Getir issued electronic devices or technology for improper purposes, including, but not limited to:
    </p>
    <ol>
      <li>
        <p style="margin-left: 10px;">
        Access, post, display, or otherwise use material that is discriminatory, defamatory, obscene,
        sexually explicit, harassing, intimidating, threatening, or disruptive.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          Disclose or in any way cause to be disclosed confidential or sensitive company information
          without the prior authorization from a supervisor.
        </p>
      </li>
      <li>
      <p style="margin-left: 10px;">
        Engage in personal commercial or other for-profit activities
      </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
        Engage in unlawful use of company technology for political lobbying.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
        Infringe on copyright, license, trademark, patent, or other intellectual property rights.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
        Intentionally disrupt or harm company technology or other operations (such as destroying
          company equipment, placing a virus on company computers, adding or removing a computer
          program without permission, changing settings on shared computers.)

        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
        Install unauthorized software or apps.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
        Engage in or promote unethical practices or violate any law or Getir policy, regulation, or
        company practice.
        </p>
      </li>
    </ol>
    <div style="position: fixed; left:0;bottom:0;width:100%">
      <img style="width:100%" src="${FooterForCommitmentDoc}" alt="" />
    </div>
  </div>
  <div style="page-break-after: always;"></div>
  <p>
    <p>PRIVACY</p>
    Since the use of Getir technology and electronic devices are intended for use in conducting company
    business, no employee should have any expectation of privacy in any use of company technology or
    electronic devices.
  </p>
  <p>
    Getir reserves the right to monitor and record all use of company technology and electronic devices
    including, but not limited to, access to the Internet or social media, communications sent or received from company technology, or other uses within the jurisdiction of the company. Such monitoring/recording may occur at any time without prior notice for any legal purposes including, but not limited to, record retention
    and distribution and/or investigation of improper, illegal, or prohibited activity. Employees should be aware that, in most instances, their use of Getir technology (such as web searches or emails) cannot be erased or deleted.
  </p>
  <p>All passwords created for and used on any Getir technology and electronic devices are the sole property of the company. The creation or use of a password by an employee on company technology or electronic devices does not create a reasonable expectation of privacy.
  </p>
  <p>No employee may knowingly disable any network software or system identified as a monitoring tool.
  </p>
  <p>PERSONALLY OWNED DEVICES
  </p>
  <p>If an employee uses a personally owned device to access Getir technology or conduct company
  business, he/she shall abide by all applicable company policies, regulations, and this Use of Technology Agreement.
  </p>
  <p>CONSEQUENCES FOR VIOLATION </p>
  <p>Violations of the law, Getir policy, or this Use of Technology Agreement may result in revocation of an
  employee’s access to company technology and/or disciplinary action, up to and including termination. In addition, violations of this law, Getir policy, or this agreement may be reported to law enforcement
  agencies as appropriate.
  </p>
  <div style="position: fixed; left:0;bottom:0;width:100%">
    <img style="width:100%" src="${FooterForCommitmentDoc}" alt="" />
  </div>
  <div style="page-break-after: always;"></div>
  <p>
    Any employee who is found to have neglected or misused Getir property will be subject to disciplinary
    action up to and including termination. If an employee’s misuse of Getir property damages the property,
    Getir reserves the right to require the employee to pay all or part of the cost to repair or replace the
    property. Misappropriation of Getir property is grounds for immediate termination and possible criminal
    action.
  </p>
  <p>EMPLOYEE ACKNOWLEDGEMENT </p>
  <p>
    I acknowledge that while I am working for Getir, I will take proper care of all electronic devices and
    technology that I am entrusted with. I further understand that upon termination, I will return all Getir
    property in proper working order. I understand I may be held financially responsible for lost or damaged
    property. I understand that failure to return equipment will be considered theft and may lead to criminal
    prosecution by Getir.
  </p>
  <p>
    I have received, read, understand, and agree to abide by this Use of Technology Agreement and other
    applicable laws, company policies and regulations governing the use of Getir electronic devices and
    technology. I understand that there is no expectation of privacy when using Getir owned electronic
    devices or technology. I further understand that any violation may result in revocation of user privileges,
    disciplinary action, and/or appropriate legal action.
  </p>
  <p>
    I hereby release Getir and its personnel from any and all claims and damages arising from my use of
    company devices and technology or from the failure of any device and/or technology protection measures employed by the company.
  </p>
  <div>
    <p><b>Employee </b></p>
    <p><b>Name/Surname: </b>${get(employee, 'fullName', '')}</p>
    <p><b>Department/Duty: </b>${get(employee, 'department', '')}/${get(employee, 'jobTitle', '')}</p>
    <p><b>Date: </b>___________________________</p>
    <p><b>Signature: </b>___________________________</p>
  </div>
  <div style="page-break-after: always;"></div>
  <div>
    <div style="width: 100%; text-align: center;">
      <p><b>ANNEX-1: INVENTORY LIST</b></p><br>
    </div>
    <table style="border: 1px solid; border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th style="text-align: left; border: 1px solid;">No</th>
          <th style="text-align: left; border: 1px solid;">Type</th>
          <th style="text-align: left; border: 1px solid;">Brand</th>
          <th style="text-align: left; border: 1px solid;">Model</th>
          <th style="text-align: left; border: 1px solid;">Device Serial Number/Line Number/IME Number</th>
        </tr>
      </thead>
      <tbody id="assetRows">
      ${assetList.map((asset, idx) => (`<tr>
            <td style="text-align: left; border: 1px solid"><b>${idx + 1}</b></td>
            <td style="text-align: left; border: 1px solid">${asset.type}</td>
            <td style="text-align: left; border: 1px solid">${asset.brand}</td>
            <td style="text-align: left; border: 1px solid">${asset.model}</td>
            <td style="text-align: left; border: 1px solid">${asset.deviceSerialNumber}</td>
        </tr>`)).join('')}
      </tbody>
    </table>
  </div>
</body>
</html>
`;

const getAssetCommitmentDocumentForIT = ({ assetList, employee }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body{
      font-size: 1.2rem;
      line-height: 1.5rem;
    }
  </style>
</head>
<body style="font-size: 18px">
  <div style="width: 100%; text-align: right;">
    <div>
      <img src="${LogoForCommitmentDoc}" alt="logo" />
    </div>
  </div>
  <p>
    GETIR ITALY S.R.L. Società a responsabilità limitata con socio unico, Capitale sociale: euro 21.520.000,00 ivi., Sede legale: Via Cino del Duca n. 5 – 20122 Milano, Sede operativa: WeWork Via Turati n. 4 – 20121 Milano, P.IVA, C.F. e numero di iscrizione al Registro Imprese di Milano, Monza, Brianza e Lodi: 11685670967 N. REA: MI-2619077
  </p>
  <h4><b>TERMINI E CONDIZIONI DI UTILIZZO DEI BENI AZIENDALI – CELLULARE AD USO AZIENDALE E SIM (C.D. “INVENTARIO”)</b></h4>
  <br>
  <div style="width: 100%; text-align: justify;">
    <p>
      Le presenti condizioni e termini di utilizzo (di seguito anche i <b>“Termini”</b>) sono sottoscritte dal dipendente <b>(${get(employee, 'fullName', '')})</b> di Getir Italy S.r.l. (di seguito anche <b>“Getir”</b>), con sede legale in via Cino del Duca n. 5, Milano, i cui dati identificativi sono forniti di seguito, per confermare le condizioni di utilizzo dell'Inventario.
    </p>
    <ol>
      <li>
        <p style="margin-left: 10px;">
          Getir ha assegnato l'Inventario, costituito dai beni meglio specificati nella Tabella A, per l'uso aziendale esclusivo del Dipendente ed il Dipendente ha ricevuto l’“Inventario” in condizioni complete e funzionanti.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          Il Dipendente conferma che ha utilizzato e utilizzerà “l’Inventario” assegnato e consegnatogli, di cui assume la custodia, con cura e diligenza, esclusivamente per lo svolgimento delle sue mansioni lavorative per la Getir Italy S.r.l. e nel rispetto della normativa vigente, assicurandosi che il dispositivo sia sempre carico ad inizio turno. Il Dipendente si impegna sia a non inserire codici di blocco e/o password sul telefono cellulare consegnato sia a non utilizzare lo stesso ad uso promiscuo.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          Il Dipendente riconosce che la password e gli analoghi strumenti di verifica dell'identità a lui/lei attribuiti, al fine di accedere alle risorse di Getir, sono specificamente assegnati al Dipendente, e che egli/ella ne è stato/a informato/a da Getir. <br />
          Il Dipendente accetta e si impegna a non condividere tali informazioni o l’'Inventario" con terze parti, assumendosi l’obbligo, sia in caso di smarrimento dello stesso sia nel caso in cui tali informazioni diventino di pubblico dominio o accessibili a terzi, ad informare il proprio manager di linea a tempo debito. Il Dipendente accetta di rispondere per tutti i tipi di danni che possano derivare dal mancato rispetto della condotta sopra descritta. <br />
          Il Dipendente si impegna a risarcire Getir per tutti i danni correlati che possano derivare a tale proposito.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          Il Dipendente accetta e si impegna a non utilizzare l'Inventario" e le altre risorse dei sistemi informativi (sistemi di posta elettronica, sistemi applicativi, sistemi di archiviazione dati, ecc.) che gli sono stati assegnati e consegnati in qualsiasi modo tale da poter causare qualsiasi tipo di danno all’Azienda. Il Dipendente né scaricherà o permetterà di scaricare malware, né lavorerà per diffondere gli stessi sui sistemi aziendali.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          Il Dipendente accetta e si impegna a non utilizzare le risorse dell'Inventario e dei sistemi informativi per alcuna operazione, azione o pratica contraria alle leggi vigenti, assumendosi la responsabilità legale, penale e amministrativa derivante dal loro utilizzo illegale. Il Dipendente accetta di dichiararsi destinatario e sostenitore delle spese derivanti da eventuali procedimenti legali, procedure esecutive e denunce presentate alle autorità ufficiali, mantenendo così indenne Getir, i suoi membri del consiglio di amministrazione, i suoi rappresentanti e dipendenti da ogni tipo di giudizio e responsabilità.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          Il Dipendente è consapevole che Getir, in quanto proprietario dell'"Inventario” a lui assegnato, dei sistemi e dell'infrastruttura informatica utilizzata sugli stessi, può essere ritenuta responsabile delle operazioni illegali da lui effettuate; per tale motivo, il Dipendente dichiara, accetta e si impegna a dare esplicito consenso al monitoraggio di tutte le transazioni e flussi di informazioni da parte di Getir a fini di audit - nel rispetto delle disposizioni di legge e di privacy - per tutto il tempo in cui continuerà a utilizzare l'Inventario" e le altre risorse fornite dall’Azienda. <br />
          Il Dipendente acconsente inoltre all'utilizzo da parte di Getir di tali risultanze come prova in caso di contestazione, nonché per fini disciplinari.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          Il Dipendente concorda e si impegna a non sostituire o scambiare l'“Inventario” con alcuna persona, compresi i propri responsabili o subordinati, in tutto o in parte, senza la conoscenza e l'autorizzazione scritta del proprio line manager. Il Dipendente si impegna inoltre sia a non sostituire o modificare parti dell’Inventario sia a non installare alcun software e/o applicazione di qualsiasi genere senza autorizzazione scritta dell’Azienda. <br />
          Il Dipendente si ritiene responsabile per qualsiasi danno verificatosi qualora non rispettati i Termini.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          Fermo restando il diritto di Getir di intraprendere provvedimenti disciplinari in caso di violazione da parte del Dipendente dei Termini, il Dipendente rimborserà Getir dei danni derivanti il mancato rispetto degli stessi.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          Il Dipendente accetta di risarcire Getir per eventuali danni causati all'“Inventario” nonché ad altri dispositivi/attrezzature ausiliarie, non sottoposti a garanzia per i danni derivanti dal loro furto/smarrimento, e di riconsegnare l'Inventario al proprio Manager in condizioni complete e operative qualora il contratto di lavoro tra Getir e il Dipendente venga risolto o sospeso, per qualsiasi motivo. Si specifica che il risarcimento avverrà attraverso l’addebito su cedolino dell’ammontare corrispondente al danno e\\o smarrimento dell’Inventario in questione.
        </p>
      </li>
    </ol>
    <p>
      Di seguito, la tabella indicante il valore di ogni singolo oggetto dell’Inventario
    </p>
  </div>
  <br />
  <h4>MODULO DI CONSEGNA BENI AZIENDALI </h4>
  <div>
    <p><b>Dipendente</b></p>
    <p><b>Nome cognome: </b>${get(employee, 'fullName', '')}</p>
    <p><b>Dipartimento / Ruolo: </b>${get(employee, 'department', '')}/${get(employee, 'jobTitle', '')}</p>
    <p><b>Data di nascita: </b>${get(employee, 'birthday', '')}</p>
    <p><b>Data: </b>___________________________</p>
    <p><b>Firma: </b>___________________________</p>
  </div>
  <div style="page-break-after: always;"></div>
  <div>
    <div style="width: 100%; text-align: center;">
      <p><b>ANNEX-1: INVENTORY LIST</b></p><br>
    </div>
    <table style="border: 1px solid; border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th style="text-align: left; border: 1px solid;">Num</th>
          <th style="text-align: left; border: 1px solid;">Tipo</th>
          <th style="text-align: left; border: 1px solid;">Marca</th>
          <th style="text-align: left; border: 1px solid;">Modello</th>
          <th style="text-align: left; border: 1px solid;">Numero di serie del dispositivo</th>
        </tr>
      </thead>
      <tbody id="assetRows">
      ${assetList.map((asset, idx) => (`<tr>
            <td style="text-align: left; border: 1px solid"><b>${idx + 1}</b></td>
            <td style="text-align: left; border: 1px solid">${asset.type}</td>
            <td style="text-align: left; border: 1px solid">${asset.brand}</td>
            <td style="text-align: left; border: 1px solid">${asset.model}</td>
            <td style="text-align: left; border: 1px solid">${asset.deviceSerialNumber}</td>
        </tr>`)).join('')}
      </tbody>
    </table>
  </div>
  <div>
    <p>
      <small>*Costo in caso di perdita, smarrimento o furto previa presentazione della relativa denuncia </small>
    </p>
    <p>
      <small>**Costo che Getir sostiene per il recesso anticipato della SIM, in caso di mancata restituzione al termine del rapporto di lavoro</small>
    </p>
    <p>
      Il\\La sottoscritto\\a dichiara inoltre, di prendere atto dei prezzi riportati nella “Tabella A” e che è diritto del datore di lavoro addebitare il relativo costo al dipendente in caso di smarrimento o deterioramento per incuria o negligenza.
    </p>
    <p>
      Il\\La sottoscritto\\a riconosce altresì l’obbligo di dover riconsegnare, al termine del rapporto di lavoro, l’intero inventario consegnato in dotazione e si dichiara altresì disponibile, in caso di mancata riconsegna di parte o di tutto l’inventario al termine del rapporto di lavoro, al risarcimento del danno, che verrà determinato sulla base della tabella sopra indicata, tramite addebito sulle competenze di fine rapporto.
    </p>
    <p>
      Il\\La sottoscritto\\a riconosce la propria responsabilità in ordine allo smarrimento/danneggiamento dell’attrezzatura aziendale fornita e si dichiara disponibile al risarcimento del danno che verrà determinato sulla base della tabella sopra indicata, tramite addebito sul proprio cedolino mensile nei limiti del 1/5 dell’importo netto maturato.
    </p>
    <div style="page-break-after: always;"></div>
    <p>Data</p>
    <p>___________________________</p>
    <p>Firma</p>
    <p>___________________________</p>
    <p>
      Il\\la sottoscritto\\a si dichiara altresì disponibile, in caso di mancata riconsegna di parte o di tutto l’inventario al termine del rapporto di lavoro, al risarcimento del danno, che verrà determinato sulla base della tabella sopra indicata, tramite addebito sulle competenze di fine rapporto.
    </p>
    <p>Data</p>
    <p>___________________________</p>
    <p>Firma</p>
    <p>___________________________</p>
  </div>
</body>
</html>
`;

const getAssetCommitmentDocumentForES = ({ assetList, employee }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
  <div style="width: 100%; text-align: center;">
    <p><b>TERMS OF INVENTORY USE</b></p>
    <br>
  </div>
  <div style="width: 100%; text-align: justify;">
    <p>
    These Terms of Inventory Use <b>(“Terms”)</b> are signed between the employee of Getir Spain S.L. <b>(“Getir”)</b>, registered address at Plaza del Gas 1, Edificio B, 08003 Barcelona whose identity information is provided below <b>("${employee.fullName}")</b>, for confirming the terms of use of the inventory of which the details, such as GSM line, mobile phone, computer delivered to the employee on the recruitment date are specified in the annex <b>(the "Inventory")</b>.
    </p>
    <ol>
      <li>
        <p style="margin-left: 10px;">
          Getir has allocated the Inventory for the use of the Employee, and the Employee has received this Inventory in full and working condition.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          The Employee confirms that he/she has used and will use the Inventory allocated and delivered to him/her, in accordance with applicable data privacy policies and the Terms and will use the Inventory solely for the performance of his/her duties at Getir.
        </p>
      </li>
      <li>
      <p style="margin-left: 10px;">
        The Employee acknowledges that the password and similar identity verification tools defined to him/her, in order to access Getir’s resources, are specifically assigned to the Employee, and that he/she has been informed of such by Getir. The Employee accepts and undertakes that he/she will not share this information or the Inventory with third parties and commits that if he/she loses the Inventory or information and if this information becomes publicly accessible, he/she will notify his/her line manager or the People Department in due course. The Employee agrees and undertakes that he/she shall be liable for all kinds of damages that may arise from sharing this information or the Inventory with third parties, for losing the Inventory or for failure to notify his/her line manager or the People Department in cases where the information or the Inventory has been compromised by others without his/her consent; and it shall compensate Getir for all related damages which may arise in this regard.
      </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          The Employee accepts and undertakes that he/she shall not use the Inventory and other information system resources (e-mail systems, application systems, data storage systems, etc.) that have been allocated and delivered to him/her in a way that could cause damage to Getir, will not place malicious codes and will not work to spread these codes over the systems.

        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          The Employee accepts and declares that he/she will not use the Inventory and information system resources for any operation, action or practice against applicable laws, that he/she shall be solely liable for any and all legal, criminal and administrative liabilities that may arise from their illegal use, that it shall be the addressee of and bear the costs arising from any legal proceedings, execution proceedings and complaints to be made to official authorities, and it will hold Getir, Getir's board members, representatives and employees harmless from all kinds of judgment and liability.

        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          The Employee understands that Getir, as the owner of the Inventory assigned to him/her, the systems and the information processing infrastructure used on these systems, may be held liable for illegal transactions performed by him/her; for this reason, the Employee declares, accepts and undertakes that he/she is hereby granting explicit consent to the monitoring of all transactions and information flows by Getir on the Inventory and other resources for audit purposes for as long as he/she continues to use the Inventory and other Getir resources, and hereby agrees to the use of any such findings as evidence in case of dispute.

        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          The Employee agrees and undertakes that it shall not replace or exchange the Inventory with any person, including his/her superior or subordinate, in whole or in part, without the knowledge and permission of his/her line manager, shall not dismantle or replace the internal parts of the Inventory, nor add a new part; that he/she will not install any software without permission, and that he/she will be liable for any damage that may occur if he/she does not comply with the Terms.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          The Employee will reimburse Getir for any damages arising from his/her failure to comply with the Terms.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          The Employee accepts that he/she will compensate Getir for any damages caused to the Inventory and other auxiliary devices and equipment of the Inventory, which are outside the scope of product warranty and the damages arising from their theft / loss, and that he/she will deliver the Inventory to the People Department in full and operational condition if the employment contract between Getir and the Employee is terminated, for whatever reason.
        </p>
      </li>
    </ol>
  </div>
  <div>
    <p><b>Employee</b></p>
    <p><b>Name/Surname: </b>${get(employee, 'fullName', '')}</p>
    <p><b>Department/Duty: </b>${get(employee, 'department', '')}/${get(employee, 'jobTitle', '')}</p>
    <p><b>National ID Number: </b>${get(employee, 'uniqueIdentifier', '')}</p>
    <p><b>Date: </b>___________________________</p>
    <p><b>Signature: </b>___________________________</p>
  </div>
  <div style="page-break-after: always;"></div>
  <div>
    <div style="width: 100%; text-align: center;">
      <p><b>ANNEX-1: INVENTORY LIST</b></p><br>
    </div>
    <table style="border: 1px solid; border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th style="text-align: left; border: 1px solid;">No</th>
          <th style="text-align: left; border: 1px solid;">Type</th>
          <th style="text-align: left; border: 1px solid;">Brand</th>
          <th style="text-align: left; border: 1px solid;">Model</th>
          <th style="text-align: left; border: 1px solid;">Device Serial Number/Line Number/IME Number</th>
        </tr>
      </thead>
      <tbody id="assetRows">
      ${assetList.map((asset, idx) => (`<tr>
            <td style="text-align: left; border: 1px solid"><b>${idx + 1}</b></td>
            <td style="text-align: left; border: 1px solid">${asset.type}</td>
            <td style="text-align: left; border: 1px solid">${asset.brand}</td>
            <td style="text-align: left; border: 1px solid">${asset.model}</td>
            <td style="text-align: left; border: 1px solid">${asset.deviceSerialNumber}</td>
        </tr>`)).join('')}
      </tbody>
    </table>
  </div>
</body>
</html>
`;

const getAssetCommitmentDocumentForPT = ({ assetList, employee }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
  <div style="width: 100%; text-align: center;">
    <p><b>TERMS OF INVENTORY USE</b></p>
    <br>
  </div>
  <div style="width: 100%; text-align: justify;">
    <p>
    These Terms of Inventory Use <b>(“Terms”)</b> are signed between the employee of GetirPT, Unipessoal LDA (“Getir”), registered address at Avenida da Liberdade, 249, 1.º, 1250-143 Lisboa whose identity information is provided below <b>("${employee.fullName}")</b>, for confirming the terms of use of the inventory of which the details, such as GSM line, mobile phone, computer delivered to the employee on the recruitment date are specified in the annex <b>(the "Inventory")</b>.
    </p>
    <ol>
      <li>
        <p style="margin-left: 10px;">
          Getir has allocated the Inventory for the use of the Employee, and the Employee has received this Inventory in full and working condition.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          The Employee confirms that he/she has used and will use the Inventory allocated and delivered to him/her, in accordance with applicable data privacy policies and the Terms and will use the Inventory solely for the performance of his/her duties at Getir.
        </p>
      </li>
      <li>
      <p style="margin-left: 10px;">
        The Employee acknowledges that the password and similar identity verification tools defined to him/her, in order to access Getir’s resources, are specifically assigned to the Employee, and that he/she has been informed of such by Getir. The Employee accepts and undertakes that he/she will not share this information or the Inventory with third parties and commits that if he/she loses the Inventory or information and if this information becomes publicly accessible, he/she will notify his/her line manager or the People Department in due course. The Employee agrees and undertakes that he/she shall be liable for all kinds of damages that may arise from sharing this information or the Inventory with third parties, for losing the Inventory or for failure to notify his/her line manager or the People Department in cases where the information or the Inventory has been compromised by others without his/her consent; and it shall compensate Getir for all related damages which may arise in this regard.
      </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          The Employee accepts and undertakes that he/she shall not use the Inventory and other information system resources (e-mail systems, application systems, data storage systems, etc.) that have been allocated and delivered to him/her in a way that could cause damage to Getir, will not place malicious codes and will not work to spread these codes over the systems.

        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          The Employee accepts and declares that he/she will not use the Inventory and information system resources for any operation, action or practice against applicable laws, that he/she shall be solely liable for any and all legal, criminal and administrative liabilities that may arise from their illegal use, that it shall be the addressee of and bear the costs arising from any legal proceedings, execution proceedings and complaints to be made to official authorities, and it will hold Getir, Getir's board members, representatives and employees harmless from all kinds of judgment and liability.

        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          The Employee understands that Getir, as the owner of the Inventory assigned to him/her, the systems and the information processing infrastructure used on these systems, may be held liable for illegal transactions performed by him/her; for this reason, the Employee declares, accepts and undertakes that he/she is hereby granting explicit consent to the monitoring of all transactions and information flows by Getir on the Inventory and other resources for audit purposes for as long as he/she continues to use the Inventory and other Getir resources, and hereby agrees to the use of any such findings as evidence in case of dispute.

        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          The Employee agrees and undertakes that it shall not replace or exchange the Inventory with any person, including his/her superior or subordinate, in whole or in part, without the knowledge and permission of his/her line manager, shall not dismantle or replace the internal parts of the Inventory, nor add a new part; that he/she will not install any software without permission, and that he/she will be liable for any damage that may occur if he/she does not comply with the Terms.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          The Employee will reimburse Getir for any damages arising from his/her failure to comply with the Terms.
        </p>
      </li>
      <li>
        <p style="margin-left: 10px;">
          The Employee accepts that he/she will compensate Getir for any damages caused to the Inventory and other auxiliary devices and equipment of the Inventory, which are outside the scope of product warranty and the damages arising from their theft / loss, and that he/she will deliver the Inventory to the People Department in full and operational condition if the employment contract between Getir and the Employee is terminated, for whatever reason.
        </p>
      </li>
    </ol>
  </div>
  <div>
    <p><b>Employee</b></p>
    <p><b>Name/Surname: </b>${get(employee, 'fullName', '')}</p>
    <p><b>Department/Duty: </b>${get(employee, 'department', '')}/${get(employee, 'jobTitle', '')}</p>
    <p><b>National ID Number: </b>${get(employee, 'uniqueIdentifier', '')}</p>
    <p><b>Date: </b>___________________________</p>
    <p><b>Signature: </b>___________________________</p>
  </div>
  <div style="page-break-after: always;"></div>
  <div>
    <div style="width: 100%; text-align: center;">
      <p><b>ANNEX-1: INVENTORY LIST</b></p><br>
    </div>
    <table style="border: 1px solid; border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th style="text-align: left; border: 1px solid;">No</th>
          <th style="text-align: left; border: 1px solid;">Type</th>
          <th style="text-align: left; border: 1px solid;">Brand</th>
          <th style="text-align: left; border: 1px solid;">Model</th>
          <th style="text-align: left; border: 1px solid;">Device Serial Number/Line Number/IME Number</th>
        </tr>
      </thead>
      <tbody id="assetRows">
      ${assetList.map((asset, idx) => (`<tr>
            <td style="text-align: left; border: 1px solid"><b>${idx + 1}</b></td>
            <td style="text-align: left; border: 1px solid">${asset.type}</td>
            <td style="text-align: left; border: 1px solid">${asset.brand}</td>
            <td style="text-align: left; border: 1px solid">${asset.model}</td>
            <td style="text-align: left; border: 1px solid">${asset.deviceSerialNumber}</td>
        </tr>`)).join('')}
      </tbody>
    </table>
  </div>
</body>
</html>
`;

const getAssetReturnDocumentForNL = ({ assetList, employee }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
  <div style="width: 100%; text-align: justify; margin-top: 2rem">
    <p>
      I hereby confirm that I have returned the following Inventory in proper working condition.
    </p>
  </div>
  <div>
    <table style="border: 1px solid; border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th style="text-align: left; border: 1px solid;">No</th>
          <th style="text-align: left; border: 1px solid;">Type</th>
          <th style="text-align: left; border: 1px solid;">Brand</th>
          <th style="text-align: left; border: 1px solid;">Model</th>
          <th style="text-align: left; border: 1px solid;">Device Serial Number/Line Number/IME Number</th>
          <th style="text-align: left; border: 1px solid;">Return Date</th>
          <th style="text-align: left; border: 1px solid;">Device Return Condition</th>
        </tr>
      </thead>
      <tbody id="assetRows">
      ${assetList.map((asset, idx) => (`<tr>
            <td style="text-align: left; border: 1px solid"><b>${idx + 1}</b></td>
            <td style="text-align: left; border: 1px solid">${asset.type}</td>
            <td style="text-align: left; border: 1px solid">${asset.brand}</td>
            <td style="text-align: left; border: 1px solid">${asset.model}</td>
            <td style="text-align: left; border: 1px solid">${asset.deviceSerialNumber}</td>
            <td style="text-align: left; border: 1px solid">${asset.returnDate}</td>
            <td style="text-align: left; border: 1px solid">${asset.returnDeviceStatus}</td>
        </tr>`)).join('')}
      </tbody>
    </table>
  </div>
  <div>
    <p>I understand that failure to return equipment may lead to Getir taking legal action and that Getir reserves the right to pursue all legal remedies available to it to recover damages. </p>
    <br /><p><b>Employee Name: </b>${get(employee, 'fullName', '')}</p>
    <br /><p><b>Employee Signature: </b></p>
    <br /><p><b>Date: </b></p>
  </div>
</body>
</html>
`;

const getAssetReturnDocumentForTR = ({ assetList, employee }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
  <div style="width: 100%; text-align: justify; margin-top: 2rem">
    <p>
    Aşağıda belirtilen Envanteri düzgün çalışır durumda iade ettiğimi onaylıyorum.
    </p>
  </div>
  <div>
    <table style="border: 1px solid; border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th style="text-align: left; border: 1px solid;">No</th>
          <th style="text-align: left; border: 1px solid;">Tip</th>
          <th style="text-align: left; border: 1px solid;">Marka</th>
          <th style="text-align: left; border: 1px solid;">Model</th>
          <th style="text-align: left; border: 1px solid;">Cihaz seri numarası / hat numarası / IME numarası</th>
          <th style="text-align: left; border: 1px solid;">Teslim Alma Tarihi</th>
          <th style="text-align: left; border: 1px solid;">Zimmet Teslim Durumu</th>
        </tr>
      </thead>
      <tbody id="assetRows">
      ${assetList.map((asset, idx) => (`<tr>
            <td style="text-align: left; border: 1px solid"><b>${idx + 1}</b></td>
            <td style="text-align: left; border: 1px solid">${asset.type}</td>
            <td style="text-align: left; border: 1px solid">${asset.brand}</td>
            <td style="text-align: left; border: 1px solid">${asset.model}</td>
            <td style="text-align: left; border: 1px solid">${asset.deviceSerialNumber}</td>
            <td style="text-align: left; border: 1px solid">${asset.returnDate}</td>
            <td style="text-align: left; border: 1px solid">${asset.returnDeviceStatus}</td>
        </tr>`)).join('')}
      </tbody>
    </table>
  </div>
  <div>
    <p>
      Envanterin iade edilmediği halllerde, Getir’in her türlü hukuki işlemi başlatabileceğini ve zararlarını tazmin etmek için mevcut tüm yasal yollara başvurma hakkını saklı tuttuğunu anladığımı kabul ve taahhüt ederim.
    </p>
    <p>
      Teslim edilen Envanterde herhangi bir hasar tespit edilmesi halinde, ilgili hasar kapsamında Envanter'de oluşan zararın Getir'in tarafıma ödeyeceği ücret ve diğer tüm işçilik alacaklarımdan/haklarımdankesilebileceğini bildiğimi, kesinti yapılması durumunda herhangi bir itirazda bulunmayacağımı kabul ve taahhüt ederim.
    </p>
  </div>
  <div>
    <br /><p><b>Çalışan adı: </b>${get(employee, 'fullName', '')}</p>
    <br /><p><b>İmza: </b></p>
    <br /><p><b>Tarih: </b></p>
  </div>
</body>
</html>
`;

const getAssetReturnDocumentForGlobal = ({ assetList, employee }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
  <div style="width: 100%; text-align: justify; margin-top: 2rem">
    <p>
      I hereby confirm that I have returned the following Inventory in proper working condition.
    </p>
  </div>
  <div>
    <table style="border: 1px solid; border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th style="text-align: left; border: 1px solid;">No</th>
          <th style="text-align: left; border: 1px solid;">Type</th>
          <th style="text-align: left; border: 1px solid;">Brand</th>
          <th style="text-align: left; border: 1px solid;">Model</th>
          <th style="text-align: left; border: 1px solid;">Device Serial Number/Line Number/IME Number</th>
          <th style="text-align: left; border: 1px solid;">Return Date</th>
          <th style="text-align: left; border: 1px solid;">Device Return Condition</th>
        </tr>
      </thead>
      <tbody id="assetRows">
      ${assetList.map((asset, idx) => (`<tr>
            <td style="text-align: left; border: 1px solid"><b>${idx + 1}</b></td>
            <td style="text-align: left; border: 1px solid">${asset.type}</td>
            <td style="text-align: left; border: 1px solid">${asset.brand}</td>
            <td style="text-align: left; border: 1px solid">${asset.model}</td>
            <td style="text-align: left; border: 1px solid">${asset.deviceSerialNumber}</td>
            <td style="text-align: left; border: 1px solid">${asset.returnDate}</td>
            <td style="text-align: left; border: 1px solid">${asset.returnDeviceStatus}</td>
        </tr>`)).join('')}
      </tbody>
    </table>
  </div>
  <div>
    <p>
      I understand that failure to return equipment may result in legal action by the company. I understand that Getir reserves the right to seek all legal remedies available to it to recover damages.
    </p>
    <br /><p><b>Employee Name: </b>${get(employee, 'fullName', '')}</p>
    <br /><p><b>Employee Signature: </b></p>
    <br /><p><b>Date: </b></p>
  </div>
</body>
</html>
`;

const getAssetCommitmentDocumentByCountry = {
  tr: getAssetCommitmentDocumentForTR,
  de: getAssetCommitmentDocumentForDE,
  fr: getAssetCommitmentDocumentForFR,
  nl: getAssetCommitmentDocumentForNL,
  in: getAssetCommitmentDocumentForIN,
  gb: getAssetCommitmentDocumentForGB,
  us: getAssetCommitmentDocumentForUS,
  es: getAssetCommitmentDocumentForES,
  pt: getAssetCommitmentDocumentForPT,
  it: getAssetCommitmentDocumentForIT,
};
const getAssetReturnDocumentByCountry = {
  nl: getAssetReturnDocumentForNL,
  tr: getAssetReturnDocumentForTR,
  de: getAssetReturnDocumentForGlobal,
  fr: getAssetReturnDocumentForGlobal,
  in: getAssetReturnDocumentForGlobal,
  gb: getAssetReturnDocumentForGlobal,
  us: getAssetReturnDocumentForGlobal,
  es: getAssetReturnDocumentForGlobal,
  pt: getAssetReturnDocumentForGlobal,
  it: getAssetReturnDocumentForGlobal,
};

export const getAssetFormPrintHTML = ({ assetList, employee, metaData, payrollCountryCode }) => getAssetCommitmentDocumentByCountry[payrollCountryCode]({ assetList, employee, metaData }).replace(/\n/g, '');
export const getReturnAssetsFormPrintHTML = ({ assetList, employee, payrollCountryCode }) => getAssetReturnDocumentByCountry[payrollCountryCode]({ assetList, employee }).replace(/\n/g, '');
