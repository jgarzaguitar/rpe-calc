window.onload = function () {

// settings
  Vue.component('my-modal', {
    template: `
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="box">
            <h3>
              Default multipliers
            </h3>

              <p>Squat: {{ squat }}</p> 
              <p>Press: {{ press }}</p>
              <p>Bench: {{ bench }}</p>
              <p>Deadlift: {{ deadlift }}</p>
          </div>
          <!-- Any other Bulma elements you want -->
        </div>
        <button class="modal-close is-large" @click="$emit('close')" aria-label="close"></button>
      </div>
    `,
    props: 
      ['squat', 'press', 'bench', 'deadlift']
  })
  
// calculator, reset function, currently parent component, stores all data
  var rpe_calculator = new Vue({
    el: '#calculator',
// all the apps data
    data: {
      target_rpe: 6,
      target_reps: 1,
      actual_rpe: 6,
      actual_reps: 1,
      message1: "",
      message2: "",
      message3: "",
      rep_values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],  
      rpe_values: [6, 7, 8, 8.5, 9, 9.5, 10],
      selected_lift: '',
      lift_options: [
        { text: 'Please select a lift', value: null},
        { text: 'Squat', value: 'Squat' },
        { text: 'Bench', value: 'Bench' },
        { text: 'Press', value: 'Press'},
        { text: 'Deadlift', value: 'Deadlift' }
      ],
      topset: '',
      squat: .06,
      press: .04,
      bench: .04,
      deadlift: .1,
      showModal: false
    },
    methods: {
// resets all user defined data to default values
      reset: function() {
        this.target_rpe = 6
        this.target_reps = 1
        this.actual_rpe = 6
        this.actual_reps = 1
        this.selected_lift = ''
        this.message1 = ""
        this.message2 = ""
        this.message3 = ""
        this.topset = ''
      },
// calculates modifier based on type and number of mistakes
      calcMistake: function() {
        var backoff_perc_diff = 0
        var backoff_sets_diff = 0
        var target_rpe = parseFloat(this.target_rpe)
        var target_reps = parseInt(this.target_reps)
        var actual_rpe = parseFloat(this.actual_rpe)
        var actual_reps = parseInt(this.actual_reps)
        // Success
        if (actual_rpe === target_rpe && actual_reps === target_reps) {
          this.message1 = "Nice job! Move on to your backoff sets"
          return backoff_perc_diff
        }
        // overshot
        else if (actual_rpe > target_rpe && actual_reps === target_reps) {
          backoff_perc_diff = (this.rpe_values.indexOf(actual_rpe) - this.rpe_values.indexOf(target_rpe)) * .02
          backoff_perc_diff_msg = backoff_perc_diff * 100
          this.message1 = "You overshot your RPE."
          return backoff_perc_diff
        }
        // overshot and missed reps
        else if (actual_reps < target_reps) {
          backoff_perc_diff = (this.rpe_values.indexOf(10) - this.rpe_values.indexOf(target_rpe)) * .02 + (target_reps - actual_reps) * .02
          backoff_perc_diff_msg = backoff_perc_diff * 100
          this.message1 = "You overshot to RPE 10 when you failed."
          return backoff_perc_diff
        }
        // undershot
        else if (actual_rpe < target_rpe && actual_reps === target_reps) {
          backoff_sets_diff = 1
          backoff_perc_diff_msg = backoff_perc_diff * 100
          this.message1 = "You undershot your RPE. Keep looking."
          return backoff_perc_diff
        } 
        // if actual reps exceeds target reps
        else {
          this.message1 = "Invalid input."
        }
      },
// determines lift, adds modifier from calcMistake, prints final perc and absolute value
      calcBackoff: function() {
        modifier = this.calcMistake()
        // squat
        if (this.selected_lift === "Squat") {
          backoff_perc = 1 - (this.squat + modifier)
          backoff_perc_msg = backoff_perc * 100
          this.message2 = "Updated backoff percentage: " + backoff_perc_msg + "%."
          if (this.topset != '') { 
            this.message3 =  "Take " + parseInt(this.topset * backoff_perc) + " for your backoffs."
            }   
        }
        // bench and press
        else if (this.selected_lift === "Bench" | this.selected_lift === "Press") {
          backoff_perc = 1 - (this.bench + modifier)
          backoff_perc_msg = backoff_perc * 100
          this.message2 = "Updated backoff percentage: " + backoff_perc_msg + "%."
          if (this.topset != '') { 
            this.message3 =  "Take " + parseInt(this.topset * backoff_perc) + " for your backoffs."
            } 
        }
        // deadlift
        else if (this.selected_lift === "Deadlift") {
          backoff_perc = 1 - (this.deadlift + modifier)
          backoff_perc_msg = backoff_perc * 100
          this.message2 = "Updated backoff percentage: " + backoff_perc_msg + "%."
          if (this.topset != '') { 
            this.message3 =  "Take " + parseInt(this.topset * backoff_perc) + " for your backoffs."
            } 
        }
      }
    },
// when selected_lift changes, call calcBackoff
// I think this is where my bug is
    watch: {
      // selected_lift: 'calcBackoff'
    }
  });

// set limits to backoff reduction
// dump all data into local storage
// when app loads, load local storage
// on:change for lifts only works when it's changed. should be able to update when clicked again, 
//    or re-render when any changes to inputs happen
// allow modal component to perform edits to percentages
// fix bug where reset must be called twice to remove message1

// i would change the flow so you might put that dropdown selector at the top
// then have them select the rpe, reps, etc. 
// then maybe do a "calculate" button
// then maybe do a "clear" button right next to it


}
