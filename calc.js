window.onload = function () {
  
  var rpe_calculator = new Vue({
    el: '#calculator',
    data: {
      target_rpe: 6,
      target_reps: 1,
      actual_rpe: 6,
      actual_reps: 1,
      message1: "",
      message2: "",
      rep_values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],  
      rpe_values: [6, 7, 8, 8.5, 9, 9.5, 10],
      selected_lift: '',
      lift_options: [
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
    },
    methods: {
      reset: function() {
        this.target_rpe = 6
        this.target_reps = 1
        this.actual_rpe = 6
        this.actual_reps = 1
        this.message = ""
      },
      calcMistake: function() {
        var backoff_perc_diff = 0
        var backoff_sets_diff = 0
        var target_rpe = parseFloat(this.target_rpe)
        var target_reps = parseInt(this.target_reps)
        var actual_rpe = parseFloat(this.actual_rpe)
        var actual_reps = parseInt(this.actual_reps)
          //Success
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
          this.message1 = "You undershot your RPE."
          return backoff_perc_diff
        } 
        else {
          this.message1 = "Invalid input."
        }
      },
      calcBackoff: function() {
        modifier = this.calcMistake()

        if (this.selected_lift === "Squat") {
          backoff_perc = 1 - (this.squat + modifier)
          backoff_perc_msg = backoff_perc * 100
          this.message2 = "Updated backoff percentage: " + backoff_perc_msg + "%. Take " + parseInt(this.topset * backoff_perc) + " for your backoffs."
        }
        else if (this.selected_lift === "Bench" | this.selected_lift === "Press") {
          backoff_perc = 1 - (this.bench + modifier)
          backoff_perc_msg = backoff_perc * 100
          this.message2 = "Updated backoff percentage: " + backoff_perc_msg + "%. Take " + parseInt(this.topset * backoff_perc) + " for your backoffs."
        }
        else if (this.selected_lift === "Deadlift") {
          backoff_perc = 1 - (this.deadlift + modifier)
          backoff_perc_msg = backoff_perc * 100
          this.message2 = "Updated backoff percentage: " + backoff_perc_msg + "%. Take " + parseInt(this.topset * backoff_perc) + " for your backoffs."
        }
      }
    },
    watch: {
      selected_lift: 'calcBackoff'
    }
  });

// set limits to backoff reduction
// display default backoff percentage somewhere
// make default backoff percentage editable
// dump all data into local storage
// when app loads, load local storage
// fix rpe input to only show specific rpe values i want
// on:change for lifts only works when it's changed. should be able to update when clicked again, 
//    or re-render when any changes to inputs happen


}
