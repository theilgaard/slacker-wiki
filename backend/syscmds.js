// System cmds
var exec 	= require('child_process').exec;

module.exports = {
	getCpu: function(callback) {
		exec("grep 'cpu ' /proc/stat | awk '{cpu_usage=($2+$4)*100/($2+$4+$5)} END {print cpu_usage \"%\"}'", function(error,stdout, stderr){
			callback(stdout);
		});	
	}
};
