window.onload = function () {
  
  var rpe_calculator = new Vue({
    el: '#calculator',
    data: {
      target_rpe: 6,
      target_reps: 0,
      actual_rpe: 6,
      actual_reps: 0,
      message: "",
      rpe_values: [6, 7, 8, 8.5, 9, 9.5, 10],
      selected_lift: '',
      lift_options: [
        { text: 'Squat', value: 'Squat' },
        { text: 'Bench', value: 'Bench' },
        { text: 'Press', value: 'Press'},
        { text: 'Deadlift', value: 'Deadlift' }
      ],
      topset: '',
      squat: .94,
      press: .96,
      bench: .96,
      deadlift: .90,
    },
    methods: {
      reset: function() {
        this.target_rpe = 6
        this.target_reps = 0
        this.actual_rpe = 6
        this.actual_reps = 0
        this.message = ""
      },
      calculateRPE: function() {
        var current_lift = this.selected_lift
        var backoff_perc_diff = 0
        var backoff_sets_diff = 0
        var target_rpe = parseFloat(this.target_rpe)
        var target_reps = parseInt(this.target_reps)
        var actual_rpe = parseFloat(this.actual_rpe)
        var actual_reps = parseInt(this.actual_reps)
          //Success
        if (actual_rpe === target_rpe && actual_reps === target_reps) {
          this.message = "Nice job! Move on to your backoff sets"
        }
        // overshot
        else if (actual_rpe > target_rpe && actual_reps === target_reps) {
          backoff_perc_diff = (this.rpe_values.indexOf(actual_rpe) - this.rpe_values.indexOf(target_rpe)) * 2
          this.message = "You overshot your RPE. Take off " + backoff_perc_diff + "% from your backoffs."
        }
        // overshot and missed reps
        else if (actual_reps < target_reps) {
          backoff_perc_diff = (this.rpe_values.indexOf(10) - this.rpe_values.indexOf(target_rpe)) * 2 + (target_reps - actual_reps) * 2
          this.message = "You overshot to RPE 10 when you failed. Take off " + backoff_perc_diff + "% from your backoffs."
        }
        // undershot
        else if (actual_rpe < target_rpe) {
          backoff_sets_diff = 1
          this.message = "You undershot your RPE. Subtract " + backoff_sets_diff + " set from your backoffs and keep looking for your target RPE."
        } else {
          this.message = "What are you doing? Talk to Josh."
        }
      }
    },
    watch: {
      selected_lift: 'calculateRPE'
    }
  });
// set limits to backoff reduction
// update percentages when lift is selected
// display default backoff percentage somewhere
// make default backoff percentage editable
// print absolute weight change based on top set input
// dump all data into local storage
// when app loads, load local storage



}
