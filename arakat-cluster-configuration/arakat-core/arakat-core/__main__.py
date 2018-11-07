import sys

# In the future, use argument parser etc.
my_args = sys.argv
module = __import__(my_args[1], fromlist=[''])
my_func = getattr(module, my_args[2])
func_args = {}
if (len(my_args) > 3):
    func_args = my_args[3:]
my_func(func_args)

# Example usage from command line:
# cd to arakat-core
# python __main__.py service.CoreService run_my_server 10.154.3.18 5001