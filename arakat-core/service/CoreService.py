from pipeline_generator.generators import PipelineGenerator

from flask import Flask
from flask import request
from flask_cors import CORS

import json

app = Flask(__name__)
CORS(app)

global my_Server

class CoreService(object):

   def __init__(self, args):
       pass

def run_my_server(args):
   global my_Server
   my_Server=CoreService(args)
   app.run(host="10.154.3.18", port=5001)


@app.route('/interpret_graph',methods=['POST'])
def extract():
   json_data = request.get_json(force=True)
   graph = json_data['graph']
   dag_properties = json_data['dag_properties']
   code_info, success, errors, additional_info = PipelineGenerator.generate_pipeline(graph, dag_properties)
   result={"codes": code_info, "result_code": success, "errors": errors, "additional_info": additional_info}
   json_string = json.dumps(result)
   return json_string

if __name__ == "__main__":
    run_my_server({})