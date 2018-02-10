var mongoose = require('mongoose');

const ayaSchema = new mongoose.Schema({
    number:{
        type: [Number],
        required: true
    }
});

const ayatSchema = new mongoose.Schema({
    topic: {
        type: String, 
        required: true
    },
    numbers: [ayaSchema]
});

mongoose.model('Ayat', ayatSchema, 'Ayat');

/* Example data 
{
	"topic": "mirath",
	"list":
	[
	    {
	        "number":[], 
	    },
	    {
        }
    ]
}
*/