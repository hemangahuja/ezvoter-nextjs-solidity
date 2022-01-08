export default function longErrorToShortError (error){
    if(error.message.includes('No candidates added yet')){
      return 'No candidates added yet';
    }
    else if(error.message.includes('Winner not calculated yet')){
      return 'Winner not calculated yet';
    }
    else if(error.message.includes('Only owner can reset')){
      return 'Only owner can reset';
    }
    else if(error.message.includes('Only owner can add candidates')){
      return 'Only owner can add candidates';
    }
    else if(error.message.includes('Only owner can calculate winner')){
      return 'Only owner can calculate winner';
    }
    else if(error.message.includes('Voting not in progress')){
      return 'Voting not in progress';
    }
    else if(error.message.includes('Candidate already exists')){
      return 'Candidate already exists';
    }
    else if(error.message.includes('Candidate does not exist')){
      return 'Candidate does not exist';
    }
    else if(error.message.includes('Voting has ended or is not in progress')){
      return 'Voting has ended or is not in progress';
    }
    else if(error.message.includes('No candidates added yet')){
      return 'No candidates added yet';
    }
  }