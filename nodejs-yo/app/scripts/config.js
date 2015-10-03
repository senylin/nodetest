require.config({

  deps: ['main'],

  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
    underscore: '../bower_components/underscore/underscore'
  },

  shim: {
    jquery: {
      exports: 'jquery'
    },
    underscore: {
      exports: '_'
    },
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    }
  }

});