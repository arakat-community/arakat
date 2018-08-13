# ARAKAT

## Hakkında
İş zekası uygulamaları temelinde eldeki verinin anlamlandırılarak bilgiye dönüştürülmesi faaliyetlerini içerir. Bu bağlamda iş zekası uygulamalarının temel bileşenleri veri işleme, veri analizi ve bilgi raporlama olarak belirlenebilir. ARAKAT'ın amacı, bu ana bileşenlerin her biri için temel teşkil edebilecek açık kaynak kodlu ve platform bağımsız alt yapılar geliştirilmesidir. Karar verme, öngörü analizi, gerçek zamanlı veri işleme, "mobile first" veri görselleştirme gibi konular projenin çekirdeğinde yer almaktadır.

ARAKAT kapsamında iş zekası ve büyük veri analizi uygulamalarına temel teşkil edebilecek açık kaynak kodlu bir platform geliştirilmesi hedeflenmiştir. Bu platform kullanılarak hem yapısal olmayan (ve büyük) verilerin üzerinde veri analiz işlemleri hem de yapısal verilerin üzerinde iş zekası uygulamaları geliştirilebilmesi ARAKAT'ın ana hedefidir. 

ARAKAT temelde üç ana modülden oluşmaktadır. Birinci modül farklı veri kaynaklarından farklı hızlarda alınan verilerin işlenebilir hale getirilmesi (temizleme, maskeleme, vb...) işlerinin kapsandığı "Veri İçerme" modülüdür. İkinci modül, içerilen verilerin üzerinde istatistiksel modellerin ve veri yapılarının kurulabildiği "Veri Analiz" modülüdür. Üçüncü ve son modül ise yapılan analiz sonuçlarının kullanıcı dostu sunumlar halinde görüntülenmesini sağlayan "Veri Görselleştirme" modülüdür.

## Anahtar Kelimler
Büyük Veri, Veri Analizi, İş Zekası, Açık Kaynak, Makine Öğrenmesi, Dağıtık Sistemler

## Proje Kurgusu ve Detaylar
Teknik özellikler ve proje kurgusu ile ilgileri aşağıdaki gibi özetlenebilir:
- Açık Kaynak Kodlu ve GPLv3 Lisanslı Geliştirme: Proje kurgusu tamamı ile açık kaynak üzerine kurgulanmıştır. Buradaki temel amaç geliştirimi devam eden ve/veya yeni geliştirilecek uygulamaların jenerik kısımları için açık kaynak camiasının desteğini almak ve bu desteği alırken de projelere özgü içeriği ayırarak farklı paydaşların bu ortak alt yapıları kullanabilmesine
olanak tanımaktır.
- Linux tabanlı ve platform bağımsız dağıtım: Projenin geliştirme ve derleme ortamları tamamen Linux tabanlı (Debian türevleri) sistemler olacaktır. Bununla birlikte proje çıktısı çerçevelerin sınandığı referans uygulama bileşenleri de Docker container'ları halinde yayınlanacaktır. Bu sayede ölçeklenebilir (buluta hazır) ve platform bağımsız yapıların geliştirildiği garanti altına alınmış olacaktır.
- Eğitsel içerik ve API dokümantasyonu: Geliştirilecek alt yapılara ilişkin API (Uygulama Programlama Arayüzü) dokümantasyonları Türkçe olarak sürekli entegrasyon sunucusundaki son adım olarak devamlı üretilecek ve dokümantasyonun güncel ve yeterli olduğu kullanıcı geri dönüşleri ile izlenecektir. Söz konusu içerikte Türkiye içinde bir ilk olacak bu materyal hem bu alana yeni giren bireyler/kurumlar için hem de bu alanda öğretim veren kurumlar için faydalanılabilir olacaktır.
- Geliştiricilere açık ortak bir platform: Bu sayede hem yeni bir ekosistem kurularak ulusal fayda sağlanması hedeflenmektedir.


