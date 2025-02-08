const mongoose= require('mongoose');

const projectSchema = new mongoose.Schema({
  verified:{type: Boolean },
    userId: {type: String },                  
    privatee: {type: Boolean },
    funded: {type: Boolean },
    chain: { type: String },
    category: { type: String },
    sortbyy: { type: String},
    tge: { type: String },
    special: { type: Boolean},
    stage: { type: String},
    location: { type: String},
    title: { type: String},
    investorAmount: { type: Number},
    raisedMoney: { type: Number},
    minimumInvestment: { type: Number },
    valuationCap: { type: Number},
    description: { type: String},
    logo: { type: String},
    image: { type: String},
    maximumInvestment: Number,
    fundingGoal: Number,
    tgeDate: String,
    allocation: Number,
    twitterLink: String,
    youtubeLink: String,
    linkedinLink: String,
    discountedValuationCap: Number,
    discount: Number,
    deadline: String,
    securityType: String,
    nomineeLead: String,
    pictures: [String],
    highlights: String,
    highlightsImage: String,
    utility: String,
    utilityImage: String,
    usp: String,
    uspImage: String,
    roadMap: String,
    roadMapImage: String,
    revenueStream: String,
    revenueStreamImage: String,
    technology: String,
    technologyImage: String,
    marketingStrategy: String,
    marketingStrategyImage: String,
    tokenomic: String,  
    tokenomicImage: String,
    partners: [
      {
        name: String,
        title: String,
        description: String,
        profilePhoto: String, // Store the path to the partner's profile photo
        linkedinLink: String,
      },
    ],
    docs: [
      {
        docName: String,
        docFile: String, // Store the path to the partner's profile photo
              },
    ],
    teamMembers: [
      {
        name: String,
        title: String,
        description: String,
        profilePhoto: String, // Store the path to the partner's profile photo
        linkedinLink: String,
      },
    ],
  });
  
  module.exports= mongoose.model('Project',projectSchema);
  