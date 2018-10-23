package io.github.arakat.arakatcommunity.service;

import io.github.arakat.arakatcommunity.config.AppPropertyValues;
import io.github.arakat.arakatcommunity.utils.FileOperationUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.util.*;

@Service
public class GraphService {

    private AppPropertyValues appPropertyValues;
    private FileOperationUtils fileOperationUtils;

    @Autowired
    public GraphService(AppPropertyValues appPropertyValues, FileOperationUtils fileOperationUtils) {
        this.appPropertyValues = appPropertyValues;
        this.fileOperationUtils = fileOperationUtils;
    }

    //TODO: ask this quote=\"
    //TODO: create different app.properties file so that you can switch between development and production configs.
    public JSONObject addConfigToDagProperties(String graph) {
        JSONObject graphJson = new JSONObject(graph);

        JSONObject dagProperties = (JSONObject) graphJson.get("dag_properties");

        JSONObject sparkOperatorConfDetails = new JSONObject();
        JSONObject conf = new JSONObject();

        conf.put("spark.pyspark.python", appPropertyValues.getPythonVersion());
        sparkOperatorConfDetails.put("conn_id", appPropertyValues.getConnectionId());
        sparkOperatorConfDetails.put("depends_on_past", false);
        sparkOperatorConfDetails.put("conf", conf);

        dagProperties.put("spark_operator_conf", sparkOperatorConfDetails);
        dagProperties.put("code_base_path", appPropertyValues.getApplicationPath());

        graphJson.put("dag_properties", dagProperties);

        return graphJson;
    }

    public String postGraphAndDagPropsToCore(String graphToPost) {
        RestTemplate restTemplate = new RestTemplate();

        restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
        restTemplate.getMessageConverters().add(new StringHttpMessageConverter());

        String uri = appPropertyValues.getArakatCoreUrl() + ":" + appPropertyValues.getArakatCorePort() + "/" + appPropertyValues.getArakatCorePostingGraphEndpoint();

        Map<String, String> vars = new HashMap<>();

        return restTemplate.postForObject(uri, graphToPost, String.class, vars);
    }

    public String mockServerResponse() {
        return "{\n" +
                "  \"codes\": {\n" +
                "    \"MyFirstApp\": {\n" +
                "        \"tasks\": {\n" +
                "        \"task1\": \"from pyspark import SparkContext\\nfrom pyspark.sql import SparkSession\\nfrom pyspark import SQLContext\\nfrom pyspark.sql.types import *\\nimport pyspark.sql.functions as F\\nfrom pyspark.sql.functions import col, udf, lag, date_add, explode, lit, concat, unix_timestamp, sum, abs\\nfrom pyspark.sql.functions import udf\\n\\nsc = SparkContext(appName=\\\"MyFirstApp_Task_task1\\\")\\nspark = SparkSession(sc)\\n\\nimport itertools\\nfrom string import Template\\ndef column_selector_template(template_input, template_string):\\n\\tinput_combinations=itertools.product(*template_input)\\n\\ttemplate=Template(template_string)\\n\\tresult=[]\\n\\tfor val in input_combinations:\\n\\t\\targs={}\\n\\t\\tfor i in range(len(val)):\\n\\t\\t\\targs['v'+str(i)]=val[i]\\n\\t\\tresult.append(template.substitute(**args))\\n\\treturn result\\n\\n\\n\\ndf_node1=spark.read.csv(path=filepath.csv, quote=\\\\\\\", sep=,, inferSchema=True, header=False)\\ndef my_f_node3(arg1,arg2,arg3):\\n\\tprint('Cool UDF')\\n\\treturn 1\\n\\n\\nudf_node3 = udf(my_f_node3, IntegerType())\\ntuple_list = [column_selector_template([[c],[1, 2, 3]], '${v0}${v1}'), column_selector_template([[c],[4, 5, 6]], '${v0}${v1}')]\\noutput_list = [o1, o2]\\ndf_node3=df_node1\\nfor index in range(len(tuple_list)):\\n\\tdf_node3 = df_node3.withColumn(output_list[index], udf_node3(*tuple_list[index]))\\n\\ndef Cat1_node2(num):\\n\\tif num <= 10: return '0-10'\\n\\telif 10 < num and num <= 20: return '11-20'\\n\\telif 20 < num and num <= 30: return '21-30'\\n\\telif 30 < num and num <= 40: return '31-40'\\n\\telse: return 'morethan40'\\n\\n\\nudf_node2 = udf(Cat1_node2, StringType())\\ntuple_list = [[c1], [c4], [c6]]\\noutput_list = [o1, o2, o3]\\ndf_node2=df_node1\\nfor index in range(len(tuple_list)):\\n\\tdf_node2 = df_node2.withColumn(output_list[index], udf_node2(*tuple_list[index]))\\n\\n\",\n" +
                "        \"task2\": \"asdasdas\"\n" +
                "        },\n" +
                "        \"scheduler\": \"from airflow import DAG\\nfrom airflow.contrib.operators.spark_submit_operator import SparkSubmitOperator\\nfrom datetime import datetime\\n\\ndag = DAG(\\\"MyFirstApp\\\", default_args={owner: airflow, start_date: datetime.strptime(\\\"01/01/2018\\\", \\\"%d/%m/%Y\\\")}, schedule_interval=\\\"@once\\\")\\n\\noperator_args = {u'depends_on_past': False, u'conn_id': u'spark_con_py', u'conf': {u'spark.pyspark.python': u'/usr/bin/python2.7'}}\\nTask_MyFirstApp_task1 = SparkSubmitOperator(task_id=MyFirstApp_task1, application=path_to_put_spark_scripts/MyFirstApp_task1.py, dag=dag, **operator_args)\\n\\n\\n\"\n" +
                "    },\n" +
                "    \"MySecondApp\": {\n" +
                "        \"tasks\": {\n" +
                "            \"task1\": \"asdasd\",\n" +
                "            \"task2\": \"asdasdas\"\n" +
                "        },\n" +
                "        \"scheduler\": \"...\"\n" +
                "    }\n" +
                "  },\n" +
                "  \"errors\": {\n" +
                "    \"task_errors\": {},\n" +
                "    \"scheduler_errors\": []\n" +
                "  },\n" +
                "  \"result_code\": true\n" +
                "}";
    }

    public void separateDagAndTasks(String dagAndTasks) throws IOException {
        JSONObject dagAndTasksJson = new JSONObject(dagAndTasks);
        JSONObject dagsJson = (JSONObject) dagAndTasksJson.get("codes");

        for (String key : iteratorToIterable(dagsJson.keys())) {
            JSONObject entry = dagsJson.getJSONObject(key);

            for (String taskKey : iteratorToIterable(entry.keys())) {
                if (entry.get(taskKey) instanceof JSONObject) {
                    JSONObject tasks = entry.getJSONObject(taskKey);

                    for (String subKey : iteratorToIterable(tasks.keys())) {
                        String pysparkCode = (String) tasks.get(subKey);
                        String fileName = key + "_" + subKey + ".py";

                        fileOperationUtils.writeToFile(fileName, pysparkCode, appPropertyValues.getSparkCodesOutputFileLocation());
                    }
                } else {
                    String airflowSchedulerCode = (String) entry.get(taskKey);
                    fileOperationUtils.writeToFile(key, airflowSchedulerCode, appPropertyValues.getDagOutputFileLocation());
                }
            }
        }
    }

    private <T> Iterable<T> iteratorToIterable(Iterator<T> iterator) {
        return () -> iterator;
    }
}
