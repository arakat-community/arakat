## Temel Teknolojiler

Arakat-core modülü geniş bir yelpazeye yayılmış analitik teknolojileri ile farklı hız ve büyüklükteki veri kaynaklarını bünyesinde barındırmayı hedeflemektedir. Mevcut durumda, analitik modülü olarak Apache Spark kullanılmaktadır. Veri kaynakları olarak HDFS, Local File System ve Kafka desteklenmektedir. Takvimleme için Apache Airflow kullanılmaktadır.

Apache Spark'ın akış ve yığın veri desteği ortaklı bir yapıda (dataframe'ler üzerinden) sunulduğundan tercih edilir olmuştur. Spark ile akış ve yığın veri barındıran veri kaynakları entegre edilmiştir. Makine öğrenmesi, veri madenciliği, önişleme, istatistik çıkarma, SQL-tabanlı sorgular vb. işlevler Spark üzerinden sağlanmaktadır. Mevcut nod aileleri Spark kod parçaları üretmekte ve Spark Task'ı oluşturmak için kullanılmaktadır. Farklı analitik teknolojileri eklendiğinde, bunlara ait task'lar olacaktır ve bunları oluşturmaya yarayacak nodlar eklenecektir.

Arakat'ı mevcut **data pipeline generation** projelerinden farklı kılan en önemli özelliklerden biri **task'lar bazında işlem akışları oluşturulabilmesinden öte task'ın da alt parçalar kullanılarak inşa edilmesine imkan verilmesidir.** Bu bağlamda, Apache NiFi gibi Spark Job'larına tekabül eden nodlar kullanılarak işlem akışı oluşturabilmenin de ötesinde, Spark betiğini oluşturan veri kaynağı entegrasyonu ve veri analitiğine dair Spark'ın sağladığı tüm özellikler işlem akışları yaratmak için kullanılabilmektedir. Bu da **Spark ya da herhangi bir kodlama bilgisi olmadan işlem akışları oluşturulabilmesine olanak sağlamaktadır.**

Akış verisinin sisteme dahil edilebilmesi için Kafka entegrasyonu desteklenmektedir. Spark Structured Streaming kullanılarak gerçeklenen akış verisi analitikleri ileriki versiyonlarda farklı teknolojilerle genişletilebilir. Bu noktada, Apache Flink ve (Kafka) K-Streams eklenilmesi hedeflenen ilk teknolojilerdir. Daha sonraki safhalar da ise bu analitiklerin Apache Beam altında toplanması değerlendirilmektedir.

Takvimleme için Apache Airflow tercih edilmiştir. Airflow, yalnız Spark Job'ları değil; bash script'ler, ssh ile iş gönderme vb. birçok seçenek sunmaktadır. Bununla birlikte, karmaşık takvim akışları gerçeklenebilmektedir.

Arakat-Core python2 kullanmaktadır.

Mevcut durumda, Arakat-Core'un servis edilmesi için Flask Server kullanılmaktadır. İlerleyen versiyonlarda, yüksek sayıda kullanıcı ve isteğin karşılanabilmesi için farklı teknolojiler değerlendirilebilir.
