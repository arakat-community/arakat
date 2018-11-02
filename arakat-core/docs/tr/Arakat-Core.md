# Arakat-Core

## Amaç
Arakat-Core modülü, belirli bir arayüz çerçevesinde oluşturulmuş işlem akışlarını ifade eden çizgeleri girdi olarak alıp bunları gerçekleyecek kodlara/betiklere dönüştürmeyi amaçlamaktadır.


## İçerik
* Terimler/Alan Bilgisi
* Temel Akış
* Temel Yapı
* Temel Teknolojiler
* İleri Düzey Tasarım Detayları

## Terimler/Alan Bilgisi

**İşlem akışı (data pipeline)**

Veri analizi için mevcut probleme özel olarak tasarlanmış işlemler/operasyonlar bütünüdür.

İşlem akışları; verinin sisteme dahil edilmesi, üzerinde gerekli analitiklerin uygulanması, modeller eğitilmesi, eğitilmiş modellerin uygulanması, oluşan modellerin kaydedilmesi, işlenen verilerin kaydedilmesi gibi işlemleri üzerinde çalışılan probleme uygun olarak anlamlı bir bütün/sıra halinde ifade edilmesi için kullanılırlar.

İşlem akışlarını ifade etmek için **çizge (graph)** kullanılmaktadır.

**Nod (node)** 

Her nod, işlem akışını oluşturan işlemlerin gerçeklenmesi için gerekli temel işlere tekabül eder.
İşlem akışlarını oluşturan temel elemanlardandır.

**Bağlantı (edge)** 

Bağlantı, nodları birbirine bağlayan çizge öğeleridir. Kaynak nodun farklı türlerdeki çıktıların ve gerekli ek bilgilerin hedef noda girdi olarak aktarılmasına yarar.

**Parametre** 

Parametre, bir nodu gerçekleyecek kodların üretilmesi için kullanıcıdan alınması gereken bilgiyi ifade eder.

**Nod Özellikleri (Node Specs)** 

Nod özellikleri, bir nodu tümüyle ifade eden bilgiler bütünüdür. Bu bilgiler gerek kullanıcı arayüzünün noda özel kısımlarının oluşturulmasında (parametre giriş ekranı gibi) gerekse nodu gerçekleyen kodun oluşturulmasında kullanılır.

Nod özellikleri; nod türü, kategorisi, ailesi, akış uyumu, akış verisi uyumu, ihtiyaç duyduğu parametreleri ve bunların kıstasları gibi özellikleri kapsar.

***Nod Türü:***

Parametre özelliklerinde **node_id** olarak tutulmaktadır. İleride, ***node_type*** olarak değiştirilmesi planlanmaktadır. Nodun türünü ifade eder. Örneğin, *node_id: 21* *LinearSVC* nodunu ifade eder.

***Nod Adı:***

Parametre özelliklerinde **name** olarak tutulmaktadır. Nod türü nodu id bazında, nod adı ise string bazında ifade eder. Bu özellik, nodun kullanıcı arayüzünde konseptsel olarak ifade edilebilmesine olanak sağlar.

***Nod Kategorisi:***

Parametre özelliklerinde **category** olarak tutulmaktadır. Nodun ait olduğu kategoriyi ifade eder. Bu kategoriler, konseptsel olgulardır. Örneğin, *LinearSVC* nodunun kategorisi *11*'dir. Bu da, *Classification* kategorisine takabül eder.

Kategoriler, alt kategoriler içerebilirler. Örneğin, *Classification* *Algorithms* kategorisi; bu da *ML* kategorisi altında yer almaktadır.

***Nod Ailesi:***

Parametre özelliklerinde **family** olarak tutulmaktadır. Nodun ait olduğu aileyi ifade eder. Nod aileleri, aynı kod üretim şablonuna sahip nodların kod üretiminin ortaklanmasını amaçlanmaktadır. Bu şekilde, daha sade bir tasarıma olanak sağlanması hedeflenmektedir.

***is_splitter:***

Nodun, girdi olarak aldığı veriyi işlemesi ile birden fazla çıktı veri oluşturması durumunda, bu özellik *True* olarak atanmalıdır. Mevcut durumda tek splitter nod *RandomSplitter* nodudur. Bu özelliğe, mevcut durumda core kısım için ihtiyaç duyulmamaktadır. Yalnız, UI kısmının bu bilgiden faydalanabileceği öngörüldüğü için bu özellik var olmaya devam etmektedir. İlerleyen versiyonlarda, bu özellik kaldırılabilir.

***produces_model:***

Nodun, çıktı olarak model de üretmesi durumunda, bu özellik *True* olarak atanmalıdır. Bu özelliğe, mevcut durumda core kısım için ihtiyaç duyulmamaktadır. Yalnız, UI kısmının bu bilgiden faydalanabileceği öngörüldüğü için bu özellik var olmaya devam etmektedir. İlerleyen versiyonlarda, bu özellik kaldırılabilir.

***compatible_with_stream:***

Nodun, akış verisi üzerinde kullanılabilirliğini ifade eder.

***compatible_stream_output_modes:***

Nodun, akış verisi üzerinde hangi akış modunda kullanılabilir olduğunu listeler. Bu özellik, analitik teknolojisi olarak Apache Spark kullanıldığında anlam kazanmaktadır. Diğer olası teknolojiler için anlam ifade etmeyebilir.

***compatible_with_spark_pipeline:***

Nodun, Apache Spark pipeline'ı içerisinde kullanılıp kullanılamayacağını gösterir.

***Parametre Özellikleri (Parameter Props):***

Parametreler, farklı türlerde veri girilmesini gerektirebilirler. Bu gerekler ve girilen parametreler üzerinde uygulanacak işleme seçenekleri bir alana özel dil ile ifade edilir. Bu alana özel dilden hem kullanıcı arayüzü hem de kod üretimi gerçeklenirken yararlanılır. Bir nod için gerekli parametrelerin, mevcut alana özel dil ile ifade edildiği özelliktir. Parametre özelliklerinde **parameter_props** olarak tutulmaktadır.

## Temel Akış

Arakat-Core Temel Akış Şablonu

![Arakat-Core Basic Flow](/images/Arakat-Core_BasicFlow.png)

Arakat-Core modülünün kod üretim akışı backend tarafından gönderilen REST call'u (*interpret_graph*) ile başlar. Bu *POST* call'u *json* formatında bir *graph* gönderir ve cevap olarak üretilen kodları, başarılı yürütülmeyi gösteren *result_code*'u, error bilgisini ve ek bilgileri cevap olarak kabul eder. Ek bilgiler, kod üretimi sırasında tutulması gerekli görülen bilgilerdir. Mevcut versiyonda, kod üretimi sırasında yazma işlemi yapan nodlar olduğu durumda, verinin hangi veri kaynağına yazıldığı, bu veri kaynağına erişim için gerekli bilgiler (ip, port vb.), varsa verinin hangi *path*'e kaydedildiği gibi bilgiler tutulmaktadır.

*PipelineGenerator*, *CoreService* üzerinden alınan *graph*'ı önce *parse* eder. Bu işlem, graph içerisinde yer alan *task*'ların içerdikleri nod ve bağlantılar ile birlikte birbirinden ayrılmasını amaçlar. Bu sayede, her bir task birbirinden bağımsız olarak işlenebilecek ve bunlara tekabül edecek kodlar/betikler birbirinden bağımsız olarak oluşturulabilecektir. **Burada not edilecek önemli bir husus da task'lar arasında sadece takvimlemeyi belirleyen bağlantıların var olduğudur. Bir başka deyişle, farklı task'ları oluşturan nodlar arasında bir bağlantı bulunamaz.**

Birbirinden ayrılan task'ların her biri için *TaskGenerator* kullanılarak bu task'ı gerçekleyen kodlar/betik oluşturulur.

Task'lar yaratıldıktan sonra, takvimleme için gerekli betik *ScheduleGenerator* kullanılarak oluşturulur. Bu doğrultuda, task'lar arasında sırayı belirten bağlantılar takvimi oluşturmak için kullanılır. Buna ek olarak, graph'la beraber gönderilen takvimleme için gerekli bilgi de kullanılmaktadır. Bu bilgiler; sözkonusu takvimin *id*'si, tekrarlanma stratejisi, başlama-bitiş zamanı, takvimin sahibi vb. verilerden oluşmaktadır.

*TaskGenerator* task'a ait graph'ı önişleyerek akışına başlar. Bu ön işleme ile bağlantılar incelenerek nodların hangi nodlar gerçeklendikten sonra gerçeklenebileceği ve sözkonusu nodların gerçeklenmesinin hangi nodların gerçeklenmesini mümkün kılacağı saptanır. Bu bilgiler, task'taki nodların sıraya konabilmesi için gereklidir.

*TaskGenerator* bir sonraki adımda, nodları sıraya koyar. Bu sıra, bir nod için üretilen kodda, bir başka nod için üretilen kodun parçaları referans olarak kullanmak istediğinde önem arz etmektedir. Örneğin, bir nodun ürettiği makine öğrenmesi modelini kullanmak isteyen bir nod, bu modeli yaratan noddan sonra gelmelidir. Bu şekilde, modeli üreten kod betik içerisinde daha önce yer alacak ve bunu kullanmak isteyen nodlara ait kodlar da daha önce üretilmiş bu modelin referansını kullanabileceklerdir.

Bir sonraki aşama, giriş (initialization) kodlarının hazırlanmasıdır. Bu kodlar, temel kütüphanelerin içerilmesi ve gerekli temel *context*'lerin yaratılması gibi işlevleri yerine getirir. Örneğin, Task bir Spark Task'ı ise gerekli Spark *context*'i ve *session*'ı bu aşamada yaratılmalıdır.

Giriş kısmından sonra, belirlenen sıraya göre nodlara ait kodlar üretilir. Her nod bünyesinde yer aldığı nod ailesi tarafından ele alınır.

Nodlara ait kodlar üretilirken ortak kullanılabilecek kod parçaları (genellikle *util* olarak işlev sağlayan fonksiyonlar) her nod için yaratılmaz. Paylaşılan kod parçalarını (fonksiyonlara vb.) tutan bir global set tutulmaktadır. Bu şekilde, gereksiz kod üretiminden kaçınılmaktadır.

## Temel Yapı

Arakat-Core Temel Yapı Şablonu

![Arakat-Core Project Structure](/images/Arakat-Core_ProjectStructure.png)


Arakat-Core'unun yapı bileşenleri şunlardır:

**configs**

Bu pakette, mevcut nodları ifade node-spec'ler (node özelliklerini ifade eden json'lar) ile nod aileleri ve kategorilerine ait bilgiler yer almaktadır.

Node-spec'ler oluşturulurken kullanılan DSL, core modülde olduğu gibi UI vb. modüller altında da kullanılmaktadır. İleriki versiyonlarda, bu pakette yer alan node-spec'ler bir üst seviyeye taşınabilirler. Bununla birlikte, nod aileleri ve kategorilerine dair bilgiler de bir üst seviyeye taşınabilirler. Böylelikle, modüllerin farkında olması gereken arayüz bilgisi herhangi bir modülün içinde değil de modüller üstü bir seviyede tutulmuş olur.

**docs**

Arakat-core'una ait dokümantasyonu içerir.

**domain**

Bu paket, domain'e ait hata türleri, nod ailesi türleri, özel durum türleri, nodların sahip olduğu üst seviye türleri, içerme bilgileri (hangi nodun hangi *import*'lara ihtiyaç duyduğu), paylaşılan fonksiyon türleri ile bu domain bilgilerini kullanan yardımcı fonksiyonları içerir.

Yardımcı fonksiyonlar dışındaki paket elemanları *enum*'lar şeklindedir. Proje içerisinde kullanılan *constant*'ların *enum*'lar halinde ifade edilmesi, kullanımı ve kontrolü kolaylaştırmaktadır.

**examples**

Bu paket, örnek işlem akışlarına ayrılmıştır. Temel nod ailelerinin kullanımına yönelik örnekler ile ileri seviye nod ailelerini ve uç durumları kapsayan örnekler bu paket içerisinde sunulmuştur.

**pipeline_generator**

Bu paket, nod ailelerini, işlem akışı graph'ının ve task'larının önişlenmesini, işlem akışı (tasklar ve takvimleme için) oluşturulmasını sağlayan işlevleri içermektedir.

**service**

Bu paket, Arakat-core modülünün servis edilmesini sağlayan servisi içermektedir.

**utils**

Bu pakette, gerek kod üretimi gerekse genel işlevler için yardımcı görevindeki fonksiyoneliteler yer almaktadır.

Kod üretimi sırasında parametrelerin işlenmesi, özel durumların ele alınması gibi işlevlere tüm nod aileleri tarafından ihtiyaç duyulmaktadır. Bu işlevler, *utils* altında toplanmıştır.

**validity**

İşlem akışlarını ifade eden graph'ın anlamlandırılması sürecinde kontrol edilmesi gereken durumları ele alan işlevler bu paket altında sağlanmaktadır. Bu kontroller, nodlara giren bağlantıların kontrol edilmesi gibi tüm nodları kapsayan kontroller olabileceği gibi spesifik nodlara (cross-validation nodu, pipeline nodu, data-sourse nodları vb.) veya işlevlere ait kontrolleri de içerebilir.


## Temel Teknolojiler

Arakat-core modülü geniş bir yelpazeye yayılmış analitik teknolojileri ile farklı hız ve büyüklükteki veri kaynaklarını bünyesinde barındırmayı hedeflemektedir. Mevcut durumda, analitik modülü olarak Apache Spark kullanılmaktadır. Veri kaynakları olarak HDFS, Local File System ve Kafka desteklenmektedir. Takvimleme için Apache Airflow kullanılmaktadır.

Apache Spark'ın akış ve yığın veri desteği ortaklı bir yapıda (dataframe'ler üzerinden) sunulduğundan tercih edilir olmuştur. Spark ile akış ve yığın veri barındıran veri kaynakları entegre edilmiştir. Makine öğrenmesi, veri madenciliği, önişleme, istatistik çıkarma, SQL-tabanlı sorgular vb. işlevler Spark üzerinden sağlanmaktadır. Mevcut nod aileleri Spark kod parçaları üretmekte ve Spark Task'ı oluşturmak için kullanılmaktadır. Farklı analitik teknolojileri eklendiğinde, bunlara ait task'lar olacaktır ve bunları oluşturmaya yarayacak nodlar eklenecektir.

Arakat'ı mevcut **data pipeline generation** projelerinden farklı kılan en önemli özelliklerden biri **task'lar bazında işlem akışları oluşturulabilmesinden öte task'ın da alt parçalar kullanılarak inşa edilmesine imkan verilmesidir.** Bu bağlamda, Apache NiFi gibi Spark Job'larına tekabül eden nodlar kullanılarak işlem akışı oluşturabilmenin de ötesinde, Spark betiğini oluşturan veri kaynağı entegrasyonu ve veri analitiğine dair Spark'ın sağladığı tüm özellikler işlem akışları yaratmak için kullanılabilmektedir. Bu da **Spark ya da herhangi bir kodlama bilgisi olmadan işlem akışları oluşturulabilmesine olanak sağlamaktadır.**

Akış verisinin sisteme dahil edilebilmesi için Kafka entegrasyonu desteklenmektedir. Spark Structured Streaming kullanılarak gerçeklenen akış verisi analitikleri ileriki versiyonlarda farklı teknolojilerle genişletilebilir. Bu noktada, Apache Flink ve (Kafka) K-Streams eklenilmesi hedeflenen ilk teknolojilerdir. Daha sonraki safhalar da ise bu analitiklerin Apache Beam altında toplanması değerlendirilmektedir.

Takvimleme için Apache Airflow tercih edilmiştir. Airflow, yalnız Spark Job'ları değil; bash script'ler, ssh ile iş gönderme vb. birçok seçenek sunmaktadır. Bununla birlikte, karmaşık takvim akışları gerçeklenebilmektedir.

Arakat-Core python2 kullanmaktadır.

Mevcut durumda, Arakat-Core'un servis edilmesi için Flask Server kullanılmaktadır. İlerleyen versiyonlarda, yüksek sayıda kullanıcı ve isteğin karşılanabilmesi için farklı teknolojiler değerlendirilebilir.


## İleri Düzey Tasarım Detayları

