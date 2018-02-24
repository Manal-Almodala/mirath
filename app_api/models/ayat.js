var mongoose = require('mongoose');

const ayaSchema = new mongoose.Schema({
    sura:{
        type: String,
        required: true
    },
    verse:{
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true 
    },
});

const ayatSchema = new mongoose.Schema({
    topic: {
        type: String, 
        required: true
    },
    ayat: [ayaSchema]
});

mongoose.model('Ayat', ayatSchema, 'Ayat');

/* Example data 
{
	"topic": "mirath",
	"ayat":
	[
	    {
            "sura": "النساء"
            "verse":7, 
            "text": "لِلرِّجَالِ نَصِيبٌ مِمَّا تَرَكَ الْوَالِدَانِ وَالْأَقْرَبُونَ وَلِلنِّسَاءِ
                     نَصِيبٌ مِمَّا تَرَكَ الْوَالِدَانِ وَالْأَقْرَبُونَ مِمَّا 
                     قَلَّ مِنْهُ أَوْ كَثُرَ ۚ نَصِيبًا مَفْرُوضًا"
        }
    ]
}
*/