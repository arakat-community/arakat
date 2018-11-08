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