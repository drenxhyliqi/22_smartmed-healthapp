# SmartMed Health App

## 👥 Anëtarët e Grupit

1. **Donart Ajvazi**
2. **Donart Spahiu**
3. **Dren Xhyliqi**
4. **Edison Ndou**

## 📱 Përshkrim i Projektit

SmartMed është një aplikacion mobil shëndetësor i zhvilluar me React Native dhe Expo, që synon të modernizojë dhe të lehtësojë ndërveprimin ndërmjet pacientëve dhe institucioneve shëndetësore. Aplikacioni përfaqëson një zgjidhje digjitale inovative që transformon mënyrën tradicionale të qasjes në shërbime mjekësore, duke i dhënë përdoruesve kontroll më të madh mbi shëndetin e tyre dhe duke i bërë shërbimet mjekësore më të arritshme dhe më të përshtatshme.

Aplikacioni synon të lehtësojë qasjen në shërbime mjekësore përmes një ndërfaqeje të qartë, funksionale dhe të përshtatshme për përdorues të çdo moshe. Me një dizajn modern dhe intuitiv, SmartMed ofron një përvojë përdoruesi të lëmuar që bën të lehtë navigimin dhe gjetjen e informacioneve të nevojshme shëndetësore. Aplikacioni është i dizajnuar me qëllim që të jetë i aksesueshëm për të gjithë, pavarësisht nga niveli i njohurive teknike.

Një nga karakteristikat më të rëndësishme të SmartMed është integrimi i tij me Firebase, i cili siguron ndërveprime në kohë reale me bazën e të dhënave. Kjo do të thotë që të gjitha informacionet - nga lista e doktorëve dhe spitaleve deri te katalogu i ilaçeve - përditësohen automatikisht dhe në kohë reale, duke siguruar që përdoruesit gjithmonë kanë qasje në informacionet më të fundit dhe më të sakta.

Aplikacioni përfshin autentifikim të sigurt përmes Firebase Authentication, duke siguruar që të dhënat e përdoruesve dhe informacionet personale të mbrohen me standarde të larta sigurie. Sistemet e autentifikimit lejojnë përdoruesit të krijojnë llogari të sigurta dhe të menaxhojnë profilin e tyre personal me besim të plotë.

Përveç kësaj, SmartMed ofron menaxhim të plotë të të dhënave të pacientëve dhe institucioneve shëndetësore. Përdoruesit mund të ndjekin statistika shëndetësore personale si heart rate, kalori dhe peshë, ndërsa aplikacioni ofron gjithashtu një panel administrativ për menaxhimin e përmbajtjes së aplikacionit nga ana e administratorëve.

Me funksionalitete të tilla si kujtesa për ilaçe, kërkim i avancuar, artikuj shëndetësore dhe qasje të shpejtë në shërbime të ndryshme mjekësore, SmartMed përfaqëson një platformë të plotë që adreson nevojat e shumta të përdoruesve në fushën e shëndetit dhe kujdesit mjekësor.

## ✨ Funksionalitetet Kryesore

### 🔐 Regjistrimi dhe Autentifikimi i Përdoruesve
- **Sign In / Sign Up** - Sistem autentifikimi me email dhe password
- **Firebase Authentication** - Integrim me Firebase për menaxhim të sigurt të përdoruesve
- **Logout** - Dalje e sigurt nga llogaria

### 🏥 Shfletimi i Shërbimeve dhe Spitaleve
- **Lista e Spitaleve** - Shfletim i plotë i spitaleve të disponueshme me informacione të detajuara
- **Informacione në Kohë Reale** - Përditësim automatik i të dhënave përmes Firebase Firestore
- **Imazhe dhe Lokacione** - Shfaqje e imazheve dhe lokacioneve të spitaleve

### 👨‍⚕️ Shfletimi i Doktorëve
- **Top Doctors** - Lista e doktorëve më të mirë me specialitete të ndryshme
- **Informacione të Detajuara** - Emër, pozicion dhe imazhe të doktorëve
- **Përditësim në Kohë Reale** - Të dhëna të freskëta nga Firebase

### 💊 Farmaci dhe Ilaçe
- **Katalog i Ilaçeve** - Shfletim i plotë i ilaçeve të disponueshme
- **Çmime dhe Sasi** - Informacione për çmime dhe sasi në stok
- **Sistem Kujtesash** - Vendosje kujtesash për marrjen e ilaçeve në kohë të caktuar

### 📊 Përditësimi në Kohë Reale i të Dhënave përmes Firebase
- **Sinkronizim Automatik** - Të dhënat përditësohen automatikisht pa nevojë për refresh
- **Firebase Firestore** - Ruajtje dhe menaxhim i të dhënave në kohë reale
- **Optimizim i Performancës** - Ngarkim efikas i të dhënave me skeleton loading

### 🧭 Navigim i Lehtë ndërmjet Ekranit Kryesor, Profileve, dhe Shërbimeve Shëndetësore
- **Homepage Dashboard** - Faqe kryesore me qasje të shpejtë në të gjitha shërbimet
- **Navigim me Tab Bar** - Navigim i lehtë ndërmjet seksioneve kryesore
- **Quick Access Icons** - Qasje e shpejtë në Top Doctors, Pharmacy dhe Hospitals
- **Profil i Përdoruesit** - Menaxhim i profilit me statistika shëndetësore

### 🔔 Notifications
- **Local Notifications** - Njoftime lokale për termime, kujtesa dhe përditësime
- **Kujtesa për Ilaçe** - Vendosje dhe menaxhim i kujtesave për marrjen e ilaçeve

### 📰 Artikuj Shëndetësore
- **Health Articles** - Artikuj dhe lajme shëndetësore me imazhe dhe data
- **Kërkim** - Kërkim i artikujve, doktorëve dhe ilaçeve

### 👤 Menaxhimi i Profilit
- **Statistika Shëndetësore** - Ndiqje e heart rate, kalorive dhe peshës
- **Dashboard Personal** - Shfaqje e të dhënave personale në një vend
- **Opsione Menaxhimi** - Qasje në termime, pagesa dhe FAQs

### ⚙️ Panel Administrativ
- **Management Panel** - Panel për administratorë për menaxhimin e doktorëve, ilaçeve dhe spitaleve
- **Kontrolle të Avancuara** - Menaxhim i plotë i përmbajtjes së aplikacionit

## 🛠️ Teknologjitë e Përdorura

1. **React Native** – Framework kryesor për zhvillim aplikacionesh mobile multiplatformë
2. **Expo** – Mjedis zhvillimi dhe shpërndarjeje për React Native
3. **Expo Router** – Menaxhim i rrugëve dhe strukturës së navigimit
4. **Firebase Firestore** - Ruajtja dhe menaxhimi i të dhënave në kohë reale

## 📦 Udhëzime Instalimi

### Kërkesat Para-Instalimit

Para se të filloni, sigurohuni që keni instaluar:
- **Node.js** (version 18 ose më i lartë)
- **npm** ose **yarn**
- **Expo CLI** (instalohet globalisht)
- **Expo Go** app në telefonin tuaj (për iOS/Android) ose emulator

### Hapat e Instalimit

1. **Klononi repositorin** (ose shkarkoni projektin):
   ```bash
   git clone https://github.com/drenxhyliqi/22_smartmed-healthapp.git
   cd 22_smartmed-healthapp
   ```

2. **Instaloni varësitë**:
   ```bash
   npm install
   ```
   
   Ose nëse përdorni yarn:
   ```bash
   yarn install
   ```

3. **Nisni aplikacionin**:
   ```bash
   npm start
   ```
   
   Ose:
   ```bash
   expo start
   ```

4. **Zgjidhni platformën**:
   - Shtypni `a` për Android
   - Shtypni `i` për iOS
   - Shtypni `w` për Web
   - Ose skanoni QR kodin me Expo Go app në telefonin tuaj

### Komanda të Tjera

```bash
# Për Android
npm run android
# ose
expo start --android

# Për iOS
npm run ios
# ose
expo start --ios

# Për Web
npm run web
# ose
expo start --web
```
