(function() {
  var tractatus;

  tractatus = angular.module('tractatus-tree', ['ngRoute']);

  tractatus.config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/', {
        controller: 'MainCtrl',
        templateUrl: "partials/home.html"
      });
    }
  ]);

  tractatus.config([
    "$provide", function($provide) {
      return $provide.decorator("$rootScope", [
        "$delegate", function($delegate) {
          $delegate.safeApply = function(fn) {
            var phase;
            phase = $delegate.$$phase;
            if ((phase === "$apply") || (phase === "$digest")) {
              if (fn && (typeof fn === typeof '')) {
                return fn();
              }
            } else {
              return $delegate.$apply(fn);
            }
          };
          return $delegate;
        }
      ]);
    }
  ]);

  tractatus.controller('MainCtrl', [
    '$scope', '$sce', 'constant.events', function($scope, $sce, EVENTS) {
      var languages;
      languages = {
        en: 'English',
        de: 'German'
      };
      $scope.selectedLanguage = 'en';
      $scope.selectedNode = void 0;
      $scope.$on(EVENTS.node.selected, function(evt, node) {
        return $scope.safeApply(function() {
          $scope.selectedNode = node;
        });
      });
      $scope.selectLang = function(lang) {
        $scope.selectedLanguage = lang;
      };
      $scope.getLanguages = function(lang) {
        return _.map(_.keys($scope.selectedNode.content), function(v) {
          return {
            key: v,
            value: languages[v]
          };
        });
      };
      $scope.isSelectedLang = function(lang) {
        var selected;
        selected = $scope.selectedLanguage === lang;
        return selected;
      };
      $scope.getContent = function() {
        var node;
        node = $scope.selectedNode;
        if (node.content) {
          return $sce.trustAsHtml(node.content[$scope.selectedLanguage]);
        }
      };
    }
  ]);

  angular.module('tractatus-tree').constant('constant.events', {
    node: {
      selected: 'node:selected',
      closed: 'node:closed'
    }
  });

  angular.module('tractatus-tree').constant('constant.tree', {
    "children": [
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "content": {
                  "de": "<p>Die Welt ist durch die Tatsachen bestimmt und dadurch, dass es <em class=\"germph\">alle</em> Tatsachen sind.</p>",
                  "en": "<p>The world is determined by the facts, and by their being <em>all</em> the facts.</p>"
                },
                "empty": false,
                "key": "1.1.1",
                "sub_key": "1"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Denn, die Gesamtheit der Tatsachen bestimmt, was der Fall ist und auch, was alles nicht der Fall ist.</p>",
                  "en": "<p>For the totality of facts determines what is the case, and also whatever is not the case.</p>"
                },
                "empty": false,
                "key": "1.1.2",
                "sub_key": "2"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Die Tatsachen im logischen Raum sind die Welt.</p>",
                  "en": "<p>The facts in logical space are the world.</p>"
                },
                "empty": false,
                "key": "1.1.3",
                "sub_key": "3"
              }
            ],
            "content": {
              "de": "<p>Die Welt ist die Gesamtheit der Tatsachen, nicht der Dinge.</p>",
              "en": "<p>The world is the totality of facts, not of things.</p>"
            },
            "empty": false,
            "key": "1.1",
            "sub_key": "1"
          }, {
            "children": [
              {
                "children": [],
                "content": {
                  "de": "<p>Eines kann der Fall sein oder nicht der Fall sein und alles \u00fcbrige gleich bleiben.</p>",
                  "en": "<p>Each item can be the case or not the case while everything else remains the same.</p>"
                },
                "empty": false,
                "key": "1.2.1",
                "sub_key": "1"
              }
            ],
            "content": {
              "de": "<p>Die Welt zerf\u00e4llt in Tatsachen.</p>",
              "en": "<p>The world divides into facts.</p>"
            },
            "empty": false,
            "key": "1.2",
            "sub_key": "2"
          }
        ],
        "content": {
          "de": "<p>Die Welt ist alles, was der Fall ist.</p>",
          "en": "<p>The world is all that is the case.</p>"
        },
        "empty": false,
        "key": "1",
        "sub_key": "1"
      }, {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Es ist dem Ding wesentlich, der Bestandteil eines Sachverhaltes sein zu k\u00f6nnen.</p>",
                      "en": "<p>It is essential to things that they should be possible constituents of states of affairs.</p>"
                    },
                    "empty": false,
                    "key": "2.0.1.1",
                    "sub_key": "1"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Es erschiene gleichsam als Zufall, wenn dem Ding, das allein f\u00fcr sich bestehen k\u00f6nnte, nachtr\u00e4glich eine Sachlage passen w\u00fcrde.</p><p>Wenn die Dinge in Sachverhalten vorkommen k\u00f6nnen, so muss dies schon in ihnen liegen.</p><p>(Etwas Logisches kann nicht nur-m\u00f6glich sein. Die Logik handelt von jeder M\u00f6glichkeit und alle M\u00f6glichkeiten sind ihre Tatsachen.)</p><p>Wie wir uns r\u00e4umliche Gegenst\u00e4nde \u00fcberhaupt nicht au\u00dferhalb des Raumes, zeitliche nicht au\u00dferhalb der Zeit denken k\u00f6nnen, so k\u00f6nnen wir uns <em class=\"germph\">keinen</em> Gegenstand au\u00dferhalb der M\u00f6glichkeit seiner Verbindung mit anderen denken.</p><p>Wenn ich mir den Gegenstand im Verbande des Sachverhalts denken kann, so kann ich ihn nicht au\u00dferhalb der <em class=\"germph\">M\u00f6glichkeit</em> dieses Verbandes denken.</p>",
                          "en": "<p>It would seem to be a sort of accident, if it turned out that a situation would fit a thing that could already exist entirely on its own.</p><p>If things can occur in states of affairs, this possibility must\nbe in them from the beginning. </p><p>(Nothing in the province of logic can be merely possible. Logic deals with every possibility and all possibilities are its facts.)</p><p>Just as we are quite unable to imagine spatial objects outside space or temporal objects outside time, so too there is <em>no</em> object that we can imagine excluded from the possibility of combining with others.</p><p>If I can imagine objects combined in states of affairs, I cannot imagine them excluded from the possibility of such combinations.</p>"
                        },
                        "empty": false,
                        "key": "2.0.1.2.1",
                        "sub_key": "1"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Das Ding ist selbst\u00e4ndig, insofern es in allen <em class=\"germph\">m\u00f6glichen</em> Sachlagen vorkommen kann, aber diese Form der Selbst\u00e4ndigkeit ist eine Form des Zusammenhangs mit dem Sachverhalt, eine Form der Unselbst\u00e4ndigkeit. (Es ist unm\u00f6glich, dass Worte in zwei verschiedenen Weisen auftreten, allein und im Satz.)</p>",
                          "en": "<p>Things are independent in so far as they can occur in all <em>possible</em> situations, but this form of independence is a form of connexion with states of affairs, a form of dependence. (It is impossible for words to appear in two different roles: by themselves, and in propositions.)</p>"
                        },
                        "empty": false,
                        "key": "2.0.1.2.2",
                        "sub_key": "2"
                      }, {
                        "children": [
                          {
                            "children": [],
                            "content": {
                              "de": "<p>Um einen Gegenstand zu kennen, muss ich zwar nicht seine externen\u2014aber ich muss alle seine internen Eigenschaften kennen.</p>",
                              "en": "<p>If I am to know an object, though I need not know its external properties, I must know all its internal properties.</p>"
                            },
                            "empty": false,
                            "key": "2.0.1.2.3.1",
                            "sub_key": "1"
                          }
                        ],
                        "content": {
                          "de": "<p>Wenn ich den Gegenstand kenne, so kenne ich auch s\u00e4mtliche M\u00f6glichkeiten seines Vorkommens in Sachverhalten.</p><p>(Jede solche M\u00f6glichkeit muss in der Natur des Gegenstandes liegen.)</p><p>Es kann nicht nachtr\u00e4glich eine neue M\u00f6glichkeit gefunden werden.</p>",
                          "en": "<p>If I know an object I also know all its possible occurrences in states of affairs.</p><p>(Every one of these possibilities must be part of the nature of the object.)</p><p>A new possibility cannot be discovered later.</p>"
                        },
                        "empty": false,
                        "key": "2.0.1.2.3",
                        "sub_key": "3"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Sind alle Gegenst\u00e4nde gegeben, so sind damit auch alle <em class=\"germph\">m\u00f6glichen</em> Sachverhalte gegeben.</p>",
                          "en": "<p>If all objects are given, then at the same time all <em>possible</em> states of affairs are also given.</p>"
                        },
                        "empty": false,
                        "key": "2.0.1.2.4",
                        "sub_key": "4"
                      }
                    ],
                    "content": {
                      "de": "<p>In der Logik ist nichts zuf\u00e4llig: Wenn das Ding im Sachverhalt vorkommen <em class=\"germph\">kann</em>, so muss die M\u00f6glichkeit des Sachverhaltes im Ding bereits pr\u00e4judiziert sein.</p>",
                      "en": "<p>In logic nothing is accidental: if a thing <em>can</em> occur in a state of affairs, the possibility of the state of affairs must be written into the thing itself.</p>"
                    },
                    "empty": false,
                    "key": "2.0.1.2",
                    "sub_key": "2"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Der r\u00e4umliche Gegenstand muss im unendlichen Raume liegen. (Der Raumpunkt ist eine Argumentstelle.)</p><p>Der Fleck im Gesichtsfeld muss zwar nicht rot sein, aber eine Farbe muss er haben: er hat sozusagen den Farbenraum um sich. Der Ton muss <em class=\"germph\">eine</em> H\u00f6he haben, der Gegenstand des Tastsinnes <em class=\"germph\">eine</em> H\u00e4rte, usw.</p>",
                          "en": "<p>A spatial object must be situated in infinite space. (A spatial point is an argument-place.) </p><p>A speck in the visual field, thought it need not be red, must have some colour: it is, so to speak, surrounded by colour-space. Notes must have <em>some</em> pitch, objects of the sense of touch <em>some</em> degree of hardness, and so on.</p>"
                        },
                        "empty": false,
                        "key": "2.0.1.3.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Jedes Ding ist, gleichsam, in einem Raume m\u00f6glicher Sachverhalte. Diesen Raum kann ich mir leer denken, nicht aber das Ding ohne den Raum.</p>",
                      "en": "<p>Each thing is, as it were, in a space of possible states of affairs. This space I can imagine empty, but I cannot imagine the thing without the space.</p>"
                    },
                    "empty": false,
                    "key": "2.0.1.3",
                    "sub_key": "3"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Die M\u00f6glichkeit seines Vorkommens in Sachverhalten, ist die Form des Gegenstandes.</p>",
                          "en": "<p>The possibility of its occurring in states of affairs is the form of an object.</p>"
                        },
                        "empty": false,
                        "key": "2.0.1.4.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Die Gegenst\u00e4nde enthalten die M\u00f6glichkeit aller Sachlagen.</p>",
                      "en": "<p>Objects contain the possibility of all situations.</p>"
                    },
                    "empty": false,
                    "key": "2.0.1.4",
                    "sub_key": "4"
                  }
                ],
                "content": {
                  "de": "<p>Der Sachverhalt ist eine Verbindung von Gegenst\u00e4nden. (Sachen, Dingen.)</p>",
                  "en": "<p>A state of affairs (a state of things) is a combination of objects (things).</p>"
                },
                "empty": false,
                "key": "2.0.1",
                "sub_key": "1"
              }, {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Jede Aussage \u00fcber Komplexe l\u00e4sst sich in eine Aussage \u00fcber deren Bestandteile und in diejenigen S\u00e4tze zerlegen, welche die Komplexe vollst\u00e4ndig beschreiben.</p>",
                          "en": "<p>Every statement about complexes can be resolved into a statement about their constituents and into the propositions that describe the complexes completely.</p>"
                        },
                        "empty": false,
                        "key": "2.0.2.0.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {},
                    "empty": true,
                    "key": "2.0.2.0",
                    "sub_key": "0"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>H\u00e4tte die Welt keine Substanz, so w\u00fcrde, ob ein Satz Sinn hat, davon abh\u00e4ngen, ob ein anderer Satz wahr ist.</p>",
                          "en": "<p>If the world had no substance, then whether a proposition had sense would depend on whether another proposition was true.</p>"
                        },
                        "empty": false,
                        "key": "2.0.2.1.1",
                        "sub_key": "1"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Es w\u00e4re dann unm\u00f6glich, ein Bild der Welt (wahr oder falsch) zu entwerfen.</p>",
                          "en": "<p>In that case we could not sketch any picture of the world (true or false).</p>"
                        },
                        "empty": false,
                        "key": "2.0.2.1.2",
                        "sub_key": "2"
                      }
                    ],
                    "content": {
                      "de": "<p>Die Gegenst\u00e4nde bilden die Substanz der Welt. Darum k\u00f6nnen sie nicht zusammengesetzt sein.</p>",
                      "en": "<p>Objects make up the substance of the world. That is why they cannot be composite.</p>"
                    },
                    "empty": false,
                    "key": "2.0.2.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Es ist offenbar, dass auch eine von der wirklichen noch so verschieden gedachte Welt Etwas\u2014eine Form\u2014mit der wirklichen gemein haben muss.</p>",
                      "en": "<p>It is obvious that an imagined world, however different it may be from the real one, must have <em>something</em>\u2014a form\u2014in common with it.</p>"
                    },
                    "empty": false,
                    "key": "2.0.2.2",
                    "sub_key": "2"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Die Substanz der Welt <em class=\"germph\">kann</em> nur eine Form und keine materiellen Eigenschaften bestimmen. Denn diese werden erst durch die S\u00e4tze dargestellt\u2014erst durch die Konfiguration der Gegenst\u00e4nde gebildet.</p>",
                          "en": "<p>The substance of the world <em>can</em> only determine a form, and not any material properties. For it is only by means of propositions that material properties are represented\u2014only by the configuration of objects that they are produced.</p>"
                        },
                        "empty": false,
                        "key": "2.0.2.3.1",
                        "sub_key": "1"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Beil\u00e4ufig gesprochen: Die Gegenst\u00e4nde sind farblos.</p>",
                          "en": "<p>In a manner of speaking, objects are colourless.</p>"
                        },
                        "empty": false,
                        "key": "2.0.2.3.2",
                        "sub_key": "2"
                      }, {
                        "children": [
                          {
                            "children": [],
                            "content": {
                              "de": "<p>Entweder ein Ding hat Eigenschaften, die kein anderes hat, dann kann man es ohneweiteres durch eine Beschreibung aus den anderen herausheben, und darauf hinweisen; oder aber, es gibt mehrere Dinge, die ihre s\u00e4mtlichen Eigenschaften gemeinsam haben, dann ist es \u00fcberhaupt unm\u00f6glich auf eines von ihnen zu zeigen.</p><p>Denn, ist das Ding durch nichts hervorgehoben, so kann ich es nicht hervorheben, denn sonst ist es eben hervorgehoben.</p>",
                              "en": "<p>Either a thing has properties that nothing else has, in which\ncase we can immediately use a description to distinguish it from the\nothers and refer to it; or, on the other hand, there are several things\nthat have the whole set of their properties in common, in which case it\nis quite impossible to indicate one of them.</p><p>For if there is nothing to distinguish a thing, I cannot distinguish it, since otherwise it would be distinguished after all.</p>"
                            },
                            "empty": false,
                            "key": "2.0.2.3.3.1",
                            "sub_key": "1"
                          }
                        ],
                        "content": {
                          "de": "<p>Zwei Gegenst\u00e4nde von der gleichen logischen Form sind\u2014abgesehen von ihren externen Eigenschaften\u2014von einander nur dadurch unterschieden, dass sie verschieden sind.</p>",
                          "en": "<p>If two objects have the same logical form, the only distinction between them, apart from their external properties, is that they are different.</p>"
                        },
                        "empty": false,
                        "key": "2.0.2.3.3",
                        "sub_key": "3"
                      }
                    ],
                    "content": {
                      "de": "<p>Diese feste Form besteht eben aus den Gegenst\u00e4nden.</p>",
                      "en": "<p>Objects are just what constitute this unalterable form.</p>"
                    },
                    "empty": false,
                    "key": "2.0.2.3",
                    "sub_key": "3"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die Substanz ist das, was unabh\u00e4ngig von dem was der Fall ist, besteht.</p>",
                      "en": "<p>The substance is what subsists independently of what is the case.</p>"
                    },
                    "empty": false,
                    "key": "2.0.2.4",
                    "sub_key": "4"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Raum, Zeit und Farbe (F\u00e4rbigkeit) sind Formen der Gegenst\u00e4nde.</p>",
                          "en": "<p>Space, time, colour (being coloured) are forms of objects.</p>"
                        },
                        "empty": false,
                        "key": "2.0.2.5.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Sie ist Form und Inhalt.</p>",
                      "en": "<p>It is form and content.</p>"
                    },
                    "empty": false,
                    "key": "2.0.2.5",
                    "sub_key": "5"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Nur wenn es Gegenst\u00e4nde gibt, kann es eine feste Form der Welt geben.</p>",
                      "en": "<p>There must be objects, if the world is to have unalterable form.</p>"
                    },
                    "empty": false,
                    "key": "2.0.2.6",
                    "sub_key": "6"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Der Gegenstand ist das Feste, Bestehende; die Konfiguration ist das Wechselnde, Unbest\u00e4ndige.</p>",
                          "en": "<p>Objects are what is unalterable and subsistent; their configuration is what is changing and unstable.</p>"
                        },
                        "empty": false,
                        "key": "2.0.2.7.1",
                        "sub_key": "1"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Die Konfiguration der Gegenst\u00e4nde bildet den Sachverhalt.</p>",
                          "en": "<p>The configuration of objects produces states of affairs.</p>"
                        },
                        "empty": false,
                        "key": "2.0.2.7.2",
                        "sub_key": "2"
                      }
                    ],
                    "content": {
                      "de": "<p>Das Feste, das Bestehende und der Gegenstand sind Eins.</p>",
                      "en": "<p>Objects, the unalterable, and the subsistent are one and the same.</p>"
                    },
                    "empty": false,
                    "key": "2.0.2.7",
                    "sub_key": "7"
                  }
                ],
                "content": {
                  "de": "<p>Der Gegenstand ist einfach.</p>",
                  "en": "<p>Objects are simple.</p>"
                },
                "empty": false,
                "key": "2.0.2",
                "sub_key": "2"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Im Sachverhalt verhalten sich die Gegenst\u00e4nde in bestimmter Art und Weise zueinander.</p>",
                      "en": "<p>In a state of affairs objects stand in a determinate relation to one another.</p>"
                    },
                    "empty": false,
                    "key": "2.0.3.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die Art und Weise, wie die Gegenst\u00e4nde im Sachverhalt zusammenh\u00e4ngen, ist die Struktur des Sachverhaltes.</p>",
                      "en": "<p>The determinate way in which objects are connected in a state of affairs is the structure of the state of affairs.</p>"
                    },
                    "empty": false,
                    "key": "2.0.3.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die Form ist die M\u00f6glichkeit der Struktur.</p>",
                      "en": "<p>Form is the possibility of structure.</p>"
                    },
                    "empty": false,
                    "key": "2.0.3.3",
                    "sub_key": "3"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die Struktur der Tatsache besteht aus den Strukturen der Sachverhalte.</p>",
                      "en": "<p>The structure of a fact consists of the structures of states of affairs.</p>"
                    },
                    "empty": false,
                    "key": "2.0.3.4",
                    "sub_key": "4"
                  }
                ],
                "content": {
                  "de": "<p>Im Sachverhalt h\u00e4ngen die Gegenst\u00e4nde ineinander, wie die Glieder einer Kette.</p>",
                  "en": "<p>In a state of affairs objects fit into one another like the links of a chain.</p>"
                },
                "empty": false,
                "key": "2.0.3",
                "sub_key": "3"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Die Gesamtheit der bestehenden Sachverhalte ist die Welt.</p>",
                  "en": "<p>The totality of existing states of affairs is the world.</p>"
                },
                "empty": false,
                "key": "2.0.4",
                "sub_key": "4"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Die Gesamtheit der bestehenden Sachverhalte bestimmt auch, welche Sachverhalte nicht bestehen.</p>",
                  "en": "<p>The totality of existing states of affairs also determines which states of affairs do not exist.</p>"
                },
                "empty": false,
                "key": "2.0.5",
                "sub_key": "5"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Die Sachverhalte sind von einander unabh\u00e4ngig.</p>",
                      "en": "<p>States of affairs are independent of one another.</p>"
                    },
                    "empty": false,
                    "key": "2.0.6.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Aus dem Bestehen oder Nichtbestehen eines Sachverhaltes kann nicht auf das Bestehen oder Nichtbestehen eines anderen geschlossen werden.</p>",
                      "en": "<p>From the existence or non-existence of one state of affairs it is impossible to infer the existence or non-existence of another.</p>"
                    },
                    "empty": false,
                    "key": "2.0.6.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die gesamte Wirklichkeit ist die Welt.</p>",
                      "en": "<p>The sum-total of reality is the world.</p>"
                    },
                    "empty": false,
                    "key": "2.0.6.3",
                    "sub_key": "3"
                  }
                ],
                "content": {
                  "de": "<p>Das Bestehen und Nichtbestehen von Sachverhalten ist die Wirklichkeit.</p><p>(Das Bestehen von Sachverhalten nennen wir auch eine positive, das Nichtbestehen eine negative Tatsache.)</p>",
                  "en": "<p>The existence and non-existence of states of affairs is reality.</p><p>(We call the existence of states of affairs a positive fact, and their non-existence a negative fact.)</p>"
                },
                "empty": false,
                "key": "2.0.6",
                "sub_key": "6"
              }
            ],
            "content": {},
            "empty": true,
            "key": "2.0",
            "sub_key": "0"
          }, {
            "children": [
              {
                "children": [],
                "content": {
                  "de": "<p>Das Bild stellt die Sachlage im logischen Raume, das Bestehen und Nichtbestehen von Sachverhalten vor.</p>",
                  "en": "<p>A picture presents a situation in logical space, the existence and non-existence of states of affairs.</p>"
                },
                "empty": false,
                "key": "2.1.1",
                "sub_key": "1"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Das Bild ist ein Modell der Wirklichkeit.</p>",
                  "en": "<p>A picture is a model of reality.</p>"
                },
                "empty": false,
                "key": "2.1.2",
                "sub_key": "2"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Die Elemente des Bildes vertreten im Bild die Gegenst\u00e4nde.</p>",
                      "en": "<p>In a picture the elements of the picture are the representatives of objects.</p>"
                    },
                    "empty": false,
                    "key": "2.1.3.1",
                    "sub_key": "1"
                  }
                ],
                "content": {
                  "de": "<p>Den Gegenst\u00e4nden entsprechen im Bilde die Elemente des Bildes.</p>",
                  "en": "<p>In a picture objects have the elements of the picture corresponding to them.</p>"
                },
                "empty": false,
                "key": "2.1.3",
                "sub_key": "3"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Das Bild ist eine Tatsache.</p>",
                      "en": "<p>A picture is a fact.</p>"
                    },
                    "empty": false,
                    "key": "2.1.4.1",
                    "sub_key": "1"
                  }
                ],
                "content": {
                  "de": "<p>Das Bild besteht darin, dass sich seine Elemente in bestimmter Art und Weise zu einander verhalten.</p>",
                  "en": "<p>What constitutes a picture is that its elements are related to one another in a determinate way.</p>"
                },
                "empty": false,
                "key": "2.1.4",
                "sub_key": "4"
              }, {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Das Bild ist <em class=\"germph\">so</em> mit der Wirklichkeit verkn\u00fcpft\u2014es reicht bis zu ihr.</p>",
                          "en": "<p><em>That</em> is how a picture is attached to reality; it reaches right out to it.</p>"
                        },
                        "empty": false,
                        "key": "2.1.5.1.1",
                        "sub_key": "1"
                      }, {
                        "children": [
                          {
                            "children": [],
                            "content": {
                              "de": "<p>Nur die \u00e4u\u00dfersten Punkte der Teilstriche <em class=\"germph\">ber\u00fchren</em> den zu messenden Gegenstand.</p>",
                              "en": "<p>Only the end-points of the graduating lines actually <em>touch</em> the object that is to be measured.</p>"
                            },
                            "empty": false,
                            "key": "2.1.5.1.2.1",
                            "sub_key": "1"
                          }
                        ],
                        "content": {
                          "de": "<p>Es ist wie ein Ma\u00dfstab an die Wirklichkeit angelegt.</p>",
                          "en": "<p>It is laid against reality like a measure.</p>"
                        },
                        "empty": false,
                        "key": "2.1.5.1.2",
                        "sub_key": "2"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Nach dieser Auffassung geh\u00f6rt also zum Bilde auch noch die abbildende Beziehung, die es zum Bild macht.</p>",
                          "en": "<p>So a picture, conceived in this way, also includes the pictorial relationship, which makes it into a picture.</p>"
                        },
                        "empty": false,
                        "key": "2.1.5.1.3",
                        "sub_key": "3"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Die abbildende Beziehung besteht aus den Zuordnungen der Elemente des Bildes und der Sachen.</p>",
                          "en": "<p>The pictorial relationship consists of the correlations of the picture\u2019s elements with things.</p>"
                        },
                        "empty": false,
                        "key": "2.1.5.1.4",
                        "sub_key": "4"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Diese Zuordnungen sind gleichsam die F\u00fchler der Bildelemente, mit denen das Bild die Wirklichkeit ber\u00fchrt.</p>",
                          "en": "<p>These correlations are, as it were, the feelers of the picture\u2019s elements, with which the picture touches reality.</p>"
                        },
                        "empty": false,
                        "key": "2.1.5.1.5",
                        "sub_key": "5"
                      }
                    ],
                    "content": {
                      "de": "<p>Die Form der Abbildung ist die M\u00f6glichkeit, dass sich die Dinge so zu einander verhalten, wie die Elemente des Bildes.</p>",
                      "en": "<p>Pictorial form is the possibility that things are related to one another in the same way as the elements of the picture.</p>"
                    },
                    "empty": false,
                    "key": "2.1.5.1",
                    "sub_key": "1"
                  }
                ],
                "content": {
                  "de": "<p>Dass sich die Elemente des Bildes in bestimmter Art und Weise zu einander verhalten, stellt vor, dass sich die Sachen so zu einander verhalten.</p><p>Dieser Zusammenhang der Elemente des Bildes hei\u00dfe seine Struktur und ihre M\u00f6glichkeit seine Form der Abbildung.</p>",
                  "en": "<p>The fact that the elements of a picture are related to one another in a determinate way represents that things are related to one another in the same way.</p><p>Let us call this connexion of its elements the structure of the picture, and let us call the possibility of this structure the pictorial form of the picture.</p>"
                },
                "empty": false,
                "key": "2.1.5",
                "sub_key": "5"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>In Bild und Abgebildetem muss etwas identisch sein, damit das eine \u00fcberhaupt ein Bild des anderen sein kann.</p>",
                      "en": "<p>There must be something identical in a picture and what it depicts, to enable the one to be a picture of the other at all.</p>"
                    },
                    "empty": false,
                    "key": "2.1.6.1",
                    "sub_key": "1"
                  }
                ],
                "content": {
                  "de": "<p>Die Tatsache muss, um Bild zu sein, etwas mit dem Abgebildeten gemeinsam haben.</p>",
                  "en": "<p>If a fact is to be a picture, it must have something in common with what it depicts.</p>"
                },
                "empty": false,
                "key": "2.1.6",
                "sub_key": "6"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Das Bild kann jede Wirklichkeit abbilden, deren Form es hat.</p><p>Das r\u00e4umliche Bild alles R\u00e4umliche, das farbige alles Farbige, etc.</p>",
                      "en": "<p>A picture can depict any reality whose form it has.</p><p>A spatial picture can depict anything spatial, a coloured one anything coloured, etc.</p>"
                    },
                    "empty": false,
                    "key": "2.1.7.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Seine Form der Abbildung aber, kann das Bild nicht abbilden; es weist sie auf.</p>",
                      "en": "<p>A picture cannot, however, depict its pictorial form: it displays it.</p>"
                    },
                    "empty": false,
                    "key": "2.1.7.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Das Bild stellt sein Objekt von au\u00dferhalb dar (sein Standpunkt ist seine Form der Darstellung), darum stellt das Bild sein Objekt richtig oder falsch dar.</p>",
                      "en": "<p>A picture represents its subject from a position outside it. (Its standpoint is its representational form.) That is why a picture represents its subject correctly or incorrectly.</p>"
                    },
                    "empty": false,
                    "key": "2.1.7.3",
                    "sub_key": "3"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Das Bild kann sich aber nicht au\u00dferhalb seiner Form der Darstellung stellen.</p>",
                      "en": "<p>A picture cannot, however, place itself outside its representational form.</p>"
                    },
                    "empty": false,
                    "key": "2.1.7.4",
                    "sub_key": "4"
                  }
                ],
                "content": {
                  "de": "<p>Was das Bild mit der Wirklichkeit gemein haben muss, um sie auf seine Art und Weise\u2014richtig oder falsch\u2014abbilden zu k\u00f6nnen, ist seine Form der Abbildung.</p>",
                  "en": "<p>What a picture must have in common with reality, in order to be able to depict it\u2014correctly or incorrectly\u2014in the way that it does, is its pictorial form.</p>"
                },
                "empty": false,
                "key": "2.1.7",
                "sub_key": "7"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Ist die Form der Abbildung die logische Form, so hei\u00dft das Bild das logische Bild.</p>",
                      "en": "<p>A picture whose pictorial form is logical form is called a logical picture.</p>"
                    },
                    "empty": false,
                    "key": "2.1.8.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Jedes Bild ist <em class=\"germph\">auch</em> ein logisches. (Dagegen ist z. B. nicht jedes Bild ein r\u00e4umliches.)</p>",
                      "en": "<p>Every picture is <em>at the same time</em> a logical one. (On the other hand, not every picture is, for example, a spatial one.)</p>"
                    },
                    "empty": false,
                    "key": "2.1.8.2",
                    "sub_key": "2"
                  }
                ],
                "content": {
                  "de": "<p>Was jedes Bild, welcher Form immer, mit der Wirklichkeit gemein haben muss, um sie \u00fcberhaupt\u2014richtig oder falsch\u2014abbilden zu k\u00f6nnen, ist die logische Form, das ist, die Form der Wirklichkeit.</p>",
                  "en": "<p>What any picture, of whatever form, must have in common with reality, in order to be able to depict it\u2014correctly or incorrectly\u2014in any way at all, is logical form, i.e. the form of reality.</p>"
                },
                "empty": false,
                "key": "2.1.8",
                "sub_key": "8"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Das logische Bild kann die Welt abbilden.</p>",
                  "en": "<p>Logical pictures can depict the world.</p>"
                },
                "empty": false,
                "key": "2.1.9",
                "sub_key": "9"
              }
            ],
            "content": {
              "de": "<p>Wir machen uns Bilder der Tatsachen.</p>",
              "en": "<p>We picture facts to ourselves.</p>"
            },
            "empty": false,
            "key": "2.1",
            "sub_key": "1"
          }, {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Das Bild bildet die Wirklichkeit ab, indem es eine M\u00f6glichkeit des Bestehens und Nichtbestehens von Sachverhalten darstellt.</p>",
                      "en": "<p>A picture depicts reality by representing a possibility of existence and non-existence of states of affairs.</p>"
                    },
                    "empty": false,
                    "key": "2.2.0.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Das Bild stellt eine m\u00f6gliche Sachlage im logischen Raume dar.</p>",
                      "en": "<p>A picture represents a possible situation in logical \nspace.</p>"
                    },
                    "empty": false,
                    "key": "2.2.0.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Das Bild enth\u00e4lt die M\u00f6glichkeit der Sachlage, die es darstellt.</p>",
                      "en": "<p>A picture contains the possibility of the situation that it represents.</p>"
                    },
                    "empty": false,
                    "key": "2.2.0.3",
                    "sub_key": "3"
                  }
                ],
                "content": {},
                "empty": true,
                "key": "2.2.0",
                "sub_key": "0"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Das Bild stimmt mit der Wirklichkeit \u00fcberein oder nicht; es ist richtig oder unrichtig, wahr oder falsch.</p>",
                  "en": "<p>A picture agrees with reality or fails to agree; it is correct or incorrect, true or false.</p>"
                },
                "empty": false,
                "key": "2.2.1",
                "sub_key": "1"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Was das Bild darstellt, ist sein Sinn.</p>",
                      "en": "<p>What a picture represents is its sense.</p>"
                    },
                    "empty": false,
                    "key": "2.2.2.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>In der \u00dcbereinstimmung oder Nicht\u00fcbereinstimmung seines Sinnes mit der Wirklichkeit, besteht seine Wahrheit oder Falschheit.</p>",
                      "en": "<p>The agreement or disagreement of its sense with reality constitutes its truth or falsity.</p>"
                    },
                    "empty": false,
                    "key": "2.2.2.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Um zu erkennen, ob das Bild wahr oder falsch ist, m\u00fcssen wir es mit der Wirklichkeit vergleichen.</p>",
                      "en": "<p>In order to tell whether a picture is true or false we must compare it with reality.</p>"
                    },
                    "empty": false,
                    "key": "2.2.2.3",
                    "sub_key": "3"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Aus dem Bild allein ist nicht zu erkennen, ob es wahr oder falsch ist.</p>",
                      "en": "<p>It is impossible to tell from the picture alone whether it is true or false.</p>"
                    },
                    "empty": false,
                    "key": "2.2.2.4",
                    "sub_key": "4"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Ein a priori wahres Bild gibt es nicht.</p>",
                      "en": "<p>There are no pictures that are true <em>a priori</em>.</p>"
                    },
                    "empty": false,
                    "key": "2.2.2.5",
                    "sub_key": "5"
                  }
                ],
                "content": {
                  "de": "<p>Das Bild stellt dar, was es darstellt, unabh\u00e4ngig von seiner Wahr- oder Falschheit, durch die Form der Abbildung.</p>",
                  "en": "<p>What a picture represents it represents independently of its truth or falsity, by means of its pictorial form.</p>"
                },
                "empty": false,
                "key": "2.2.2",
                "sub_key": "2"
              }
            ],
            "content": {
              "de": "<p>Das Bild hat mit dem Abgebildeten die logische Form der Abbildung gemein.</p>",
              "en": "<p>A picture has logico-pictorial form in common with what it depicts.</p>"
            },
            "empty": false,
            "key": "2.2",
            "sub_key": "2"
          }
        ],
        "content": {
          "de": "<p>Was der Fall ist, die Tatsache, ist das Bestehen von Sachverhalten.</p>",
          "en": "<p>What is the case\u2014a fact\u2014is the existence of states of affairs.</p>"
        },
        "empty": false,
        "key": "2",
        "sub_key": "2"
      }, {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>\u201eEin Sachverhalt ist denkbar\u201c hei\u00dft: Wir k\u00f6nnen uns ein Bild von ihm machen.</p>",
                      "en": "<p>\u2018A state of affairs is thinkable\u2019: what this means is that we can\npicture it to ourselves.</p>"
                    },
                    "empty": false,
                    "key": "3.0.0.1",
                    "sub_key": "1"
                  }
                ],
                "content": {},
                "empty": true,
                "key": "3.0.0",
                "sub_key": "0"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Die Gesamtheit der wahren Gedanken sind ein Bild der Welt.</p>",
                  "en": "<p>The totality of true thoughts is a picture of the world.</p>"
                },
                "empty": false,
                "key": "3.0.1",
                "sub_key": "1"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Der Gedanke enth\u00e4lt die M\u00f6glichkeit der Sachlage, die er denkt. Was denkbar ist, ist auch m\u00f6glich.</p>",
                  "en": "<p>A thought contains the possibility of the situation of which it is the thought. What is thinkable is possible too.</p>"
                },
                "empty": false,
                "key": "3.0.2",
                "sub_key": "2"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Man sagte einmal, dass Gott alles schaffen k\u00f6nne, nur nichts, was den logischen Gesetzen zuwider w\u00e4re.\u2014Wir k\u00f6nnen n\u00e4mlich von einer \u201eunlogischen\u201c Welt nicht <em class=\"germph\">sagen</em>, wie sie auss\u00e4he.</p>",
                      "en": "<p>It used to be said that God could create anything except what would be contrary to the laws of logic. The truth is that we could not <em>say</em> what an \u2018illogical\u2019 world would look like.</p>"
                    },
                    "empty": false,
                    "key": "3.0.3.1",
                    "sub_key": "1"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Wohl k\u00f6nnen wir einen Sachverhalt r\u00e4umlich darstellen, welcher den Gesetzen der Physik, aber keinen, der den Gesetzen der Geometrie zuwiderliefe.</p>",
                          "en": "<p>Though a state of affairs that would contravene the laws of physics can be represented by us spatially, one that would contravene the laws of geometry cannot.</p>"
                        },
                        "empty": false,
                        "key": "3.0.3.2.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Etwas \u201eder Logik widersprechendes\u201c in der Sprache darstellen, kann man ebensowenig, wie in der Geometrie eine den Gesetzen des Raumes widersprechende Figur durch ihre Koordinaten darstellen; oder die Koordinaten eines Punktes angeben, welcher nicht existiert.</p>",
                      "en": "<p>It is as impossible to represent in language anything that \u2018contradicts logic\u2019 as it is in geometry to represent by its co-ordinates a figure that contradicts the laws of space, or to give the co-ordinates of a point that does not exist.</p>"
                    },
                    "empty": false,
                    "key": "3.0.3.2",
                    "sub_key": "2"
                  }
                ],
                "content": {
                  "de": "<p>Wir k\u00f6nnen nichts Unlogisches denken, weil wir sonst unlogisch denken m\u00fcssten.</p>",
                  "en": "<p>Thought can never be of anything illogical, since, if it were, we should have to think illogically.</p>"
                },
                "empty": false,
                "key": "3.0.3",
                "sub_key": "3"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Ein a priori richtiger Gedanke w\u00e4re ein solcher, dessen M\u00f6glichkeit seine Wahrheit bedingte.</p>",
                  "en": "<p>If a thought were correct <em>a priori</em>, it would be a thought whose possibility ensured its truth.</p>"
                },
                "empty": false,
                "key": "3.0.4",
                "sub_key": "4"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Nur so k\u00f6nnten wir a priori wissen, dass ein Gedanke wahr ist, wenn aus dem Gedanken selbst (ohne Vergleichsobjekt) seine Wahrheit zu erkennen w\u00e4re.</p>",
                  "en": "<p><em>A priori</em> knowledge that a thought was true would be possible only if its truth were recognizable from the thought itself (without anything to compare it with).</p>"
                },
                "empty": false,
                "key": "3.0.5",
                "sub_key": "5"
              }
            ],
            "content": {},
            "empty": true,
            "key": "3.0",
            "sub_key": "0"
          }, {
            "children": [
              {
                "children": [],
                "content": {
                  "de": "<p>Wir ben\u00fctzen das sinnlich wahrnehmbare Zeichen (Laut- oder Schriftzeichen etc.) des Satzes als Projektion der m\u00f6glichen Sachlage.</p><p>Die Projektionsmethode ist das Denken des Satz-Sinnes.</p>",
                  "en": "<p>We use the perceptible sign of a proposition (spoken or written,\netc.) as a projection of a possible situation.</p><p>The method of projection is to think of the sense of the proposition.</p>"
                },
                "empty": false,
                "key": "3.1.1",
                "sub_key": "1"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Das Zeichen, durch welches wir den Gedanken ausdr\u00fccken, nenne ich das Satzzeichen. Und der Satz ist das Satzzeichen in seiner projektiven Beziehung zur Welt.</p>",
                  "en": "<p>I call the sign with which we express a thought a propositional sign.\u2014And a proposition is a propositional sign in its projective relation to the world.</p>"
                },
                "empty": false,
                "key": "3.1.2",
                "sub_key": "2"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Zum Satz geh\u00f6rt alles, was zur Projektion geh\u00f6rt; aber nicht das Projizierte.</p><p>Also die M\u00f6glichkeit des Projizierten, aber nicht dieses selbst.</p><p>Im Satz ist also sein Sinn noch nicht enthalten, wohl aber die M\u00f6glichkeit, ihn auszud\u00fccken.</p><p>(\u201eDer Inhalt des Satzes\u201c hei\u00dft der Inhalt des sinnvollen Satzes.)</p><p>Im Satz ist die Form seines Sinnes enthalten, aber nicht dessen Inhalt.</p>",
                  "en": "<p>A proposition includes all that the projection includes, but not what is projected.</p><p>Therefore, though what is projected is not itself included, its possibility is.</p><p>A proposition, therefore, does not actually contain its sense, but does contain the possibility of expressing it.</p><p>(\u2018The content of a proposition\u2019 means the content of a proposition that has sense.) </p><p>A proposition contains the form, but not the content, of its sense.</p>"
                },
                "empty": false,
                "key": "3.1.3",
                "sub_key": "3"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Der Satz ist kein W\u00f6rtergemisch.\u2014(Wie das musikalische Thema kein Gemisch von T\u00f6nen.)</p><p>Der Satz ist artikuliert.</p>",
                      "en": "<p>A proposition is not a blend of words.\u2014(Just as a theme in music is not a blend of notes.)</p><p>A proposition is articulate.</p>"
                    },
                    "empty": false,
                    "key": "3.1.4.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Nur Tatsachen k\u00f6nnen einen Sinn ausdr\u00fccken, eine Klasse von Namen kann es nicht.</p>",
                      "en": "<p>Only facts can express a sense, a set of names cannot.</p>"
                    },
                    "empty": false,
                    "key": "3.1.4.2",
                    "sub_key": "2"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Sehr klar wird das Wesen des Satzzeichens, wenn wir es uns, statt aus Schriftzeichen, aus r\u00e4umlichen Gegenst\u00e4nden (etwa Tischen, St\u00fchlen, B\u00fcchern) zusammengesetzt denken.</p><p>Die gegenseitige r\u00e4umliche Lage dieser Dinge dr\u00fcckt dann den Sinn des Satzes aus.</p>",
                          "en": "<p>The essence of a propositional sign is very clearly seen if we imagine one composed of spatial objects (such as tables, chairs, and books) instead of written signs.</p><p>Then the spatial arrangement of these things will express the sense of the proposition.</p>"
                        },
                        "empty": false,
                        "key": "3.1.4.3.1",
                        "sub_key": "1"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Nicht: \u201eDas komplexe Zeichen \u201a<var>aRb</var>\u2018 sagt, dass <var>a</var> in der Beziehung <var>R</var> zu <var>b</var> steht\u201c, sondern: <em class=\"germph\">Dass</em> \u201e<var>a</var>\u201c in einer gewissen Beziehung zu \u201e<var>b</var>\u201c steht, sagt, <em class=\"germph\">dass</em> <var>aRb</var>.</p>",
                          "en": "<p>Instead of, \u2018The complex sign \u201c<var>aRb</var>\u201d says that <var>a</var> stands to <var>b</var> in\nthe relation <var>R</var>\u2019, we ought to put, \u2018<em>That</em> \u201c<var>a</var>\u201d stands to \u201c<var>b</var>\u201d in a certain\nrelation says <em>that</em> <var>aRb</var>.\u2019</p>"
                        },
                        "empty": false,
                        "key": "3.1.4.3.2",
                        "sub_key": "2"
                      }
                    ],
                    "content": {
                      "de": "<p>Dass das Satzzeichen eine Tatsache ist, wird durch die gew\u00f6hnliche Ausdrucksform der Schrift oder des Druckes verschleiert.</p><p>Denn im gedruckten Satz z. B. sieht das Satzzeichen nicht wesentlich verschieden aus vom Wort.</p><p>(So war es m\u00f6glich, dass Frege den Satz einen zusammengesetzten Namen nannte.)</p>",
                      "en": "<p>Although a propositional sign is a fact, this is obscured by the usual form of expression in writing or print.</p><p>For in a printed proposition, for example, no essential difference is apparent between a propositional sign and a word.</p><p>(That is what made it possible for Frege to call a proposition a composite name.)</p>"
                    },
                    "empty": false,
                    "key": "3.1.4.3",
                    "sub_key": "3"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Sachlagen kann man beschreiben, nicht <em class=\"germph\">benennen</em>.</p><p>(Namen gleichen Punkten, S\u00e4tze Pfeilen, sie haben Sinn.)</p>",
                      "en": "<p>Situations can be described but not <em>given names</em>.</p><p>(Names are like points; propositions like arrows\u2014they have sense.)</p>"
                    },
                    "empty": false,
                    "key": "3.1.4.4",
                    "sub_key": "4"
                  }
                ],
                "content": {
                  "de": "<p>Das Satzzeichen besteht darin, dass sich seine Elemente, die W\u00f6rter, in ihm auf bestimmte Art und Weise zu einander verhalten.</p><p>Das Satzzeichen ist eine Tatsache.</p>",
                  "en": "<p>What constitutes a propositional sign is that in it its elements (the words) stand in a determinate relation to one another.</p><p>A propositional sign is a fact.</p>"
                },
                "empty": false,
                "key": "3.1.4",
                "sub_key": "4"
              }
            ],
            "content": {
              "de": "<p>Im Satz dr\u00fcckt sich der Gedanke sinnlich wahrnehmbar aus.</p>",
              "en": "<p>In a proposition a thought finds an expression that can be perceived by the senses.</p>"
            },
            "empty": false,
            "key": "3.1",
            "sub_key": "1"
          }, {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Diese Elemente nenne ich \u201eeinfache Zeichen\u201c und den Satz \u201evollst\u00e4ndig analysiert\u201c.</p>",
                      "en": "<p>I call such elements \u2018simple signs\u2019, and such a proposition \u2018complete analysed\u2019.</p>"
                    },
                    "empty": false,
                    "key": "3.2.0.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die im Satze angewandten einfachen Zeichen hei\u00dfen Namen.</p>",
                      "en": "<p>The simple signs employed in propositions are called names.</p>"
                    },
                    "empty": false,
                    "key": "3.2.0.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Der Name bedeutet den Gegenstand. Der Gegenstand ist seine Bedeutung. (\u201e<var>A</var>\u201c ist dasselbe Zeichen wie \u201e<var>A</var>\u201c.)</p>",
                      "en": "<p>A name means an object. The object is its meaning. (\u2018<var>A</var>\u2019 is the same sign as \u2018<var>A</var>\u2019.)</p>"
                    },
                    "empty": false,
                    "key": "3.2.0.3",
                    "sub_key": "3"
                  }
                ],
                "content": {},
                "empty": true,
                "key": "3.2.0",
                "sub_key": "0"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Der Konfiguration der einfachen Zeichen im Satzzeichen entspricht die Konfiguration der Gegenst\u00e4nde in der Sachlage.</p>",
                  "en": "<p>The configuration of objects in a situation corresponds to the configuration of simple signs in the propositional sign.</p>"
                },
                "empty": false,
                "key": "3.2.1",
                "sub_key": "1"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Die Gegenst\u00e4nde kann ich nur <em class=\"germph\">nennen</em>. Zeichen vertreten sie. Ich kann nur <em class=\"germph\">von</em> ihnen sprechen, <em class=\"germph\">sie aussprechen</em> kann ich nicht. Ein Satz kann nur sagen, <em class=\"germph\">wie</em> ein Ding ist, nicht <em class=\"germph\">was</em> es ist.</p>",
                      "en": "<p>Objects can only be <em>named</em>. Signs are their representatives. I can only speak <em>about</em> them: I cannot <em>put them into words</em>. Propositions can only say <em>how</em> things are, not <em>what</em> they are.</p>"
                    },
                    "empty": false,
                    "key": "3.2.2.1",
                    "sub_key": "1"
                  }
                ],
                "content": {
                  "de": "<p>Der Name vertritt im Satz den Gegenstand.</p>",
                  "en": "<p>In a proposition a name is the representative of an object.</p>"
                },
                "empty": false,
                "key": "3.2.2",
                "sub_key": "2"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Die Forderung der M\u00f6glichkeit der einfachen Zeichen ist die Forderung der Bestimmtheit des Sinnes.</p>",
                  "en": "<p>The requirement that simple signs be possible is the requirement that sense be determinate.</p>"
                },
                "empty": false,
                "key": "3.2.3",
                "sub_key": "3"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Der Satz, welcher vom Komplex handelt, steht in interner Beziehung zum Satze, der von dessen Bestandteil handelt.</p><p>Der Komplex kann nur durch seine Beschreibung gegeben sein, und diese wird stimmen oder nicht stimmen. Der Satz, in welchem von einem Komplex die Rede ist, wird, wenn dieser nicht existiert, nicht unsinnig, sondern einfach falsch sein.</p><p>Dass ein Satzelement einen Komplex bezeichnet, kann man aus einer Unbestimmtheit in den S\u00e4tzen sehen, worin es vorkommt. Wir <em class=\"germph\">wissen</em>, durch diesen Satz ist noch nicht alles bestimmt. (Die Allgemeinheitsbezeichnung <em class=\"germph\">enth\u00e4lt</em> ja ein Urbild.)</p><p>Die Zusammenfassung des Symbols eines Komplexes in ein einfaches Symbol kann durch eine Definition ausgedr\u00fcckt werden.</p>",
                  "en": "<p>A proposition about a complex stands in an internal relation to a proposition about a constituent of the complex.</p><p>A complex can be given\nonly by its description, which will be right or wrong. A proposition\nthat mentions a complex will not be nonsensical, if the complex does\nnot exist, but simply false.</p><p>When a propositional element signifies a complex, this can be seen from an indeterminateness in the propositions in which it occurs. In such cases we <em>know</em> that the proposition leaves something undetermined. (In fact the notation for generality <em>contains</em> a prototype.)</p><p>The contraction of a symbol for a complex into a simple symbol can be expressed in a definition.</p>"
                },
                "empty": false,
                "key": "3.2.4",
                "sub_key": "4"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Der Satz dr\u00fcckt auf bestimmte, klar angebbare Weise aus, was er ausdr\u00fcckt: Der Satz ist artikuliert.</p>",
                      "en": "<p>What a proposition expresses it expresses in a determinate manner, which can be set out clearly: a proposition is articulated.</p>"
                    },
                    "empty": false,
                    "key": "3.2.5.1",
                    "sub_key": "1"
                  }
                ],
                "content": {
                  "de": "<p>Es gibt eine und nur eine vollst\u00e4ndige Analyse des Satzes.</p>",
                  "en": "<p>A proposition has one and only one complete analysis.</p>"
                },
                "empty": false,
                "key": "3.2.5",
                "sub_key": "5"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Jedes definierte Zeichen bezeichnet <em class=\"germph\">\u00fcber</em> jene Zeichen, durch welche es definiert wurde; und die Definitionen weisen den Weg.</p><p>Zwei Zeichen, ein Urzeichen, und ein durch Urzeichen definiertes, k\u00f6nnen nicht auf dieselbe Art und Weise bezeichnen. Namen <em class=\"germph\">kann</em> man nicht durch Definitionen auseinanderlegen. (Kein Zeichen, welches allein, selbst\u00e4ndig eine Bedeutung hat.)</p>",
                      "en": "<p>Every sign that has a definition signifies <em>via</em> the signs that serve to define it; and the definitions point the way.</p><p>Two signs cannot signify in the same manner if one is primitive and the other is defined by means of primitive signs. Names <em>cannot</em> be anatomized by means of definitions. (Nor can any sign that has a meaning independently and on its own.)</p>"
                    },
                    "empty": false,
                    "key": "3.2.6.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Was in den Zeichen nicht zum Ausdruck kommt, das zeigt ihre Anwendung. Was die Zeichen verschlucken, das spricht ihre Anwendung aus.</p>",
                      "en": "<p>What signs fail to express, their application shows. What signs slur over, their application says clearly.</p>"
                    },
                    "empty": false,
                    "key": "3.2.6.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die Bedeutung von Urzeichen k\u00f6nnen durch Erl\u00e4uterungen erkl\u00e4rt werden. Erl\u00e4uterungen sind S\u00e4tze, welche die Urzeichen enthalten. Sie k\u00f6nnen also nur verstanden werden, wenn die Bedeutungen dieser Zeichen bereits bekannt sind.</p>",
                      "en": "<p>The meanings of primitive signs can be explained by means of elucidations. Elucidations are propositions that contain the primitive signs. So they can only be understood if the meanings of those signs are already known.</p>"
                    },
                    "empty": false,
                    "key": "3.2.6.3",
                    "sub_key": "3"
                  }
                ],
                "content": {
                  "de": "<p>Der Name ist durch keine Definition weiter zu zergliedern: er ist ein Urzeichen.</p>",
                  "en": "<p>A name cannot be dissected any further by means of a definition: it is a primitive sign.</p>"
                },
                "empty": false,
                "key": "3.2.6",
                "sub_key": "6"
              }
            ],
            "content": {
              "de": "<p>Im Satze kann der Gedanke so ausgedr\u00fcckt sein, dass den Gegenst\u00e4nden des Gedankens Elemente des Satzzeichens entsprechen.</p>",
              "en": "<p>In a proposition a thought can be expressed in such a way that elements of the propositional sign correspond to the objects of the thought.</p>"
            },
            "empty": false,
            "key": "3.2",
            "sub_key": "2"
          }, {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Der Ausdruck setzt die Formen aller S\u00e4tze voraus, in welchem er vorkommen kann. Er ist das gemeinsame charakteristische Merkmal einer Klasse von S\u00e4tzen.</p>",
                      "en": "<p>An expression presupposes the forms of all the propositions in which it can occur. It is the common characteristic mark of a class of propositions.</p>"
                    },
                    "empty": false,
                    "key": "3.3.1.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Er wird also dargestellt durch die allgemeine Form der S\u00e4tze, die er charakterisiert.</p><p>Und zwar wird in dieser Form der Ausdruck <em class=\"germph\">konstant</em> und alles \u00fcbrige <em class=\"germph\">variabel</em> sein.</p>",
                      "en": "<p>It is therefore presented by means of the general form of the propositions that it characterizes.</p><p>In fact, in this form the expression will be <em>constant</em> and everything else <em>variable</em>.</p>"
                    },
                    "empty": false,
                    "key": "3.3.1.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Der Ausdruck wird also durch eine Variable dargestellt, deren Werte die S\u00e4tze sind, die den Ausdruck enthalten.</p><p>(Im Grenzfall wird die Variable zur Konstanten, der Ausdruck zum Satz.)</p><p>Ich nenne eine solche Variable \u201eSatzvariable\u201c.</p>",
                      "en": "<p>Thus an expression is presented by means of a variable whose values are the propositions that contain the expression.</p><p>(In the limiting case the variable becomes a constant, the expression becomes a proposition.)</p><p>I call such a variable a \u2018propositional variable\u2019.</p>"
                    },
                    "empty": false,
                    "key": "3.3.1.3",
                    "sub_key": "3"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Der Ausdruck hat nur im Satz Bedeutung. Jede Variable l\u00e4sst sich als Satzvariable auffassen.</p><p>(Auch der variable Name.)</p>",
                      "en": "<p>An expression has meaning only in a proposition. All variables can be construed as propositional variables.</p><p>(Even variable names.)</p>"
                    },
                    "empty": false,
                    "key": "3.3.1.4",
                    "sub_key": "4"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Verwandeln wir einen Bestandteil eines Satzes in eine Variable, so gibt es eine Klasse von S\u00e4tzen, welche s\u00e4mtlich Werte des so entstandenen variablen Satzes sind. Diese Klasse h\u00e4ngt im allgemeinen noch davon ab, was wir, nach willk\u00fcrlicher \u00dcbereinkunft, mit Teilen jenes Satzes meinen. Verwandeln wir aber alle jene Zeichen, deren Bedeutung willk\u00fcrlich bestimmt wurde, in Variable, so gibt es nun noch immer eine solche Klasse. Diese aber ist nun von keiner \u00dcbereinkunft abh\u00e4ngig, sondern nur noch von der Natur des Satzes. Sie entspricht einer logischen Form\u2014einem logischen Urbild.</p>",
                      "en": "<p>If we turn a constituent of a proposition into a variable, there is a class of propositions all of which are values of the resulting variable proposition. In general, this class too will be dependent on the meaning that our arbitrary conventions have given to parts of the original proposition. But if all the signs in it that have arbitrarily determined meanings are turned into variables, we shall still get a class of this kind. This one, however, is not dependent on any convention, but solely on the nature of the proposition. It corresponds to a logical form\u2014a logical prototype.</p>"
                    },
                    "empty": false,
                    "key": "3.3.1.5",
                    "sub_key": "5"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Welche Werte die Satzvariable annehmen darf, wird festgesetzt.</p><p>Die Festsetzung der Werte <em class=\"germph\">ist</em> die Variable.</p>",
                      "en": "<p>What values a propositional variable may take is something that is stipulated.</p><p>The stipulation of values <em>is</em> the variable.</p>"
                    },
                    "empty": false,
                    "key": "3.3.1.6",
                    "sub_key": "6"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die Festsetzung der Werte der Satzvariablen ist die <em class=\"germph\">Angabe der S\u00e4tze</em>, deren gemeinsames Merkmal die Variable ist.</p><p>Die Festsetzung ist eine Beschreibung dieser S\u00e4tze.</p><p>Die Festsetzung wird also nur von Symbolen, nicht von deren Bedeutung handeln.</p><p>Und <em class=\"germph\">nur</em> dies ist der Festsetzung wesentlich, <em class=\"germph\">dass sie nur eine Beschreibung von Symbolen ist und nicht \u00fcber das Bezeichnete aussagt</em>.</p><p>Wie die Beschreibung der S\u00e4tze geschieht, ist unwesentlich.</p>",
                      "en": "<p>To stipulate values for a propositional variable is to <em>give the propositions</em> whose common characteristic the variable is.</p><p>The stipulation is a description of those propositions.</p><p>The stipulation will therefore be concerned only with symbols, not with their meaning.</p><p>And the <em>only</em> thing essential to the stipulation is <em>that it is merely a description of symbols and states nothing about what is signified</em>.</p><p>How the description of the propositions is produced is not essential.</p>"
                    },
                    "empty": false,
                    "key": "3.3.1.7",
                    "sub_key": "7"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Den Satz fasse ich\u2014wie Frege und Russell\u2014als Funktion der in ihm enthaltenen Ausdr\u00fccke auf.</p>",
                      "en": "<p>Like Frege and Russell I construe a proposition as a function of the expressions contained in it.</p>"
                    },
                    "empty": false,
                    "key": "3.3.1.8",
                    "sub_key": "8"
                  }
                ],
                "content": {
                  "de": "<p>Jeden Teil des Satzes, der seinen Sinn charakterisiert, nenne ich einen Ausdruck (ein Symbol).</p><p>(Der Satz selbst ist ein Ausdruck.)</p><p>Ausdruck ist alles, f\u00fcr den Sinn des Satzes wesentliche, was S\u00e4tze miteinander gemein haben k\u00f6nnen.</p><p>Der Ausdruck kennzeichnet eine Form und einen Inhalt.</p>",
                  "en": "<p>I call any part of a proposition that characterizes its sense an expression (or a symbol).</p><p>(A proposition is itself an expression.)</p><p>Everything essential to their sense that propositions can have in common with one another is an expression.</p><p>An expression is the mark of a form and a content.</p>"
                },
                "empty": false,
                "key": "3.3.1",
                "sub_key": "1"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Zwei verschiedene Symbole k\u00f6nnen also das Zeichen (Schriftzeichen oder Lautzeichen etc.) miteinander gemein haben\u2014sie bezeichnen dann auf verschiedene Art und Weise.</p>",
                      "en": "<p>So one and the same sign (written or spoken, etc.) can be common to two different symbols\u2014in which case they will signify in different ways.</p>"
                    },
                    "empty": false,
                    "key": "3.3.2.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Es kann nie das gemeinsame Merkmal zweier Gegenst\u00e4nde anzeigen, dass wir sie mit demselben Zeichen, aber durch zwei verschiedene <em class=\"germph\">Bezeichnungsweisen</em> bezeichnen. Denn das Zeichen ist ja willk\u00fcrlich. Man k\u00f6nnte also auch zwei verschiedene Zeichen w\u00e4hlen, und wo bliebe dann das Gemeinsame in der Bezeichnung?</p>",
                      "en": "<p>Our use of the same sign to signify two different objects can never indicate a common characteristic of the two, if we use it with two different <em>modes of signification</em>. For the sign, of course, is arbitrary. So we could choose two different signs instead, and then what would be left in common on the signifying side?</p>"
                    },
                    "empty": false,
                    "key": "3.3.2.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>In der Umgangssprache kommt es ungemein h\u00e4ufig vor, dass dasselbe Wort auf verschiedene Art und Weise bezeichnet\u2014also verschiedene Symbolen angeh\u00f6rt\u2014, oder, dass zwei W\u00f6rter, die auf verschiedene Art und Weise bezeichnen, \u00e4u\u00dferlich in der gleichen Weise im Satz angewandt werden.</p><p>So erscheint das Wort \u201eist\u201c als Kopula, als Gleichheitszeichen und als Ausdruck der Existenz; \u201eexistieren\u201c als intransitives Zeitwort wie \u201egehen\u201c; \u201eidentisch\u201c als Eigenschaftswort; wir reden von <em class=\"germph\">Etwas</em>, aber auch davon, dass <em class=\"germph\">etwas</em> geschieht.</p><p>(Im Satze \u201eGr\u00fcn ist gr\u00fcn\u201c\u2014wo das erste Wort ein Personenname, das letzte ein Eigenschaftswort ist\u2014haben diese Worte nicht einfach verschiedene Bedeutung, sondern es sind <em class=\"germph\">verschiedene Symbole</em>.)</p>",
                      "en": "<p>In everyday language it very frequently happens that the same word has different modes of signification\u2014and so belongs to different symbols\u2014or that two words that have different modes of signification are employed in propositions in what is superficially the same way.</p><p>Thus the word \u2018is\u2019 figures as the copula, as a sign for identity, and as an expression for existence; \u2018exist\u2019 figures as an intransitive verb like \u2018go\u2019, and \u2018identical\u2019 as an adjective; we speak of <em>something</em>, but also of <em>something\u2019s</em> happening.</p><p>(In the proposition, \u2018Green is green\u2019\u2014where the first word is the proper name of a person and the last an adjective\u2014these words do not merely have different meanings: they are <em>different symbols</em>.)</p>"
                    },
                    "empty": false,
                    "key": "3.3.2.3",
                    "sub_key": "3"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>So entstehen leicht die fundamentalsten Verwechselungen (deren die ganze Philosophie voll ist).</p>",
                      "en": "<p>In this way the most fundamental confusions are easily produced (the whole of philosophy is full of them).</p>"
                    },
                    "empty": false,
                    "key": "3.3.2.4",
                    "sub_key": "4"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Um diesen Irrt\u00fcmern zu entgehen, m\u00fcssen wir eine Zeichensprache verwenden, welche sie ausschlie\u00dft, indem sie nicht das gleiche Zeichen in verschiednen Symbolen, und Zeichen, welche auf verschiedene Art bezeichnen, nicht \u00e4u\u00dferlich auf die gleiche Art verwendet. Eine Zeichensprache also, die der <em class=\"germph\">logischen</em> Grammatik\u2014der logischen Syntax\u2014gehorcht.</p><p>(Die Begriffsschrift Freges und Russells ist eine solche Sprache, die allerdings noch nicht alle Fehler ausschlie\u00dft.)</p>",
                      "en": "<p>In order to avoid such errors we must make use of a sign-language that excludes them by not using the same sign for different symbols and by not using in a superficially similar way signs that have different modes of signification: that is to say, a sign-language that is governed by <em>logical</em> grammar\u2014by logical syntax.</p><p>(The conceptual notation of Frege and Russell is such a language, though, it is true, it fails to exclude all mistakes.)</p>"
                    },
                    "empty": false,
                    "key": "3.3.2.5",
                    "sub_key": "5"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Um das Symbol am Zeichen zu erkennen, muss man auf den sinnvollen Gebrauch achten.</p>",
                      "en": "<p>In order to recognize a symbol by its sign we must observe how it is used with a sense.</p>"
                    },
                    "empty": false,
                    "key": "3.3.2.6",
                    "sub_key": "6"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Das Zeichen bestimmt erst mit seiner logisch-syntaktischen Verwendung zusammen eine logische Form.</p>",
                      "en": "<p>A sign does not determine a logical form unless it is taken together with its logico-syntactical employment.</p>"
                    },
                    "empty": false,
                    "key": "3.3.2.7",
                    "sub_key": "7"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Wird ein Zeichen <em class=\"germph\">nicht gebraucht</em>, so ist es bedeutungslos. Das ist der Sinn der Devise Occams.</p><p>(Wenn sich alles so verh\u00e4lt als h\u00e4tte ein Zeichen Bedeutung, dann hat es auch Bedeutung.)</p>",
                      "en": "<p>If a sign is <em>useless</em>, it is meaningless. That is the point of Occam\u2019s maxim.</p><p>(If everything behaves as if a sign had meaning, then it does have meaning.)</p>"
                    },
                    "empty": false,
                    "key": "3.3.2.8",
                    "sub_key": "8"
                  }
                ],
                "content": {
                  "de": "<p>Das Zeichen ist das sinnlich Wahrnehmbare am Symbol.</p>",
                  "en": "<p>A sign is what can be perceived of a symbol.</p>"
                },
                "empty": false,
                "key": "3.3.2",
                "sub_key": "2"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Von dieser Bemerkung sehen wir in Russells \u201eTheory of types\u201c hin\u00fcber: Der Irrtum Russells zeigt sich darin, dass er bei der Aufstellung der Zeichenregeln von der Bedeutung der Zeichen reden musste.</p>",
                      "en": "<p>From this observation we turn to Russell\u2019s \u2018theory of types\u2019. It can be seen that Russell must be wrong, because he had to mention the meaning of signs when establishing the rules for them.</p>"
                    },
                    "empty": false,
                    "key": "3.3.3.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Kein Satz kann etwas \u00fcber sich selbst aussagen, weil das Satzzeichen nicht in sich selbst enthalten sein kann (das ist die ganze \u201eTheory of types\u201c).</p>",
                      "en": "<p>No proposition can make a statement about itself, because a propositional sign cannot be contained in itself (that is the whole of the \u2018theory of types\u2019).</p>"
                    },
                    "empty": false,
                    "key": "3.3.3.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Eine Funktion kann darum nicht ihr eigenes Argument sein, weil das Funktionszeichen bereits das Urbild seines Arguments enth\u00e4lt und es sich nicht selbst enthalten kann.</p><p>Nehmen wir n\u00e4mlich an, die Funktion <var class=\"pushvar\">F</var>(<var>fx</var>) k\u00f6nnte ihr eigenes Argument sein; dann g\u00e4be es also einen Satz: \u201e<var class=\"pushvar\">F</var>(<var class=\"pushvar\">F</var>(<var>fx</var>))\u201c und in diesem m\u00fcssen die \u00e4u\u00dfere Funktion <var>F</var> und die innere Funtion <var>F</var> verschiedene Bedeutungen haben, denn die innere hat die Form <var>\u03d5</var>(<var>fx</var>), die \u00e4u\u00dfere die Form <var>\u03c8</var>(<var>\u03d5</var>(<var>fx</var>)). Gemeinsam ist den beiden Funktionen nur der Buchstabe \u201e<var>F</var>\u201c, der aber allein nichts bezeichnet.</p><p>Dies wird sofort klar, wenn wir statt \u201e<var class=\"pushvar\">F</var>(<var>F</var><var>u</var>)\u201c schreiben \u201e<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>\u03d5</var>):</span><var class=\"pushvar\">F</var>(<var>\u03d5u</var>)<span class=\"mathrel\">.</span><var>\u03d5u</var><span class=\"mathrel\">=</span><var>Fu</var>\u201c.</p><p>Hiermit erledigt sich Russells Paradox.</p>",
                      "en": "<p>The reason why a function cannot be its own argument is that the sign for a function already contains the prototype of its argument, and it cannot contain itself.</p><p>For let us suppose that the function <var class=\"pushvar\">F</var>(<var>fx</var>) could be its own argument: in that case there would be a proposition \u2018<var class=\"pushvar\">F</var>(<var class=\"pushvar\">F</var>(<var>fx</var>))\u2019, in which the outer function <var>F</var> and the inner function <var>F</var> must have different meanings, since the inner one has the form <var>\u03d5</var>(<var>fx</var>) and the outer one has the form <var>\u03c8</var>(<var>\u03d5</var>(<var>fx</var>)). Only the letter \u2018<var>F</var>\u2019 is common to the two functions, but the letter by itself signifies nothing.</p><p>This immediately becomes clear if instead of \u2018<var class=\"pushvar\">F</var>(<var>F</var><var>u</var>)\u2019 we write \u2018<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>\u03d5</var>):</span><var class=\"pushvar\">F</var>(<var>\u03d5u</var>)<span class=\"mathrel\">.</span><var>\u03d5u</var><span class=\"mathrel\">=</span><var>Fu</var>\u2019.</p><p>That disposes of Russell\u2019s paradox.</p>"
                    },
                    "empty": false,
                    "key": "3.3.3.3",
                    "sub_key": "3"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die Regeln der logischen Syntax m\u00fcssen sich von selbst verstehen, wenn man nur wei\u00df, wie ein jedes Zeichen bezeichnet.</p>",
                      "en": "<p>The rules of logical syntax must go without saying, once we know how each individual sign signifies.</p>"
                    },
                    "empty": false,
                    "key": "3.3.3.4",
                    "sub_key": "4"
                  }
                ],
                "content": {
                  "de": "<p>In der logischen Syntax darf nie die Bedeutung eines Zeichens eine Rolle spielen; sie muss sich aufstellen lassen, ohne dass dabei von der <em class=\"germph\">Bedeutung</em> eines Zeichens die Rede w\u00e4re, sie darf <em class=\"germph\">nur</em> die Beschreibung der Ausdr\u00fccke voraussetzen.</p>",
                  "en": "<p>In logical syntax the meaning of a sign should never play a role. It must be possible to establish logical syntax without mentioning the <em>meaning</em> of a sign: <em>only</em> the description of expressions may be presupposed.</p>"
                },
                "empty": false,
                "key": "3.3.3",
                "sub_key": "3"
              }, {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Man k\u00f6nnte also sagen: Der eigentliche Name ist das, was alle Symbole, die den Gegenstand bezeichnen, gemeinsam haben. Es w\u00fcrde sich so successive ergeben, dass keinerlei Zusammensetzung f\u00fcr den Namen wesentlich ist.</p>",
                          "en": "<p>So one could say that the real name of an object was what all symbols that signified it had in common. Thus, one by one, all kinds of composition would prove to be unessential to a name.</p>"
                        },
                        "empty": false,
                        "key": "3.3.4.1.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Das Wesentliche am Satz ist also das, was allen S\u00e4tzen, welche den gleichen Sinn ausdr\u00fccken k\u00f6nnen, gemeinsam ist.</p><p>Und ebenso ist allgemein das Wesentliche am Symbol das, was alle Symbole, die denselben Zweck erf\u00fcllen k\u00f6nnen, gemeinsam haben.</p>",
                      "en": "<p>So what is essential in a proposition is what all propositions that can express the same sense have in common.</p><p>And similarly, in general, what is essential in a symbol is what all symbols that can serve the same purpose have in common.</p>"
                    },
                    "empty": false,
                    "key": "3.3.4.1",
                    "sub_key": "1"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Eine besondere Bezeichnungsweise mag unwichtig sein, aber wichtig ist es immer, dass diese eine <em class=\"germph\">m\u00f6gliche</em> Bezeichnungsweise ist. Und so verh\u00e4lt es sich in der Philosophie \u00fcberhaupt: Das Einzelne erweist sich immer wieder als unwichtig, aber die M\u00f6glichkeit jedes Einzelnen gibt uns einen Aufschluss \u00fcber das Wesen der Welt.</p>",
                          "en": "<p>A particular mode of signifying may be unimportant but it is always important that it is a <em>possible</em> mode of signifying. And that is generally so in philosophy: again and again the individual case turns out to be unimportant, but the possibility of each individual case discloses something about the essence of the world.</p>"
                        },
                        "empty": false,
                        "key": "3.3.4.2.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>An unseren Notationen ist zwar etwas willk\u00fcrlich, aber <em class=\"germph\">das</em> ist nicht willk\u00fcrlich: Dass, <em class=\"germph\">wenn</em> wir etwas willk\u00fcrlich bestimmt haben, dann etwas anderes der Fall sein muss. (Dies h\u00e4ngt von dem <em class=\"germph\">Wesen</em> der Notation ab.)</p>",
                      "en": "<p>Although there is something arbitrary in our notations, <em>this much</em> is not arbitrary\u2014that <em>when</em> we have determined one thing arbitrarily, something else is necessarily the case. (This derives from the <em>essence</em> of notation.)</p>"
                    },
                    "empty": false,
                    "key": "3.3.4.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Definitionen sind Regeln der \u00dcbersetzung von einer Sprache in eine andere. Jede richtige Zeichensprache muss sich in jede andere nach solchen Regeln \u00fcbersetzen lassen: <em class=\"germph\">Dies</em> ist, was sie alle gemeinsam haben.</p>",
                      "en": "<p>Definitions are rules for translating from one language into another. Any correct sign-language must be translatable into any other in accordance with such rules: it is <em>this</em> that they all have in common.</p>"
                    },
                    "empty": false,
                    "key": "3.3.4.3",
                    "sub_key": "3"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Man kann z. B. das Gemeinsame aller Notationen f\u00fcr die Wahrheitsfunktionen so ausdr\u00fccken: Es ist ihnen gemeinsam, dass sich alle\u2014z. B.\u2014durch die Notation von \u201e<span class=\"mathop\">~</span><var>p</var>\u201c (\u201enicht <var>p</var>\u201c) und \u201e<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><var>q</var>\u201c (\u201e<var>p</var> oder <var>q</var>\u201c) <em class=\"germph\">ersetzen lassen</em>.</p><p>(Hiermit ist die Art und Weise gekennzeichnet, wie eine spezielle m\u00f6gliche Notation uns allgemeine Aufschl\u00fcsse geben kann.)</p>",
                          "en": "<p>For instance, we can express what is common to all notations for truth-functions in the following way: they have in common that, for example, the notation that uses \u2018<span class=\"mathop\">~</span><var>p</var>\u2019 (\u2018not <var>p</var>\u2019) and \u2018<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><var>q</var>\u2019 (\u2018<var>p</var> or <var>q</var>\u2019) <em>can be substituted</em> for any of them.</p><p>(This serves to characterize the way in which something general can be disclosed by the possibility of a specific notation.)</p>"
                        },
                        "empty": false,
                        "key": "3.3.4.4.1",
                        "sub_key": "1"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Das Zeichen des Komplexes l\u00f6st sich auch bei der Analyse nicht willk\u00fcrlich auf, so dass etwa seine Aufl\u00f6sung in jedem Satzgef\u00fcge eine andere w\u00e4re.</p>",
                          "en": "<p>Nor does analysis resolve the sign for a complex in an arbitrary way, so that it would have a different resolution every time that it was incorporated in a different proposition.</p>"
                        },
                        "empty": false,
                        "key": "3.3.4.4.2",
                        "sub_key": "2"
                      }
                    ],
                    "content": {
                      "de": "<p>Das, was am Symbol bezeichnet, ist das Gemeinsame aller jener Symbole, durch die das erste den Regeln der logischen Syntax zufolge ersetzt werden kann.</p>",
                      "en": "<p>What signifies in a symbol is what is common to all the symbols that the rules of logical syntax allow us to substitute for it.</p>"
                    },
                    "empty": false,
                    "key": "3.3.4.4",
                    "sub_key": "4"
                  }
                ],
                "content": {
                  "de": "<p>Der Satz besitzt wesentliche und zuf\u00e4llige Z\u00fcge.</p><p>Zuf\u00e4llig sind die Z\u00fcge, die von der besonderen Art der Hervorbringung des Satzzeichens herr\u00fchren. Wesentlich diejenigen, welche allein den Satz bef\u00e4higen, seinen Sinn auszudr\u00fccken.</p>",
                  "en": "<p>A proposition possesses essential and accidental features.</p><p>Accidental features are those that result from the particular way in which the propositional sign is produced. Essential features are those without which the proposition could not express its sense.</p>"
                },
                "empty": false,
                "key": "3.3.4",
                "sub_key": "4"
              }
            ],
            "content": {
              "de": "<p>Nur der Satz hat Sinn; nur im Zusammenhang des Satzes hat ein Name Bedeutung.</p>",
              "en": "<p>Only propositions have sense; only in the nexus of a proposition does a name have meaning.</p>"
            },
            "empty": false,
            "key": "3.3",
            "sub_key": "3"
          }, {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Der geometrische und der logische Ort stimmen darin \u00fcberein, dass beide die M\u00f6glichkeit einer Existenz sind.</p>",
                      "en": "<p>In geometry and logic alike a place is a possibility: something can exist in it.</p>"
                    },
                    "empty": false,
                    "key": "3.4.1.1",
                    "sub_key": "1"
                  }
                ],
                "content": {
                  "de": "<p>Das Satzzeichen und die logischen Koordinaten: Das ist der logische Ort.</p>",
                  "en": "<p>The propositional sign with logical co-ordinates\u2014that is the logical place.</p>"
                },
                "empty": false,
                "key": "3.4.1",
                "sub_key": "1"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Obwohl der Satz nur einen Ort des logischen Raumes bestimmen darf, so muss doch durch ihn schon der ganze logische Raum gegeben sein.</p><p>(Sonst w\u00fcrden durch die Verneinung, die logische Summe, das logische Produkt, etc. immer neue Elemente\u2014in Koordinaten\u2014eingef\u00fchrt.)</p><p>(Das logische Ger\u00fcst um das Bild herum bestimmt den logischen Raum. Der Satz durchgreift den ganzen logischen Raum.)</p>",
                  "en": "<p>A proposition can determine only one place in logical space: nevertheless the whole of logical space must already be given by it.</p><p>(Otherwise negation, logical sum, logical product, etc., would introduce more and more new elements\u2014in co-ordination.)</p><p>(The logical scaffolding surrounding a picture determines logical space. The force of a proposition reaches through the whole of logical space.)</p>"
                },
                "empty": false,
                "key": "3.4.2",
                "sub_key": "2"
              }
            ],
            "content": {
              "de": "<p>Der Satz bestimmt einen Ort im logischen Raum. Die Existenz dieses logischen Ortes ist durch die Existenz der Bestandteile allein verb\u00fcrgt, durch die Existenz des sinnvollen Satzes.</p>",
              "en": "<p>A proposition determines a place in logical space. The existence of this logical place is guaranteed by the mere existence of the constituents\u2014by the existence of the proposition with a sense.</p>"
            },
            "empty": false,
            "key": "3.4",
            "sub_key": "4"
          }, {
            "children": [],
            "content": {
              "de": "<p>Das angewandte, gedachte Satzeichen ist der Gedanke.</p>",
              "en": "<p>A propositional sign, applied and thought out, is a thought.</p>"
            },
            "empty": false,
            "key": "3.5",
            "sub_key": "5"
          }
        ],
        "content": {
          "de": "<p>Das logische Bild der Tatsachen ist der Gedanke.</p>",
          "en": "<p>A logical picture of facts is a thought.</p>"
        },
        "empty": false,
        "key": "3",
        "sub_key": "3"
      }, {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Die Gesamtheit der S\u00e4tze ist die Sprache.</p>",
                      "en": "<p>The totality of propositions is language.</p>"
                    },
                    "empty": false,
                    "key": "4.0.0.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Der Mensch besitzt die F\u00e4higkeit Sprachen zu bauen, womit sich jeder Sinn ausdr\u00fccken l\u00e4sst, ohne eine Ahnung davon zu haben, wie und was jedes Wort bedeutet.\u2014Wie man auch spricht, ohne zu wissen, wie die einzelnen Laute hervorgebracht werden.</p><p>Die Umgangssprache ist ein Teil des menschlichen Organismus und nicht weniger kompliziert als dieser.</p><p>Es ist menschenunm\u00f6glich, die Sprachlogik aus ihr unmittelbar zu entnehmen.</p><p>Die Sprache verkleidet den Gedanken. Und zwar so, dass man nach der \u00e4u\u00dferen Form des Kleides, nicht auf deie Form des bekleideten Gedankens schlie\u00dfen kann; weil die \u00e4u\u00dfere Form des Kleides nach ganz anderen Zwecken gebildet ist als danach, die Form des K\u00f6rpers erkennen zu lassen.</p><p>Die stillschweigenden Abmachungen zum Verst\u00e4ndnis der Umgangssprache sind enorm kompliziert.</p>",
                      "en": "<p>Man possesses the ability to construct languages capable of expressing every sense, without having any idea how each word has meaning or what its meaning is\u2014just as people speak without knowing how the individual sounds are produced.</p><p>Everyday language is a part of the human organism and is no less complicated than it.</p><p>It is not humanly possible to gather immediately from it what the logic of language is.</p><p>Language disguises thought. So much so, that from the outward form of the clothing it is impossible to infer the form of the thought beneath it, because the outward form of the clothing is not designed to reveal the form of the body, but for entirely different purposes.</p><p>The tacit conventions on which the understanding of everyday language depends are enormously complicated.</p>"
                    },
                    "empty": false,
                    "key": "4.0.0.2",
                    "sub_key": "2"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Alle Philosophie ist \u201eSprachkritik\u201c. (Allerdings nicht im Sinne Mauthners.) Russells Verdienst ist es, gezeigt zu haben, dass die scheinbar logische Form des Satzes nicht seine wirkliche sein muss.</p>",
                          "en": "<p>All philosophy is a \u2018critique of language\u2019 (though not in Mauthner\u2019s sense). It was Russell who performed the service of showing that the apparent logical form of a proposition need not be its real one.</p>"
                        },
                        "empty": false,
                        "key": "4.0.0.3.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Die meisten S\u00e4tze und Fragen, welche \u00fcber philosophische Dinge geschrieben worden sind, sind nicht falsch, sondern unsinnig. Wir k\u00f6nnen daher Fragen dieser Art \u00fcberhaupt nicht beantworten, sondern nur ihre Unsinnigkeit feststellen. Die meisten Fragen und S\u00e4tze der Philosophen beruhen darauf, dass wir unsere Sprachlogik nicht verstehen.</p><p>(Sie sind von der Art der Frage, ob das Gute mehr oder weniger identisch sei als das Sch\u00f6ne.)</p><p>Und es ist nicht verwunderlich, dass die tiefsten Probleme eigentlich <em class=\"germph\">keine</em> Probleme sind.</p>",
                      "en": "<p>Most of the propositions and questions to be found in philosophical works are not false but nonsensical. Consequently we cannot give any answer to questions of this kind, but can only point out that they are nonsensical. Most of the propositions and questions of philosophers arise from our failure to understand the logic of our language.</p><p>(They belong to the same class as the question whether the good is more or less identical than the beautiful.)</p><p>And it is not surprising that the deepest problems are in fact <em>not</em> problems at all.</p>"
                    },
                    "empty": false,
                    "key": "4.0.0.3",
                    "sub_key": "3"
                  }
                ],
                "content": {},
                "empty": true,
                "key": "4.0.0",
                "sub_key": "0"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Auf den ersten Blick scheint der Satz\u2014wie er etwa auf dem Papier gedruckt steht\u2014kein Bild der Wirklichkeit zu sein, von der er handelt. Aber auch die Notenschrift scheint auf den ersten Blick kein Bild der Musik zu sein, und unsere Lautzeichen-(Buchstaben-)Schrift kein Bild unserer Lautsprache.</p><p>Und doch erweisen sich diese Zeichensprachen auch im gew\u00f6hnlichen Sinne als Bilder dessen, was sie darstellen.</p>",
                      "en": "<p>At first sight a proposition\u2014one set out on the printed page, for example\u2014does not seem to be a picture of the reality with which it is concerned. But neither do written notes seem at first sight to be a picture of a piece of music, nor our phonetic notation (the alphabet) to be a picture of our speech.</p><p>And yet these sign-languages prove to be pictures, even in the ordinary sense, of what they represent.</p>"
                    },
                    "empty": false,
                    "key": "4.0.1.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Offenbar ist, dass wir einen Satz von der Form \u201e<var>aRb</var>\u201c als Bild empfinden. Hier ist das Zeichen offenbar ein Gleichnis des Bezeichneten.</p>",
                      "en": "<p>It is obvious that a proposition of the form \u2018<var>aRb</var>\u2019 strikes us as a picture. In this case the sign is obviously a likeness of what is signified.</p>"
                    },
                    "empty": false,
                    "key": "4.0.1.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Und wenn wir in das Wesentliche dieser Bildhaftigkeit eindringen, so sehen wir, dass dieselbe durch <em class=\"germph\">scheinbare Unregelm\u00e4\u00dfigkeiten</em> (wie die Verwendung von \u266f und <span class=\"symbol\">\u266d</span> in der Notenschrift) <em class=\"germph\">nicht</em> gest\u00f6rt wird.</p><p>Denn auch diese Unregelm\u00e4\u00dfigkeiten bilden das ab, was sie ausdr\u00fccken sollen; nur auf eine andere Art und Weise.</p>",
                      "en": "<p>And if we penetrate to the essence of this pictorial character, we see that it is <em>not</em> impaired by <em>apparent irregularities</em> (such as the use of \u266f and <span class=\"symbol\">\u266d</span> in musical notation).</p><p>For even these irregularities depict what they are intended to express; only they do it in a different way.</p>"
                    },
                    "empty": false,
                    "key": "4.0.1.3",
                    "sub_key": "3"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Dass es eine allgemeine Regel gibt, durch die der Musiker aus der Partitur die Symphonie entnehmen kann, durch welche man aus der Linie auf der Grammophonplatte die Symphonie und nach der ersten Regel wieder die Partitur ableiten kann, darin besteht eben die innere \u00c4hnlichkeit dieser scheinbar so ganz verschiedenen Gebilde. Und jene Regel ist das Gesetz der Projektion, welches die Symphonie in die Notensprache projiziert. Sie ist die Regel der \u00dcbersetzung der Notensprache in die Sprache der Grammophonplatte.</p>",
                          "en": "<p>There is a general rule by means of which the musician can obtain the symphony from the score, and which makes it possible to derive the symphony from the groove on the gramophone record, and, using the first rule, to derive the score again. That is what constitutes the inner similarity between these things which seem to be constructed in such entirely different ways. And that rule is the law of projection which projects the symphony into the language of musical notation. It is the rule for translating this language into the language of gramophone records.</p>"
                        },
                        "empty": false,
                        "key": "4.0.1.4.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Die Grammophonplatte, der musikalische Gedanke, die Notenschrift, die Schallwellen, stehen alle in jener abbildenden internen Beziehung zu einander, die zwischen Sprache und Welt besteht.</p><p>Ihnen allen ist der logische Bau gemeinsam.</p><p>(Wie im M\u00e4rchen die zwei J\u00fcnglinge, ihre zwei Pferde und ihre Lilien. Sie sind alle in gewissem Sinne Eins.)</p>",
                      "en": "<p>A gramophone record, the musical idea, the written notes, and the sound-waves, all stand to one another in the same internal relation of depicting that holds between language and the world. </p><p>They are all constructed according to a common logical pattern.</p><p>(Like the two youths in the fairy-tale, their two horses, and their lilies. They are all in a certain sense one.)</p>"
                    },
                    "empty": false,
                    "key": "4.0.1.4",
                    "sub_key": "4"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die M\u00f6glichkeit aller Gleichnisse, der ganzen Bildhaftigkeit unserer Ausdrucksweise, ruht in der Logik der Abbildung.</p>",
                      "en": "<p>The possibility of all imagery, of all our pictorial modes of expression, is contained in the logic of depiction.</p>"
                    },
                    "empty": false,
                    "key": "4.0.1.5",
                    "sub_key": "5"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Um das Wesen des Satzes zu verstehen, denken wir an die Hieroglyphenschrift, welche die Tatsachen die sie beschreibt abbildet.</p><p>Und aus ihr wurde die Buchstabenschrift, ohne das Wesentliche der Abbildung zu verlieren.</p>",
                      "en": "<p>In order to understand the essential nature of a proposition, we should consider hieroglyphic script, which depicts the facts that it describes.</p><p>And alphabetic script developed out of it without losing what was essential to depiction.</p>"
                    },
                    "empty": false,
                    "key": "4.0.1.6",
                    "sub_key": "6"
                  }
                ],
                "content": {
                  "de": "<p>Der Satz ist ein Bild der Wirklichkeit.</p><p>Der Satz ist ein Modell der Wirklichkeit, so wie wir sie uns denken.</p>",
                  "en": "<p>A proposition is a picture of reality.</p><p>A proposition is a model of reality as we imagine it.</p>"
                },
                "empty": false,
                "key": "4.0.1",
                "sub_key": "1"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Der Satz ist ein Bild der Wirklichkeit: Denn ich kenne die von ihm dargestelle Sachlage, wenn ich den Satz verstehe. Und den Satz verstehe ich, ohne dass mir sein Sinn erkl\u00e4rt wurde.</p>",
                      "en": "<p>A proposition is a picture of reality: for if I understand a proposition, I know the situation that it represents. And I understand the proposition without having had its sense explained to me.</p>"
                    },
                    "empty": false,
                    "key": "4.0.2.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Der Satz <em class=\"germph\">zeigt</em> seinen Sinn.</p><p>Der Satz <em class=\"germph\">zeigt</em>, wie es sich verh\u00e4lt, <em class=\"germph\">wenn</em> er wahr ist. Und er <em class=\"germph\">sagt</em>, <em class=\"germph\">dass</em> es sich so verh\u00e4lt.</p>",
                      "en": "<p>A proposition <em>shows</em> its sense.</p><p>A proposition <em>shows</em> how things stand <em>if</em> it is true. And it <em>says that</em> they do so stand.</p>"
                    },
                    "empty": false,
                    "key": "4.0.2.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die Wirklichkeit muss durch den Satz auf ja oder nein fixiert sein.</p><p>Dazu muss sie durch ihn vollst\u00e4ndig beschrieben werden.</p><p>Der Satz ist die Beschreibung eines Sachverhaltes.</p><p>Wie die Beschreibung einen Gegenstand nach seinen externen Eigenschaften, so beschreibt der Satz die Wirklichkeit nach ihren internen Eigenschaften.</p><p>Der Satz konstruiert eine Welt mit Hilfe eines logischen Ger\u00fcstes und darum kann man am Satz auch sehen, wie sich alles Logische verh\u00e4lt, <em class=\"germph\">wenn</em> er wahr ist. Man kann aus einem falschen Satz <em class=\"germph\">Schl\u00fcsse ziehen</em>.</p>",
                      "en": "<p>A proposition must restrict reality to two alternatives: yes or no.</p><p>In order to do that, it must describe reality completely.</p><p>A proposition is a description of a state of affairs.</p><p>Just as a description of an object describes it by giving its external properties, so a proposition describes reality by its internal properties.</p><p>A proposition constructs a world with the help of a logical scaffolding, so that one can actually see from the proposition how everything stands logically <em>if</em> it is true. One can <em>draw inferences</em> from a false proposition.</p>"
                    },
                    "empty": false,
                    "key": "4.0.2.3",
                    "sub_key": "3"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Einen Satz verstehen, hei\u00dft, wissen was der Fall ist, wenn er wahr ist.</p><p>(Man kann ihn also verstehen, ohne zu wissen, ob er wahr ist.)</p><p>Man versteht ihn, wenn man seine Bestandteile versteht.</p>",
                      "en": "<p>To understand a proposition means to know what is the case if it is true.</p><p>(One can understand it, therefore, without knowing whether it is true.)</p><p>It is understood by anyone who understands its constituents.</p>"
                    },
                    "empty": false,
                    "key": "4.0.2.4",
                    "sub_key": "4"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die \u00dcbersetzung einer Sprache in eine andere geht nicht so vor sich, dass man jeden <em class=\"germph\">Satz</em> der einen in einen <em class=\"germph\">Satz</em> der anderen \u00fcbersetzt, sondern nur die Satzbestandteile werden \u00fcbersetzt.</p><p>(Und das W\u00f6rterbuch \u00fcbersetzt nicht nur Substantiva, sondern auch Zeit-, Eigenschafts- und Bindew\u00f6rter etc.; und es behandelt sie alle gleich.)</p>",
                      "en": "<p>When translating one language into another, we do not proceed by translating each <em>proposition</em> of the one into a <em>proposition</em> of the other, but merely by translating the constituents of propositions.</p><p>(And the dictionary translates not only substantives, but also verbs, adjectives, and conjunctions, etc.; and it treats them all in the same way.)</p>"
                    },
                    "empty": false,
                    "key": "4.0.2.5",
                    "sub_key": "5"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die Bedeutung der einfachen Zeichen (der W\u00f6rter) m\u00fcssen uns erkl\u00e4rt werden, dass wir sie verstehen.</p><p>Mit den S\u00e4tzen aber verst\u00e4ndigen wir uns.</p>",
                      "en": "<p>The meanings of simple signs (words) must be explained to us if we are to understand them.</p><p>With propositions, however, we make ourselves understood.</p>"
                    },
                    "empty": false,
                    "key": "4.0.2.6",
                    "sub_key": "6"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Es liegt im Wesen des Satzes, dass er uns einen <em class=\"germph\">neuen</em> Sinn mitteilen kann.</p>",
                      "en": "<p>It belongs to the essence of a proposition that it should be able to communicate a <em>new</em> sense to us.</p>"
                    },
                    "empty": false,
                    "key": "4.0.2.7",
                    "sub_key": "7"
                  }
                ],
                "content": {
                  "de": "<p>Dies sehen wir daraus, dass wir den Sinn des Satzzeichens verstehen, ohne dass er uns erkl\u00e4rt wurde.</p>",
                  "en": "<p>We can see this from the fact that we understand the sense of a propositional sign without its having been explained to us.</p>"
                },
                "empty": false,
                "key": "4.0.2",
                "sub_key": "2"
              }, {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Ein Name steht f\u00fcr ein Ding, ein anderer f\u00fcr ein anderes Ding und untereinander sind sie verbunden, so stellt das Ganze\u2014wie ein lebendes Bild\u2014den Sachverhalt vor.</p>",
                          "en": "<p>One name stands for one thing, another for another thing, and they are combined with one another. In this way the whole group\u2014like a <em>tableau vivant</em>\u2014presents a state of affairs.</p>"
                        },
                        "empty": false,
                        "key": "4.0.3.1.1",
                        "sub_key": "1"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Die M\u00f6glichkeit des Satzes beruht auf dem Prinzip der Vertretung von Gegenst\u00e4nden durch Zeichen.</p><p>Mein Grundgedanke ist, dass die \u201elogischen Konstanten\u201c nicht vertreten. Dass sich die <em class=\"germph\">Logik</em> der Tatsachen nicht vertreten l\u00e4sst.</p>",
                          "en": "<p>The possibility of propositions is based on the principle that objects have signs as their representatives.</p><p>My fundamental idea is that the \u2018logical constants\u2019 are not representatives; that there can be no representatives of the <em>logic</em> of facts.</p>"
                        },
                        "empty": false,
                        "key": "4.0.3.1.2",
                        "sub_key": "2"
                      }
                    ],
                    "content": {
                      "de": "<p>Im Satz wird gleichsam eine Sachlage probeweise zusammengestellt.</p><p>Man kann geradezu sagen: statt, dieser Satz hat diesen und diesen Sinn; dieser Satz stellt diese und diese Sachlage dar.</p>",
                      "en": "<p>In a proposition a situation is, as it were, constructed by way of experiment.</p><p>Instead of, \u2018This proposition has such and such a sense\u2019, we can simply say, \u2018This proposition represents such and such a situation\u2019.</p>"
                    },
                    "empty": false,
                    "key": "4.0.3.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Nur insoweit ist der Satz ein Bild der Sachlage, als er logisch gegliedert ist.</p><p>(Auch der Satz: \u201eambulo\u201c, ist zusammengesetzt, denn sein Stamm ergibt mit einer anderen Endung, und seine Endung mit einem anderen Stamm, einen anderen Sinn.)</p>",
                      "en": "<p>It is only in so far as a proposition is logically articulated that it is a picture of a situation.</p><p>(Even the proposition, <em>Ambulo</em>, is composite: for its stem with a different ending yields a different sense, and so does its ending with a different stem.)</p>"
                    },
                    "empty": false,
                    "key": "4.0.3.2",
                    "sub_key": "2"
                  }
                ],
                "content": {
                  "de": "<p>Ein Satz muss mit alten Ausdr\u00fccken einen neuen Sinn mitteilen.</p><p>Der Satz teilt uns eine Sachlage mit, also muss er <em class=\"germph\">wesentlich</em> mit der Sachlage zusammenh\u00e4ngen.</p><p>Und der Zusammenhang ist eben, dass er ihr logisches Bild ist.</p><p>Der Satz sagt nur insoweit etwas aus, als er ein Bild ist.</p>",
                  "en": "<p>A proposition must use old expressions to communicate a new sense.</p><p>A proposition communicates a situation to us, and so it must be <em>essentially</em> connected with the situation.</p><p>And the connexion is precisely that it is its logical picture.</p><p>A proposition states something only in so far as it is a picture.</p>"
                },
                "empty": false,
                "key": "4.0.3",
                "sub_key": "3"
              }, {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Wollten wir z. B. das, was wir durch \u201e<span class=\"quant\">(<var>x</var>).</span><var>fx</var>\u201c ausdr\u00fccken, durch Vorsetzen eines Indexes von \u201e<var>fx</var>\u201c ausdr\u00fccken\u2014etwa so: \u201e<span class=\"mathop\"><span class=\"mathrm\"><var>Alg</var>.</span></span><var>fx</var>\u201c\u2014es w\u00fcrde nicht gen\u00fcgen\u2014wir w\u00fcssten nicht, was verallgemeinert wurde. Wollten wir es durch einen Index \u201e<sub><var>a</var></sub>\u201c anzeigen\u2014etwa so: \u201e<var class=\"pushvar\">f</var>(<var>x</var><sub><var>a</var></sub>)\u201c\u2014es w\u00fcrde auch nicht gen\u00fcgen\u2014wir w\u00fcssten nicht den Bereich der Allgemeinheitsbezeichnung.</p><p>Wollten wir es durch Einf\u00fchrung einer Marke in die Argumentstellen versuchen\u2014etwa so: \u201e<span class=\"mathop\">(<var>A</var>, <var>A</var>).</span><var class=\"pushvar\">F</var>(<var>A</var>, <var>A</var>)\u201c\u2014es w\u00fcrde nicht gen\u00fcgen\u2014wir k\u00f6nnten die Identit\u00e4t der Variablen nicht feststellen. U.s.w.</p><p>Alle diese Bezeichnungsweisen gen\u00fcgen nicht, weil sie nicht die notwendige mathematische Mannigfaltigkeit haben.</p>",
                          "en": "<p>If, for example, we wanted to express what we now write as \u2018<span class=\"quant\">(<var>x</var>).</span><var>fx</var>\u2019 by putting an affix in front of \u2018<var>fx</var>\u2019\u2014for instance by writing \u2018<span class=\"mathop\"><span class=\"mathrm\"><var>Gen</var>.</span></span><var>fx</var>\u2019\u2014it would not be adequate: we should not know what was being generalized. If we wanted to signalize it with an affix \u2018<var>g</var>\u2019\u2014for instance by writing \u2018<var class=\"pushvar\">f</var>(<var>x</var><sub><var>g</var></sub>)\u2019\u2014that would not be adequate either: we should not know the scope of the generality-sign.</p><p>If we were to try to do it by introducing a mark into the argument-places\u2014for instance by writing \u2018<span class=\"mathop\">(<var>G</var>, <var>G</var>).</span><var class=\"pushvar\">F</var>(<var>G</var>, <var>G</var>)\u2019 \u2014it would not be adequate: we should not be able to establish the identity of the variables. And so on.</p><p>All these modes of signifying are inadequate because they lack the necessary mathematical multiplicity.</p>"
                        },
                        "empty": false,
                        "key": "4.0.4.1.1",
                        "sub_key": "1"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Aus demselben Grunde gen\u00fcgt die idealistische Erkl\u00e4rung des Sehens der r\u00e4umlichen Beziehung durch die \u201eRaumbrille\u201c nicht, weil sie nicht die Mannigfaltigkeit dieser Beziehungen erkl\u00e4ren kann.</p>",
                          "en": "<p>For the same reason the idealist\u2019s appeal to \u2018spatial spectacles\u2019 is inadequate to explain the seeing of spatial relations, because it cannot explain the multiplicity of these relations.</p>"
                        },
                        "empty": false,
                        "key": "4.0.4.1.2",
                        "sub_key": "2"
                      }
                    ],
                    "content": {
                      "de": "<p>Diese mathematische Mannigfaltigkeit kann man nat\u00fcrlich nicht selbst wieder abbilden. Aus ihr kann man beim Abbilden nicht heraus.</p>",
                      "en": "<p>This mathematical multiplicity, of course, cannot itself be the subject of depiction. One cannot get away from it when depicting.</p>"
                    },
                    "empty": false,
                    "key": "4.0.4.1",
                    "sub_key": "1"
                  }
                ],
                "content": {
                  "de": "<p>Am Satz muss gerade soviel zu unterscheiden sein, als an der Sachlage, die er darstellt.</p><p>Die beiden m\u00fcssen die gleiche logische (mathematische) Mannigfaltigkeit besitzen. (Vergleiche Hertz\u2019s \u201eMechanik\u201c, \u00fcber dynamische Modelle.)</p>",
                  "en": "<p>In a proposition there must be exactly as many distinguishable parts as in the situation that it represents.</p><p>The two must possess the same logical (mathematical) multiplicity. (Compare Hertz\u2019s <i>Mechanics</i> on dynamical models.)</p>"
                },
                "empty": false,
                "key": "4.0.4",
                "sub_key": "4"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Die Wirklichkeit wird mit dem Satz verglichen.</p>",
                  "en": "<p>Reality is compared with propositions.</p>"
                },
                "empty": false,
                "key": "4.0.5",
                "sub_key": "5"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Beachtet man nicht, dass der Satz einen von den Tatsachen unabh\u00e4ngigen Sinn hat, so kann man leicht glauben, dass wahr und falsch gleichberechtigte Beziehungen von Zeichen und Bezeichnetem sind.</p><p>Man k\u00f6nnte dann z. B. sagen, dass \u201e<var>p</var>\u201c auch die wahre Art bezeichnet, was \u201e<span class=\"mathop\">~</span><var>p</var>\u201c auf die falsche Art, etc.</p>",
                      "en": "<p>It must not be overlooked that a proposition has a sense that is independent of the facts: otherwise one can easily suppose that true and false are relations of equal status between signs and what they signify.</p><p>In that case one could say, for example, that \u2018<var>p</var>\u2019 signified in the true way what \u2018<span class=\"mathop\">~</span><var>p</var>\u2019 signified in the false way, etc.</p>"
                    },
                    "empty": false,
                    "key": "4.0.6.1",
                    "sub_key": "1"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Dass aber die Zeichen \u201e<var>p</var>\u201c und \u201e<span class=\"mathop\">~</span><var>p</var>\u201c das gleiche sagen <em class=\"germph\">k\u00f6nnen</em>, ist wichtig. Denn es zeigt, dass dem Zeichen \u201e<span class=\"mathop\">~</span>\u201c in der Wirklichkeit nichts entspricht.</p><p>Dass in einem Satz die Verneinung vorkommt, ist noch kein Merkmal seines Sinnes (<span class=\"mathop\">~</span><span class=\"mathop\">~</span><var>p</var><span class=\"mathrel\">=</span><var>p</var>).</p><p>Die S\u00e4tze \u201e<var>p</var>\u201c und \u201e<span class=\"mathop\">~</span><var>p</var>\u201c haben entgegengesetzten Sinn, aber es entspricht ihnen eine und dieselbe Wirklichkeit.</p>",
                          "en": "<p>But it is important that the signs \u2018<var>p</var>\u2019 and \u2018<span class=\"mathop\">~</span><var>p</var>\u2019 can say the same thing. For it shows that nothing in reality corresponds to the sign \u2018<span class=\"mathop\">~</span>\u2019.</p><p>The occurrence of negation in a proposition is not enough to characterize its sense (<span class=\"mathop\">~</span><span class=\"mathop\">~</span><var>p</var><span class=\"mathrel\">=</span><var>p</var>).</p><p>The propositions \u2018<var>p</var>\u2019 and \u2018<span class=\"mathop\">~</span><var>p</var>\u2019 have opposite sense, but there corresponds to them one and the same reality.</p>"
                        },
                        "empty": false,
                        "key": "4.0.6.2.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Kann man sich nicht mit falschen S\u00e4tzen, wie bisher mit wahren, verst\u00e4ndigen? Solange man nur wei\u00df, dass sie falsch gemeint sind. Nein! Denn, wahr ist ein Satz, wenn es sich so verh\u00e4lt, wie wir es durch ihn sagen; und wenn wir mit \u201e<var>p</var>\u201c <span class=\"mathop\">~</span><var>p</var> meinen, und es sich so verh\u00e4lt wie wir es meinen, so ist \u201e<var>p</var>\u201c in der neuen Auffassung wahr und nicht falsch.</p>",
                      "en": "<p>Can we not make ourselves understood with false propositions just as we have done up till now with true ones?\u2014So long as it is known that they are meant to be false.\u2014No! For a proposition is true if we use it to say that things stand in a certain way, and they do; and if by \u2018<var>p</var>\u2019 we mean <span class=\"mathop\">~</span><var>p</var> and things stand as we mean that they do, then, construed in the new way, \u2018<var>p</var>\u2019 is true and not false.</p>"
                    },
                    "empty": false,
                    "key": "4.0.6.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Ein Bild zur Erkl\u00e4rung des Wahrheitsbegriffes: Schwarzer Fleck auf wei\u00dfem Papier; die Form des Fleckes kann man beschreiben, indem man f\u00fcr jeden Punkt der Fl\u00e4che angibt, ob er wei\u00df oder schwarz ist. Der Tatsache, dass ein Punkt schwarz ist, entspricht eine positive\u2014der, dass ein Punkt wei\u00df (nicht schwarz) ist, eine negative Tatsache. Bezeichne ich einen Punkt der Fl\u00e4che (einen Fregeschen Wahrheitswert), so entspricht dies der Annahme, die zur Beurteilung aufgestellt wird, etc. etc.</p><p>Um aber sagen zu k\u00f6nnen, ein Punkt sei schwarz oder wei\u00df, muss ich vorerst wissen, wann man einen Punkt schwarz und wann man ihn wei\u00df nennt; um sagen zu k\u00f6nnen: \u201e<var>p</var>\u201c ist wahr (oder falsch), muss ich bestimmt haben, unter welchen Umst\u00e4nden ich \u201e<var>p</var>\u201c wahr nenne, und damit bestimme ich den Sinn des Satzes.</p><p>Der Punkt, an dem das Gleichnis hinkt ist nun der: Wir k\u00f6nnen auf einen Punkt des Papiers zeigen, auch ohne zu wissen, was wei\u00df und schwarz ist; einem Satz ohne Sinn aber entspricht gar nichts, denn er bezeichnet kein Ding (Wahrheitswert) dessen Eigenschaften etwa \u201efalsch\u201c oder \u201ewahr\u201c hie\u00dfen; das Verbum eines Satzes ist nicht \u201eist wahr\u201c oder \u201eist falsch\u201c\u2014wie Frege glaubte\u2014, sondern das, was \u201ewahr ist\u201c, muss das Verbum schon enthalten.</p>",
                      "en": "<p>An analogy to illustrate the concept of truth: imagine a black spot on white paper: you can describe the shape of the spot by saying, for each point on the sheet, whether it is black or white. To the fact that a point is black there corresponds a positive fact, and to the fact that a point is white (not black), a negative fact. If I designate a point on the sheet (a truth-value according to Frege), then this corresponds to the supposition that is put forward for judgement, etc. etc.</p><p>But in order to be able to say that a point is black or white, I must first know when a point is called black, and when white: in order to be able to say, \u2018\u201c<var>p</var>\u201d is true (or false)\u2019, I must have determined in what circumstances I call \u2018<var>p</var>\u2019 true, and in so doing I determine the sense of the proposition.</p><p>Now the point where the simile breaks down is this: we can indicate a point on the paper even if we do not know what black and white are, but if a proposition has no sense, nothing corresponds to it, since it does not designate a thing (a truth-value) which might have properties called \u2018false\u2019 or \u2018true\u2019. The verb of a proposition is not \u2018is true\u2019 or \u2018is false\u2019, as Frege thought: rather, that which \u2018is true\u2019 must already contain the verb.</p>"
                    },
                    "empty": false,
                    "key": "4.0.6.3",
                    "sub_key": "3"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Man k\u00f6nnte sagen: Die Verneinung bezieht sich schon auf den logischen Ort, den der verneinte Satz bestimmt.</p><p>Der verneinende Satz bestimmt einen <em class=\"germph\">anderen</em> logischen Ort als der verneinte.</p><p>Der verneinende Satz bestimmt einen logischen Ort mit Hilfe des logischen Ortes des verneinten Satzes, indem er jenen als au\u00dferhalb diesem liegend beschreibt.</p><p>Dass man den verneinten Satz wieder verneinen kann, zeigt schon, dass das, was verneint wird, schon ein Satz und nicht erst die Vorbereitung zu einem Satze ist.</p>",
                          "en": "<p>One could say that negation must be related to the logical place determined by the negated proposition.</p><p>The negating proposition determines a logical place <em>different</em> from that of the negated proposition.</p><p>The negating proposition determines a logical place with the help of the logical place of the negated proposition. For it describes it as lying outside the latter\u2019s logical place.</p><p>The negated proposition can be negated again, and this in itself shows that what is negated is already a proposition, and not merely something that is preliminary to a proposition.</p>"
                        },
                        "empty": false,
                        "key": "4.0.6.4.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Jeder Satz muss <em class=\"germph\">schon</em> einen Sinn haben; die Bejahung kann ihn ihm nicht geben, denn sie bejaht ja gerade den Sinn. Und dasselbe gilt von der Verneinung, etc.</p>",
                      "en": "<p>Every proposition must <em>already</em> have a sense: it cannot be given a sense by affirmation. Indeed its sense is just what is affirmed. And the same applies to negation, etc.</p>"
                    },
                    "empty": false,
                    "key": "4.0.6.4",
                    "sub_key": "4"
                  }
                ],
                "content": {
                  "de": "<p>Nur dadurch kann der Satz wahr oder falsch sein, indem er ein Bild der Wirklichkeit ist.</p>",
                  "en": "<p>A proposition can be true or false only in virtue of being a picture of reality.</p>"
                },
                "empty": false,
                "key": "4.0.6",
                "sub_key": "6"
              }
            ],
            "content": {},
            "empty": true,
            "key": "4.0",
            "sub_key": "0"
          }, {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Die Philosophie ist keine der Naturwissenschaften.</p><p>(Das Wort \u201ePhilosophie\u201c muss etwas bedeuten, was \u00fcber oder unter, aber nicht neben den Naturwissenschaften steht.)</p>",
                      "en": "<p>Philosophy is not one of the natural sciences.</p><p>(The word \u2018philosophy\u2019 must mean something whose place is above or below the natural sciences, not beside them.)</p>"
                    },
                    "empty": false,
                    "key": "4.1.1.1",
                    "sub_key": "1"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Die Psychologie ist der Philosophie nicht verwandter als irgend eine andere Naturwissenschaft.</p><p>Erkenntnistheorie ist die Philosophie der Psychologie.</p><p>Entspricht nicht mein Studium der Zeichensprache dem Studium der Denkprozesse, welches die Philosophen f\u00fcr die Philosophie der Logik f\u00fcr so wesentlich hielten? Nur verwickelten sie sich meistens in unwesentliche psychologische Untersuchungen und eine analoge Gefahr gibt es auch bei meiner Methode.</p>",
                          "en": "<p>Psychology is no more closely related to philosophy than any other natural science.</p><p>Theory of knowledge is the philosophy of psychology.</p><p>Does not my study of sign-language correspond to the study of thought-processes, which philosophers used to consider so essential to the philosophy of logic? Only in most cases they got entangled in unessential psychological investigations, and with my method too there is an analogous risk.</p>"
                        },
                        "empty": false,
                        "key": "4.1.1.2.1",
                        "sub_key": "1"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Die Darwinsche Theorie hat mit der Philosophie nicht mehr zu schaffen als irgendeine andere Hypothese der Naturwissenschaft.</p>",
                          "en": "<p>Darwin\u2019s theory has no more to do with philosophy than any other hypothesis in natural science.</p>"
                        },
                        "empty": false,
                        "key": "4.1.1.2.2",
                        "sub_key": "2"
                      }
                    ],
                    "content": {
                      "de": "<p>Der Zweck der Philosophie ist die logische Kl\u00e4rung der Gedanken.</p><p>Die Philosophie ist keine Lehre, sondern eine T\u00e4tigkeit.</p><p>Ein philosophisches Werk besteht wesentlich aus Erl\u00e4uterungen.</p><p>Das Resultat der Philosophie sind nicht \u201ephilosophische S\u00e4tze\u201c, sondern das Klarwerden von S\u00e4tzen.</p><p>Die Philosophie soll die Gedanken, die sonst, gleichsam, tr\u00fcbe und verschwommen sind, klar machen und scharf abgrenzen.</p>",
                      "en": "<p>Philosophy aims at the logical clarification of thoughts.</p><p>Philosophy is not a body of doctrine but an activity.</p><p>A philosophical work consists essentially of elucidations.</p><p>Philosophy does not result in \u2018philosophical propositions\u2019, but rather in the clarification of propositions.</p><p>Without philosophy thoughts are, as it were, cloudy and indistinct: its task is to make them clear and to give them sharp boundaries.</p>"
                    },
                    "empty": false,
                    "key": "4.1.1.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die Philosophie begrenzt das bestreitbare Gebiet der Naturwissenschaft.</p>",
                      "en": "<p>Philosophy sets limits to the much disputed sphere of natural science.</p>"
                    },
                    "empty": false,
                    "key": "4.1.1.3",
                    "sub_key": "3"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Sie soll das Denkbare abgrenzen und damit das Undenkbare.</p><p>Sie soll das Undenkbare von innen durch das Denkbare begrenzen.</p>",
                      "en": "<p>It must set limits to what can be thought; and, in doing so, to what cannot be thought.</p><p>It must set limits to what cannot be thought by working outwards through what can be thought.</p>"
                    },
                    "empty": false,
                    "key": "4.1.1.4",
                    "sub_key": "4"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Sie wird das Unsagbare bedeuten, indem sie das Sagbare klar darstellt.</p>",
                      "en": "<p>It will signify what cannot be said, by presenting clearly what can be said.</p>"
                    },
                    "empty": false,
                    "key": "4.1.1.5",
                    "sub_key": "5"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Alles was \u00fcberhaupt gedacht werden kann, kann klar gedacht werden. Alles, was sich aussprechen l\u00e4\u00dft, l\u00e4\u00dft sich klar aussprechen.</p>",
                      "en": "<p>Everything that can be thought at all can be thought clearly. Everything that can be put into words can be put clearly.</p>"
                    },
                    "empty": false,
                    "key": "4.1.1.6",
                    "sub_key": "6"
                  }
                ],
                "content": {
                  "de": "<p>Die Gesamtheit der wahren S\u00e4tze ist die gesamte Naturwissenschaft (oder die Gesamtheit der Naturwissenschaften).</p>",
                  "en": "<p>The totality of true propositions is the whole of natural science (or the whole corpus of the natural sciences).</p>"
                },
                "empty": false,
                "key": "4.1.1",
                "sub_key": "1"
              }, {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>So zeigt ein Satz \u201e<var>fa</var>\u201c, dass in seinem Sinn der Gegenstand <var>a</var> vorkommt, zwei S\u00e4tze \u201e<var>fa</var>\u201c und \u201e<var>ga</var>\u201c, dass in ihnen beiden von demselben Gegenstand die Rede ist.</p><p>Wenn zwei S\u00e4tze einander widersprechen. So zeigt dies ihre Struktur; ebenso, wenn einer aus dem anderen folgt. U.s.w.</p>",
                          "en": "<p>Thus one proposition \u2018<var>fa</var>\u2019 shows that the object <var>a</var> occurs in its sense, two propositions \u2018<var>fa</var>\u2019 and \u2018<var>ga</var>\u2019 show that the same object is mentioned in both of them.</p><p>If two propositions contradict one another, then their structure shows it; the same is true if one of them follows from the other. And so on.</p>"
                        },
                        "empty": false,
                        "key": "4.1.2.1.1",
                        "sub_key": "1"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Was gezeigt werden <em class=\"germph\">kann</em>, <em class=\"germph\">kann</em> nicht gesagt werden.</p>",
                          "en": "<p>What <em>can</em> be shown, <em>cannot</em> be said.</p>"
                        },
                        "empty": false,
                        "key": "4.1.2.1.2",
                        "sub_key": "2"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Jetzt verstehen wir auch unser Gef\u00fchl: dass wir im Besitze einer richtigen logischen Auffassung seien, wenn nur einmal alles in unserer Zeichensprache stimmt.</p>",
                          "en": "<p>Now, too, we understand our feeling that once we have a sign-language in which everything is all right, we already have a correct logical point of view.</p>"
                        },
                        "empty": false,
                        "key": "4.1.2.1.3",
                        "sub_key": "3"
                      }
                    ],
                    "content": {
                      "de": "<p>Der Satz kann die logische Form nicht darstellen, sie spiegelt sich in ihm.</p><p>Was sich in der Sprache spiegelt, kann sie nicht darstellen.</p><p>Was <em class=\"germph\">sich</em> in der Sprache ausdr\u00fcckt, k\u00f6nnen <em class=\"germph\">wir</em> nicht durch sie ausdr\u00fccken.</p><p>Der Satz <em class=\"germph\">zeigt</em> die logische Form der Wirklichkeit.</p><p>Er weist sie auf.</p>",
                      "en": "<p>Propositions cannot represent logical form: it is mirrored in them.</p><p>What finds its reflection in language, language cannot represent.</p><p>What expresses <em>itself</em> in language, <em>we</em> cannot express by means of language.</p><p>Propositions <em>show</em> the logical form of reality.</p><p>They display it.</p>"
                    },
                    "empty": false,
                    "key": "4.1.2.1",
                    "sub_key": "1"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Eine interne Eigenschaft einer Tatsache k\u00f6nnen wir auch einen Zug dieser Tatsache nennen. (In dem Sinn, in welchem wir etwa von Gesichtsz\u00fcgen sprechen.)</p>",
                          "en": "<p>An internal property of a fact can also be called a feature of that fact (in the sense in which we speak of facial features, for example).</p>"
                        },
                        "empty": false,
                        "key": "4.1.2.2.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Wir k\u00f6nnen in gewissem Sinne von formalen Eigenschaften der Gegenst\u00e4nde und Sachverhalte bezw. von Eigenschaften der Struktur der Tatsachen reden, und in demselben Sinne von formalen Relationen und Relationen von Strukturen.</p><p>(Statt Eigenschaft der Struktur sage ich auch \u201einterne Eigenschaft\u201c; statt Relation der Strukturen \u201einterne Relation\u201c.</p><p>Ich f\u00fchre diese Ausdr\u00fccke ein, um den Grund der bei den Philosophen sehr verbreiteten Verwechslung zwischen den internen Relationen und den eigentlichen (externen) Relationen zu zeigen.)</p><p>Das Bestehen solcher interner Eigenschaften und Relationen kann aber nicht durch S\u00e4tze behauptet werden, sondern es zeigt sich in den S\u00e4tzen, welche jene Sachverhalte darstellen und von jenen Gegenst\u00e4nden handeln.</p>",
                      "en": "<p>In a certain sense we can talk about formal properties of objects and states of affairs, or, in the case of facts, about structural properties: and in the same sense about formal relations and structural relations.</p><p>(Instead of \u2018structural property\u2019 I also say \u2018internal property\u2019; instead of \u2018structural relation\u2019, \u2018internal relation\u2019.</p><p>I introduce these expressions in order to indicate the source of the confusion between internal relations and relations proper (external relations), which is very widespread among philosophers.)</p><p>It is impossible, however, to assert by means of propositions that such internal properties and relations obtain: rather, this makes itself manifest in the propositions that represent the relevant states of affairs and are concerned with the relevant objects.</p>"
                    },
                    "empty": false,
                    "key": "4.1.2.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Eine Eigenschaft ist intern, wenn es undenkbar ist, dass ihr Gegenstand sie nicht besitzt.</p><p>(Diese blaue Farbe und jene stehen in der internen Relation von heller und dunkler eo ipso. Es ist undenkbar, dass <em class=\"germph\">diese</em> beiden Gegenst\u00e4nde nicht in dieser Relation st\u00fcnden.)</p><p>(Hier entspricht dem schwankenden Gebrauch der Worte \u201eEigenschaft\u201c und \u201eRelation\u201c der schwankende Gebrauch des Wortes \u201eGegenstand\u201c.)</p>",
                      "en": "<p>A property is internal if it is unthinkable that its object should not possess it.</p><p>(This shade of blue and that one stand, <em>eo ipso</em>, in the internal relation of lighter to darker. It is unthinkable that <em>these</em> two objects should not stand in this relation.)</p><p>(Here the shifting use of the word \u2018object\u2019 corresponds to the shifting use of the words \u2018property\u2019 and \u2018relation\u2019.)</p>"
                    },
                    "empty": false,
                    "key": "4.1.2.3",
                    "sub_key": "3"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Formen kann man nicht dadurch voneinander unterscheiden, dass man sagt, die eine habe diese, die andere aber jene Eigenschaft; denn dies setzt voraus, dass es einen Sinn habe, beide Eigenschaften von beiden Formen auszusagen.</p>",
                          "en": "<p>It is impossible to distinguish forms from one another by saying that one has this property and another that property: for this presupposes that it makes sense to ascribe either property to either form.</p>"
                        },
                        "empty": false,
                        "key": "4.1.2.4.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Das Bestehen einer internen Eigenschaft einer m\u00f6glichen Sachlage wird nicht durch einen Satz ausgedr\u00fcckt, sondern es dr\u00fcckt sich in dem sie darstellenden Satz durch eine interne Eigenschaft dieses Satzes aus.</p><p>Es w\u00e4re ebenso unsinnig, dem Satze eine formale Eigenschaft zuzusprechen, als sie ihm abzusprechen.</p>",
                      "en": "<p>The existence of an internal property of a possible situation is not expressed by means of a proposition: rather, it expresses itself in the proposition representing the situation, by means of an internal property of that proposition.</p><p>It would be just as nonsensical to assert that a proposition had a formal property as to deny it.</p>"
                    },
                    "empty": false,
                    "key": "4.1.2.4",
                    "sub_key": "4"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Hier erledigt sich nun die Streitfrage, \u201eob alle Relationen intern oder extern seien\u201c.</p>",
                          "en": "<p>Here we have the answer to the vexed question \u2018whether all relations are internal or external\u2019.</p>"
                        },
                        "empty": false,
                        "key": "4.1.2.5.1",
                        "sub_key": "1"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Reihen, welche durch <em class=\"germph\">interne</em> Relationen geordnet sind, nenne ich Formenreihen.</p><p>Die Zahlenreihe ist nicht nach einer externen, sondern nach einer internen Relation geordnet.</p><p>Ebenso die Reihe der S\u00e4tze \u201e<var>aRb</var>\u201c,</p><p>\u201e<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>):</span><var>aRx</var><span class=\"mathrel\">.</span><var>xRb</var>\u201c,</p><p>\u201e<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>,<var>y</var>):</span><var>aRx</var><span class=\"mathrel\">.</span><var>xRy</var><span class=\"mathrel\">.</span><var>yRb</var>\u201c, u. s. f.</p><p>(Steht <var>b</var> in einer dieser Beziehungen zu <var>a</var>, so nenne ich <var>b</var> einen Nachfolder von <var>a</var>.)</p>",
                          "en": "<p>I call a series that is ordered by an internal relation a series of forms.</p><p>The order of the number-series is not governed by an external relation but by an internal relation.</p><p>The same is true of the series of propositions \u2018<var>aRb</var>\u2019,</p><p>\u2018<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>):</span><var>aRx</var><span class=\"mathrel\">.</span><var>xRb</var>\u2019,</p><p>\u2018<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>,<var>y</var>):</span><var>aRx</var><span class=\"mathrel\">.</span><var>xRy</var><span class=\"mathrel\">.</span><var>yRb</var>\u2019, and so forth.</p><p>(If <var>b</var> stands in one of these relations to <var>a</var>, I call <var>b</var> a successor of <var>a</var>.)</p>"
                        },
                        "empty": false,
                        "key": "4.1.2.5.2",
                        "sub_key": "2"
                      }
                    ],
                    "content": {
                      "de": "<p>Das Bestehen einer internen Relation zwischen m\u00f6glichen Sachlagen dr\u00fcckt sich sprachlich durch eine interne Relation zwischen den sie darstellenden S\u00e4tzen aus.</p>",
                      "en": "<p>The existence of an internal relation between possible situations expresses itself in language by means of an internal relation between the propositions representing them.</p>"
                    },
                    "empty": false,
                    "key": "4.1.2.5",
                    "sub_key": "5"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>In dem Sinne, in welchem wir von formalen Eigenschaften sprechen, k\u00f6nnen wir nun auch von formalen Begriffen reden.</p><p>(Ich f\u00fchre diesen Ausdruck ein, um den Grund der Verwechslung der formalen Begriffe mit den eigentlichen Begriffen, welche die ganze alte Logik durchzieht, klar zu machen.)</p><p>Dass etwas unter einen formalen Begriff als dessen Gegenstand f\u00e4llt, kann nicht durch einen Satz ausgedr\u00fcckt werden. Sondern es zeigt sich an dem Zeichen dieses Gegenstandes selbst. (Der Name zeigt, dass er einen Gegenstand bezeichnet, das Zahlenzeichen, dass es eine Zahl bezeichnet etc.)</p><p>Die formalen Begriffe k\u00f6nnen ja nicht, wie die eigentlichen Begriffe, durch eine Funktion dargestellt werden.</p><p>Denn ihre Merkmale, die formalen Eigenschaften, werden nicht durch Funktionen ausgedr\u00fcckt.</p><p>Der Ausdruck der formalen Eigenschaft ist ein Zug gewisser Symbole.</p><p>Das Zeichen der Merkmale eines formalen Begriffes ist also ein charakteristischer Zug aller Symbole, deren Bedeutungen unter den Begriff fallen.</p><p>Der Ausdruck des formalen Begriffes, also, eine Satzvariable, in welcher nur dieser charakteristische Zug konstant ist.</p>",
                      "en": "<p>We can now talk about formal concepts, in the same sense that we speak of formal properties.</p><p>(I introduce this expression in order to exhibit the source of the confusion between formal concepts and concepts proper, which pervades the whole of traditional logic.)</p><p>When something falls under a formal concept as one of its objects, this cannot be expressed by means of a proposition. Instead it is shown in the very sign for this object. (A name shows that it signifies an object, a sign for a number that it signifies a number, etc.)</p><p>Formal concepts cannot, in fact, be represented by means of a function, as concepts proper can.</p><p>For their characteristics, formal properties, are not expressed by means of functions.</p><p>The expression for a formal property is a feature of certain symbols.</p><p>So the sign for the characteristics of a formal concept is a distinctive feature of all symbols whose meanings fall under the concept.</p><p>So the expression for a formal concept is a propositional variable in which this distinctive feature alone is constant.</p>"
                    },
                    "empty": false,
                    "key": "4.1.2.6",
                    "sub_key": "6"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Jede Variable ist das Zeichen eines formalen Begriffes.</p><p>Denn jede Variable stellt eine konstante Form dar, welche alle ihre Werte besitzen, und die als formale Eigenschaft dieser Werte aufgefasst werden kann.</p>",
                          "en": "<p>Every variable is the sign for a formal concept.</p><p>For every variable represents a constant form that all its values possess, and this can be regarded as a formal property of those values.</p>"
                        },
                        "empty": false,
                        "key": "4.1.2.7.1",
                        "sub_key": "1"
                      }, {
                        "children": [
                          {
                            "children": [],
                            "content": {
                              "de": "<p>Der formale Begriff ist mit einem Gegenstand, der unter ihn f\u00e4llt, bereits gegeben. Man kann also nicht Gegenst\u00e4nde eines formalen Begriffes <em class=\"germph\">und</em> den formalen Begriff selbst als Grundbegriffe einf\u00fchren. Man kann also z. B. nicht den Begriff der Funktion, und auch spezielle Funktionen (wie Russell) als Grundbegriffe einf\u00fchren; oder den Begriff der Zahl und bestimmte Zahlen.</p>",
                              "en": "<p>A formal concept is given immediately any object falling under it is given. It is not possible, therefore, to introduce as primitive ideas objects belonging to a formal concept <em>and</em> the formal concept itself. So it is impossible, for example, to introduce as primitive ideas both the concept of a function and specific functions, as Russell does; or the concept of a number and particular numbers.</p>"
                            },
                            "empty": false,
                            "key": "4.1.2.7.2.1",
                            "sub_key": "1"
                          }
                        ],
                        "content": {
                          "de": "<p>So ist der variable Name \u201e<var>x</var>\u201c das eigentliche Zeichen des Scheinbegriffes <em class=\"germph\">Gegenstand</em>.</p><p>Wo immer das Wort \u201eGegenstand\u201c (\u201eDing\u201c, \u201eSache\u201c, etc.) richtig gebraucht wird, wird es in der Begriffsschrift durch den variablen Namen ausgedr\u00fcckt.</p><p>Zum Beispiel in dem Satz \u201ees gibt 2 Gegenst\u00e4nde, welche \u2026\u201c durch \u201e<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>,<var>y</var>)</span>\u2026\u201c.</p><p>Wo immer es anders, also als eigentliches Begriffswort gebraucht wird, entstehen unsinnige Scheins\u00e4tze.</p><p>So kann man z. B. nicht sagen \u201eEs gibt Gegenst\u00e4nde\u201c, wie man etwa sagt: \u201eEs gibt B\u00fccher\u201c. Und ebenso wenig: \u201eEs gibt 100 Gegenst\u00e4nde\u201c, oder \u201eEs gibt <span class=\"symbol\">\u2135</span><sub>0</sub> Gegenst\u00e4nde\u201c.</p><p>Und es ist unsinnig, von der <em class=\"germph\">Anzahl aller Gegenst\u00e4nde</em> zu sprechen.</p><p>Dasselbe gilt von den Worten \u201eKomplex\u201c, \u201eTatsache\u201c, \u201eFunktion\u201c, \u201eZahl\u201c, etc.</p><p>Sie alle bezeichnen formale Begriffe und werden in der Begriffsschrift durch Variable, nicht durch Funktionen oder Klassen dargestellt. (Wie Frege und Russell glaubten.)</p><p>Ausdr\u00fccke wie \u201e1 ist eine Zahl\u201c, \u201eEs gibt nur Eine Null\u201c und alle \u00e4hnlichen sind unsinnig.</p><p>(Es ist ebenso unsinnig zu sagen: \u201eEs gibt nur Eine 1\u201c, als es unsinnig w\u00e4re, zu sagen: \u201e2<span class=\"mathrel\">+</span>2 ist um 3 Uhr gleich 4\u201c.)</p>",
                          "en": "<p>Thus the variable name \u2018<var>x</var>\u2019 is the proper sign for the pseudo-concept <em>object</em>.</p><p>Wherever the word \u2018object\u2019 (\u2018thing\u2019, etc.) is correctly used, it is expressed in conceptual notation by a variable name.</p><p>For example, in the proposition, \u2018There are 2 objects which \u2026\u2019, it is expressed by \u2018<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>,<var>y</var>)</span>\u2026\u2019.</p><p>Wherever it is used in a different way, that is as a proper concept-word, nonsensical pseudo-propositions are the result.</p><p>So one cannot say, for example, \u2018There are objects\u2019, as one might say, \u2018There are books\u2019. And it is just as impossible to say, \u2018There are 100 objects\u2019, or, \u2018There are <span class=\"symbol\">\u2135</span><sub>0</sub> objects\u2019.</p><p>And it is nonsensical to speak of the <em>total number of objects</em>.</p><p>The same applies to the words \u2018complex\u2019, \u2018fact\u2019, \u2018function\u2019, \u2018number\u2019, etc.</p><p>They all signify formal concepts, and are represented in conceptual notation by variables, not by functions or classes (as Frege and Russell believed).</p><p>\u20181 is a number\u2019, \u2018There is only one zero\u2019, and all similar expressions are nonsensical.</p><p>(It is just as nonsensical to say, \u2018There is only one 1\u2019, as it would be to say, \u20182<span class=\"mathrel\">+</span>2 at 3 o\u2019clock equals 4\u2019.)</p>"
                        },
                        "empty": false,
                        "key": "4.1.2.7.2",
                        "sub_key": "2"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Wollen wir den allgemeinen Satz: \u201e<var>b</var> ist ein Nachfolger von <var>a</var>\u201c in der Begriffsschrift ausdr\u00fccken, so brauchen wir hierzu einen Ausdruck f\u00fcr das allgemeine Glied der Formenreihe: </p><p><div class=\"centered\"><var>aRb</var>,<br />\n<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>):</span><var>aRx</var><span class=\"mathrel\">.</span><var>xRb</var>,<br />\n<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>,<var>y</var>):</span><var>aRx</var><span class=\"mathrel\">.</span><var>xRy</var><span class=\"mathrel\">.</span><var>yRb</var>,<br />\n\u2026&nbsp; .</div> </p><p>Wir k\u00f6nnen das allgemeine Glied der Formenreihe bestimmen, indem wir ihr erstes Glied angeben und die allgemeine Form der Operation, welche das folgende Glied aus dem vorhergehenden Satz erzeugt.</p>",
                          "en": "<p>If we want to express in conceptual notation the general proposition, \u2018<var>b</var> is a successor of <var>a</var>\u2019, then we require an expression for the general term of the series of forms</p><p><div class=\"centered\"><var>aRb</var>,<br />\n<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>):</span><var>aRx</var><span class=\"mathrel\">.</span><var>xRb</var>,<br />\n<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>,<var>y</var>):</span><var>aRx</var><span class=\"mathrel\">.</span><var>xRy</var><span class=\"mathrel\">.</span><var>yRb</var>,<br />\n\u2026&nbsp; .</div></p><p>We can determine the general term of a series of forms by giving its first term and the general form of the operation that produces the next term out of the proposition that precedes it.</p>"
                        },
                        "empty": false,
                        "key": "4.1.2.7.3",
                        "sub_key": "3"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Die Frage nach der Existenz eines formalen Begriffes ist unsinnig. Denn kein Satz kann eine solche Frage beantworten.</p><p>(Man kann also z. B. nicht fragen: \u201eGibt es unanalysierbare Subjekt-Pr\u00e4dikats\u00e4tze?\u201c)</p>",
                          "en": "<p>To ask whether a formal concept exists is nonsensical. For no proposition can be the answer to such a question.</p><p>(So, for example, the question, \u2018Are there unanalysable subject-predicate propositions?\u2019 cannot be asked.)</p>"
                        },
                        "empty": false,
                        "key": "4.1.2.7.4",
                        "sub_key": "4"
                      }
                    ],
                    "content": {
                      "de": "<p>Die Satzvariable bezeichnet den formalen Begriff und ihre Werte die Gegenst\u00e4nde, welche unter diesen Begriff fallen.</p>",
                      "en": "<p>The propositional variable signifies the formal concept, and its values signify the objects that fall under the concept.</p>"
                    },
                    "empty": false,
                    "key": "4.1.2.7",
                    "sub_key": "7"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die logischen Formen sind zah<em class=\"germph\">llos</em>.</p><p>Darum gibt es in der Logik keine ausgezeichneten Zahlen und darum gibt es keinen philosophischen Monismus oder Dualismus, etc.</p>",
                      "en": "<p>Logical forms are <em>without</em> number.</p><p>Hence there are no pre-eminent numbers in logic, and hence there is no possibility of philosophical monism or dualism, etc.</p>"
                    },
                    "empty": false,
                    "key": "4.1.2.8",
                    "sub_key": "8"
                  }
                ],
                "content": {
                  "de": "<p>Der Satz kann die gesamte Wirklichkeit darstellen, aber er kann nicht das darstellen, was er mit der Wirklichkeit gemein haben muss, um sie darstellen zu k\u00f6nnen\u2014die logische Form.</p><p>Um die logische Form darstellen zu k\u00f6nnen, m\u00fcssten wir uns mit dem Satze au\u00dferhalb der Logik aufstellen k\u00f6nnen, das hei\u00dft au\u00dferhalb der Welt.</p>",
                  "en": "<p>Propositions can represent the whole of reality, but they cannot represent what they must have in common with reality in order to be able to represent it\u2014logical form.</p><p>In order to be able to represent logical form, we should have to be able to station ourselves with propositions somewhere outside logic, that is to say outside the world.</p>"
                },
                "empty": false,
                "key": "4.1.2",
                "sub_key": "2"
              }
            ],
            "content": {
              "de": "<p>Der Satz stellt das Bestehen und Nichtbestehen der Sachverhalte dar.</p>",
              "en": "<p>Propositions represent the existence and non-existence of states of affairs.</p>"
            },
            "empty": false,
            "key": "4.1",
            "sub_key": "1"
          }, {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Ein Zeichen des Elementarsatzes ist es, dass kein Elementarsatz mit ihm in Widerspruch stehen kann.</p>",
                      "en": "<p>It is a sign of a proposition\u2019s being elementary that there can be no elementary proposition contradicting it.</p>"
                    },
                    "empty": false,
                    "key": "4.2.1.1",
                    "sub_key": "1"
                  }
                ],
                "content": {
                  "de": "<p>Der einfachste Satz, der Elementarsatz, behauptet das Bestehen eines Sachverhaltes.</p>",
                  "en": "<p>The simplest kind of proposition, an elementary proposition, asserts the existence of a state of affairs.</p>"
                },
                "empty": false,
                "key": "4.2.1",
                "sub_key": "1"
              }, {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Auch wenn die Welt unendlich komplex ist, so dass jede Tatsache aus unendlich vielen Sachverhalten besteht und jeder Sachverhalt aus unendlich vielen Gegenst\u00e4nden zusammengesetzt ist, auch dann m\u00fcsste es Gegenst\u00e4nde und Sachverhalte geben.</p>",
                          "en": "<p>Even if the world is infinitely complex, so that every fact consists of infinitely many states of affairs and every state of affairs is composed of infinitely many objects, there would still have to be objects and states of affairs.</p>"
                        },
                        "empty": false,
                        "key": "4.2.2.1.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Es ist offenbar, dass wir bei der Analyse der S\u00e4tze auf Elementars\u00e4tze kommen m\u00fcssen, die aus Namen in unmittelbarer Verbindung bestehen.</p><p>Es fr\u00e4gt sich hier, wie kommt der Satzverband zustande.</p>",
                      "en": "<p>It is obvious that the analysis of propositions must bring us to elementary propositions which consist of names in immediate combination.</p><p>This raises the question how such combination into propositions comes about.</p>"
                    },
                    "empty": false,
                    "key": "4.2.2.1",
                    "sub_key": "1"
                  }
                ],
                "content": {
                  "de": "<p>Der Elementarsatz besteht aus Namen. Er ist ein Zusammenhang, eine Verkettung, von Namen.</p>",
                  "en": "<p>An elementary proposition consists of names. It is a nexus, a concatenation, of names.</p>"
                },
                "empty": false,
                "key": "4.2.2",
                "sub_key": "2"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Der Name kommt im Satz nur im Zusammenhange des Elementarsatzes vor.</p>",
                  "en": "<p>It is only in the nexus of an elementary proposition that a name occurs in a proposition.</p>"
                },
                "empty": false,
                "key": "4.2.3",
                "sub_key": "3"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Gebrauche ich zwei Zeichen in ein und derselben Bedeutung, so dr\u00fccke ich dies aus, indem ich zwischen beide das Zeichen \u201e=\u201c setze.</p><p>\u201e<var>a</var><span class=\"mathrel\">=</span><var>b</var>\u201c hei\u00dft also: das Zeichen \u201e<var>a</var>\u201c ist durch das Zeichen \u201e<var>b</var>\u201c ersetzbar.</p><p>(F\u00fchre ich durch eine Gleichung ein neues Zeichen \u201e<var>b</var>\u201c ein, indem ich bestimme, es solle ein bereits bekanntes Zeichen \u201e<var>a</var>\u201c ersetzen, so schreibe ich die Gleichung\u2014Definition\u2014(wie Russell) in der Form \u201e<var>a</var><span class=\"mathrel\">=</span><var>b</var> Def.\u201c. Die Definition ist eine Zeichenregel.)</p>",
                      "en": "<p>When I use two signs with one and the same meaning, I express this by putting the sign \u2018=\u2019 between them.</p><p>So \u2018<var>a</var><span class=\"mathrel\">=</span><var>b</var>\u2019 means that the sign \u2018<var>b</var>\u2019 can be substituted for the sign \u2018<var>a</var>\u2019.</p><p>(If I use an equation to introduce a new sign \u2018<var>b</var>\u2019, laying down that it shall serve as a substitute for a sign \u2018<var>a</var>\u2019 that is already known, then, like Russell, I write the equation\u2014definition\u2014in the form \u2018<var>a</var><span class=\"mathrel\">=</span><var>b</var> Def.\u2019 A definition is a rule dealing with signs.)</p>"
                    },
                    "empty": false,
                    "key": "4.2.4.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Ausdr\u00fccke von der Form \u201e<var>a</var><span class=\"mathrel\">=</span><var>b</var>\u201c sind also nur Behelfe der Darstellung; sie sagen nichts \u00fcber die Bedeutung der Zeichen \u201e<var>a</var>\u201c, \u201e<var>b</var>\u201c aus.</p>",
                      "en": "<p>Expressions of the form \u2018<var>a</var><span class=\"mathrel\">=</span><var>b</var>\u2019 are, therefore, mere representational devices. They state nothing about the meaning of the signs \u2018<var>a</var>\u2019 and \u2018<var>b</var>\u2019.</p>"
                    },
                    "empty": false,
                    "key": "4.2.4.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>K\u00f6nnen wir zwei Namen verstehen, ohne zu wissen, ob sie dasselbe Ding oder zwei verschiedene Dinge bezeichnen?\u2014K\u00f6nnen wir einen Satz, worin zwei Namen vorkommen, verstehen, ohne zu wissen, ob sie Dasselbe oder Verschiedenes bedeuten?</p><p>Kenne ich etwa die Bedeutung eines englischen und eines gleichbedeutenden deutschen Wortes, so ist es unm\u00f6glich, dass ich nicht wei\u00df, dass die beiden gleichbedeutend sind; es ist unm\u00f6glich, dass ich sie nicht ineinander \u00fcbersetzen kann.</p><p>Ausdr\u00fccke wie \u201e<var>a</var><span class=\"mathrel\">=</span><var>a</var>\u201c, oder von diesen abgeleitete, sind weder Elementars\u00e4tze, noch sonst sinnvolle Zeichen. (Dies wird sich sp\u00e4ter zeigen.)</p>",
                      "en": "<p>Can we understand two names without knowing whether they signify the same thing or two different things?\u2014Can we understand a proposition in which two names occur without knowing whether their meaning is the same or different?</p><p>Suppose I know the meaning of an English word and of a German word that means the same: then it is impossible for me to be unaware that they do mean the same; I must be capable of translating each into the other.</p><p>Expressions like \u2018<var>a</var><span class=\"mathrel\">=</span><var>a</var>\u2019, and those derived from them, are neither elementary propositions nor is there any other way in which they have sense. (This will become evident later.)</p>"
                    },
                    "empty": false,
                    "key": "4.2.4.3",
                    "sub_key": "3"
                  }
                ],
                "content": {
                  "de": "<p>Die Namen sind die einfachen Symbole, ich deute sie durch einzelne Buchstaben (\u201e<var>x</var>\u201c, \u201e<var>y</var>\u201c, \u201e<var>z</var>\u201c) an.</p><p>Den Elementarsatz schreibe ich als Funktion der Namen in der Form: \u201e<var>fx</var>\u201c, \u201e<var>\u03d5</var>(<var>x</var>,<var>y</var>)\u201c, etc.</p><p>Oder ich deute ihn durch die Buchstaben <var>p</var>, <var>q</var>, <var>r</var> an.</p>",
                  "en": "<p>Names are the simple symbols: I indicate them by single letters (\u2018<var>x</var>\u2019, \u2018<var>y</var>\u2019, \u2018<var>z</var>\u2019).</p><p>I write elementary propositions as functions of names, so that they have the form \u2018<var>fx</var>\u2019, \u2018<var>\u03d5</var>(<var>x</var>,<var>y</var>)\u2019, etc.</p><p>Or I indicate them by the letters \u2018<var>p</var>\u2019, \u2018<var>q</var>\u2019, \u2018<var>r</var>\u2019.</p>"
                },
                "empty": false,
                "key": "4.2.4",
                "sub_key": "4"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Ist der Elementarsatz wahr, so besteht der Sachverhalt; ist der Elementarsatz falsch, so besteht der Sachverhalt nicht.</p>",
                  "en": "<p>If an elementary proposition is true, the state of affairs exists: if an elementary proposition is false, the state of affairs does not exist.</p>"
                },
                "empty": false,
                "key": "4.2.5",
                "sub_key": "5"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Die Angabe aller wahren Elementars\u00e4tze beschreibt die Welt vollst\u00e4ndig. Die Welt ist vollst\u00e4ndig beschrieben durch die Angaben aller Elementars\u00e4tze plus der Angabe, welche von ihnen wahr und welche falsch sind.</p>",
                  "en": "<p>If all true elementary propositions are given, the result is a complete description of the world. The world is completely described by giving all elementary propositions, and adding which of them are true and which false.</p>"
                },
                "empty": false,
                "key": "4.2.6",
                "sub_key": "6"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Bez\u00fcglich des Bestehens und Nichtbestehens von <var>n</var> Sachverhalten gibt es <table class=\"possibilities\"><tbody><tr><td rowspan=\"3\" class=\"middleright\">K<sub><var>n</var></sub> = </td><td class=\"summationtop\"><var class=\"smallvar\">n</var></td><td rowspan=\"3\" class=\"middleright\"><span class=\"largeparen\">(</span></td><td rowspan=\"3\" class=\"middlecenter\"><var>n</var><br /><var>\u03bd</var></td><td rowspan=\"3\" class=\"middleleft\"><span class=\"largeparen\">)</span></td></tr><tr><td class=\"summationmiddle\"><span class=\"largeop\">\u2211</span></td></tr><tr><td class=\"summationbottom\"><span class=\"smallvar\"><var>\u03bd</var> = 0</span></td></tr></tbody></table> M\u00f6glichkeiten.</p><p>Es k\u00f6nnen alle Kombinationen der Sachverhalte bestehen, die andern nicht bestehen.</p>",
                  "en": "<p>For <var>n</var> states of affairs, there are <table class=\"possibilities\"><tbody><tr><td rowspan=\"3\" class=\"middleright\">K<sub><var>n</var></sub> = </td><td class=\"summationtop\"><var class=\"smallvar\">n</var></td><td rowspan=\"3\" class=\"middleright\"><span class=\"largeparen\">(</span></td><td rowspan=\"3\" class=\"middlecenter\"><var>n</var><br /><var>\u03bd</var></td><td rowspan=\"3\" class=\"middleleft\"><span class=\"largeparen\">)</span></td></tr><tr><td class=\"summationmiddle\"><span class=\"largeop\">\u2211</span></td></tr><tr><td class=\"summationbottom\"><span class=\"smallvar\"><var>\u03bd</var> = 0</span></td></tr></tbody></table> possibilities of existence and non-existence.</p><p>Of these states of affairs any combination can exist and the remainder not exist.</p>"
                },
                "empty": false,
                "key": "4.2.7",
                "sub_key": "7"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Diesen Kombinationen entsprechen ebenso viele M\u00f6glichkeiten der Wahrheit\u2014und Falschheit\u2014von <var>n</var> Elementars\u00e4tzen.</p>",
                  "en": "<p>There correspond to these combinations the same number of possibilities of truth\u2014and falsity\u2014for <var>n</var> elementary propositions.</p>"
                },
                "empty": false,
                "key": "4.2.8",
                "sub_key": "8"
              }
            ],
            "content": {
              "de": "<p>Der Sinn des Satzes ist seine \u00dcbereinstimmung und Nicht\u00fcbereinstimmung mit den M\u00f6glichkeiten des Bestehens und Nichtbestehens der Sachverhalte.</p>",
              "en": "<p>The sense of a proposition is its agreement and disagreement with possibilities of existence and non-existence of states of affairs.</p>"
            },
            "empty": false,
            "key": "4.2",
            "sub_key": "2"
          }, {
            "children": [
              {
                "children": [],
                "content": {
                  "de": "<p>Die Wahrheitsm\u00f6glichkeiten k\u00f6nnen wir durch Schemata folgender Art darstellen (\u201eW\u201c bedeutet \u201ewahr\u201c, \u201eF\u201c, \u201efalsch\u201c. Die Reihen der \u201eW\u201c und \u201eF\u201c unter der Reihe der Elementars\u00e4tze bedeuten in leichtverst\u00e4ndlicher Symbolik deren Wahrheitsm\u00f6glichkeiten):</p><p><div class=\"centered\"><table class=\"truthtable\"><tbody><tr><th class=\"l\"><var>p</var></th><th class=\"m\"><var>q</var></th><th class=\"e\"><var>r</var></th></tr><tr><td class=\"l\">W</td><td class=\"m\">W</td><td class=\"e\">W</td></tr><tr><td class=\"l\">F</td><td class=\"m\">W</td><td class=\"e\">W</td></tr><tr><td class=\"l\">W</td><td class=\"m\">F</td><td class=\"e\">W</td></tr><tr><td class=\"l\">W</td><td class=\"m\">W</td><td class=\"e\">F</td></tr><tr><td class=\"l\">F</td><td class=\"m\">F</td><td class=\"e\">W</td></tr><tr><td class=\"l\">F</td><td class=\"m\">W</td><td class=\"e\">F</td></tr><tr><td class=\"l\">W</td><td class=\"m\">F</td><td class=\"e\">F</td></tr><tr><td class=\"l\">F</td><td class=\"m\">F</td><td class=\"e\">F</td></tr></tbody></table><span class=\"padrthree\"></span><table class=\"truthtable\"><tbody><tr><th class=\"l\"><var>p</var></th><th class=\"e\"><var>q</var></th></tr><tr><td class=\"l\">W</td><td class=\"e\">W</td></tr><tr><td class=\"l\">F</td><td class=\"e\">W</td></tr><tr><td class=\"l\">W</td><td class=\"e\">F</td></tr><tr><td class=\"l\">F</td><td class=\"e\">F</td></tr></tbody></table><span class=\"padrthree\"></span><table class=\"truthtable\"><tbody><tr><th class=\"e\"><var>p</var></th></tr><tr><td class=\"e\">W</td></tr><tr><td class=\"e\">F</td></tr></tbody></table></div></p>",
                  "en": "<p>We can represent truth-possibilities by schemata of the following kind (\u2018T\u2019 means \u2018true\u2019, \u2018F\u2019 means \u2018false\u2019; the rows of \u2018T\u2019s\u2019 and \u2018F\u2019s\u2019 under the row of elementary propositions symbolize their truth-possibilities in a way that can easily be understood):</p><p><div class=\"centered\"><table class=\"truthtable\"><tbody><tr><th class=\"l\"><var>p</var></th><th class=\"m\"><var>q</var></th><th class=\"e\"><var>r</var></th></tr><tr><td class=\"l\">T</td><td class=\"m\">T</td><td class=\"e\">T</td></tr><tr><td class=\"l\">F</td><td class=\"m\">T</td><td class=\"e\">T</td></tr><tr><td class=\"l\">T</td><td class=\"m\">F</td><td class=\"e\">T</td></tr><tr><td class=\"l\">T</td><td class=\"m\">T</td><td class=\"e\">F</td></tr><tr><td class=\"l\">F</td><td class=\"m\">F</td><td class=\"e\">T</td></tr><tr><td class=\"l\">F</td><td class=\"m\">T</td><td class=\"e\">F</td></tr><tr><td class=\"l\">T</td><td class=\"m\">F</td><td class=\"e\">F</td></tr><tr><td class=\"l\">F</td><td class=\"m\">F</td><td class=\"e\">F</td></tr></tbody></table><span class=\"padrthree\"></span><table class=\"truthtable\"><tbody><tr><th class=\"l\"><var>p</var></th><th class=\"e\"><var>q</var></th></tr><tr><td class=\"l\">T</td><td class=\"e\">T</td></tr><tr><td class=\"l\">F</td><td class=\"e\">T</td></tr><tr><td class=\"l\">T</td><td class=\"e\">F</td></tr><tr><td class=\"l\">F</td><td class=\"e\">F</td></tr></tbody></table><span class=\"padrthree\"></span><table class=\"truthtable\"><tbody><tr><th class=\"e\"><var>p</var></th></tr><tr><td class=\"e\">T</td></tr><tr><td class=\"e\">F</td></tr></tbody></table></div></p>"
                },
                "empty": false,
                "key": "4.3.1",
                "sub_key": "1"
              }
            ],
            "content": {
              "de": "<p>Die Wahrheitsm\u00f6glichkeiten der Elementars\u00e4tze bedeuten die M\u00f6glichkeiten des Bestehens und Nichtbestehens der Sachverhalte.</p>",
              "en": "<p>Truth-possibilities of elementary propositions mean possibilities of existence and non-existence of states of affairs.</p>"
            },
            "empty": false,
            "key": "4.3",
            "sub_key": "3"
          }, {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Es ist von vornherein wahrscheinlich, dass die Einf\u00fchrung der Elementars\u00e4tze f\u00fcr das Verst\u00e4ndnis aller anderen Satzarten grundlegend ist. Ja, das Verst\u00e4ndnis der allgemeinen S\u00e4tze h\u00e4ngt <em class=\"germph\">f\u00fchlbar</em> von dem der Elementars\u00e4tze ab.</p>",
                      "en": "<p>It immediately strikes one as probable that the introduction of elementary propositions provides the basis for understanding all other kinds of proposition. Indeed the understanding of general propositions <em>palpably</em> depends on the understanding of elementary propositions.</p>"
                    },
                    "empty": false,
                    "key": "4.4.1.1",
                    "sub_key": "1"
                  }
                ],
                "content": {
                  "de": "<p>Die Wahrheitsm\u00f6glichkeiten der Elementars\u00e4tze sind die Bedingungen der Wahrheit und Falschheit der S\u00e4tze.</p>",
                  "en": "<p>Truth-possibilities of elementary propositions are the conditions of the truth and falsity of propositions.</p>"
                },
                "empty": false,
                "key": "4.4.1",
                "sub_key": "1"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Bez\u00fcglich der \u00dcbereinstimmung und Nicht\u00fcberein stimmung eines Satzes mit den Wahrheitsm\u00f6glichkeiten von <var>n</var> Elementars\u00e4tzen gibt es <table class=\"possibilities\"><tbody><tr><td class=\"summationtop\"><span class=\"smallvar\">K<sub><var>n</var></sub></span></td><td class=\"middleright\" rowspan=\"3\"><span class=\"largeparen\">(</span></td><td class=\"middlecenter\" rowspan=\"3\">K<sub><var>n</var></sub><br /><var>\u03ba</var></td><td class=\"middleright\" rowspan=\"3\"><span class=\"largeparen\">)</span> = L<sub><var>n</var></sub></td></tr><tr><td class=\"summationmiddle\"><span class=\"largeop\">\u2211</span></td></tr><tr><td class=\"summationmiddle\"><span class=\"smallvar\"><var>\u03ba</var> = 0</span></td></tr></tbody></table> M\u00f6glichkeiten.</p>",
                  "en": "<p>For <var>n</var> elementary propositions there are <table class=\"possibilities\"><tbody><tr><td class=\"summationtop\"><span class=\"smallvar\">K<sub><var>n</var></sub></span></td><td class=\"middleright\" rowspan=\"3\"><span class=\"largeparen\">(</span></td><td class=\"middlecenter\" rowspan=\"3\">K<sub><var>n</var></sub><br /><var>\u03ba</var></td><td class=\"middleright\" rowspan=\"3\"><span class=\"largeparen\">)</span> = L<sub><var>n</var></sub></td></tr><tr><td class=\"summationmiddle\"><span class=\"largeop\">\u2211</span></td></tr><tr><td class=\"summationmiddle\"><span class=\"smallvar\"><var>\u03ba</var> = 0</span></td></tr></tbody></table>  ways in which a proposition can agree and disagree with their truth possibilities.</p>"
                },
                "empty": false,
                "key": "4.4.2",
                "sub_key": "2"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Der Ausdruck der \u00dcbereinstimmung und Nicht\u00fcbereinstimmung mit den Wahrheitsm\u00f6glichkeiten der Elementars\u00e4tze dr\u00fcckt die Wahrheitsbedingungen des Satzes aus.</p><p>Der Satz ist der Ausdruck seiner Wahrheitsbedingungen.</p><p>(Frege hat sie daher ganz richtig als Erkl\u00e4rung der Zeichen seiner Begriffsschrift vorausgeschickt. Nur ist die Erkl\u00e4rung des Wahrheitsbegriffes bei Frege falsch: W\u00e4ren \u201edas Wahre\u201c und \u201edas Falsche\u201c wirklich Gegenst\u00e4nde und die Argumente in <span class=\"mathop\">~</span><var>p</var> etc. dann w\u00e4re nach Freges Bestimmung der Sinn von \u201e<span class=\"mathop\">~</span><var>p</var>\u201c keineswegs bestimmt.)</p>",
                      "en": "<p>The expression of agreement and disagreement with the truth possibilities of elementary propositions expresses the truth-conditions of a proposition.</p><p>A proposition is the expression of its truth-conditions.</p><p>(Thus Frege was quite right to use them as a starting point when he explained the signs of his conceptual notation. But the explanation of the concept of truth that Frege gives is mistaken: if \u2018the true\u2019 and \u2018the false\u2019 were really objects, and were the arguments in <span class=\"mathop\">~</span><var>p</var> etc., then Frege\u2019s method of determining the sense of \u2018<span class=\"mathop\">~</span><var>p</var>\u2019 would leave it absolutely undetermined.)</p>"
                    },
                    "empty": false,
                    "key": "4.4.3.1",
                    "sub_key": "1"
                  }
                ],
                "content": {
                  "de": "<p>Die \u00dcbereinstimmung mit den Wahrheitsm\u00f6glichkeiten k\u00f6nnen wir dadurch ausdr\u00fccken, indem wir ihnen im Schema etwa das Abzeichen \u201eW\u201c (wahr) zuordnen.</p><p>Das Fehlen dieses Abzeichens bedeutet die Nicht\u00fcbereinstimmung.</p>",
                  "en": "<p>We can express agreement with truth-possibilities by correlating the mark \u2018T\u2019 (true) with them in the schema.</p><p>The absence of this mark means disagreement.</p>"
                },
                "empty": false,
                "key": "4.4.3",
                "sub_key": "3"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Es ist klar, dass dem Komplex der Zeichen \u201eF\u201c und \u201eW\u201c kein Gegenstand (oder Komplex von Gegenst\u00e4nden) entspricht; so wenig, wie den horizontalen und vertikalen Strichen oder den Klammern.\u2014\u201eLogische Gegenst\u00e4nde\u201c gibt es nicht.</p><p>Analoges gilt nat\u00fcrlich f\u00fcr alle Zeichen, die dasselbe ausdr\u00fccken wie die Schemata der \u201eW\u201c und \u201eF\u201c.</p>",
                      "en": "<p>It is clear that a complex of the signs \u2018F\u2019 and \u2018T\u2019 has no object (or complex of objects) corresponding to it, just as there is none corresponding to the horizontal and vertical lines or to the brackets.\u2014There are no \u2018logical objects\u2019.</p><p>Of course the same applies to all signs that express what the schemata of \u2018T\u2019s\u2019 and \u2018F\u2019s\u2019 express.</p>"
                    },
                    "empty": false,
                    "key": "4.4.4.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Es ist z. B.:</p><p>(Frege\u2019s \u201eUrtelistrich\u201c \u201e<span class=\"symbol\">\u22a2</span>\u201c ist logisch ganz bedeutunglos; er zeigt bei Frege (und Russell) nur an, dass diese Autoren die so bezeichneten S\u00e4tze f\u00fcr wahr halten. \n\u201e<span class=\"symbol\">\u22a2</span>\u201c geh\u00f6rt daher ebenso wenig zum Satzgef\u00fcge, wie etwa die Nummer des Satzes. Ein Satz kann unm\u00f6glich von sich selbst aussagen, dass er wahr ist.)</p><p>Ist die Reihenfolge der Wahrheitsm\u00f6glichkeiten im Schema durch eine Kombinationsregel ein f\u00fcr allemal festgesetzt, dann ist die letzte Kolonne allein schon ein Ausdruck der Wahrheitsbedingungen. Schreiben wir diese Kolonne als Reihe hin, so wird das Satzzeichen zu</p><p><div class=\"displaymath\">\u201e<span class=\"mathop\">(<span class=\"mathrm\">WW\u2013W</span>)</span>&nbsp; (<var>p</var>, <var>q</var>)\u201c</div> oder deutlicher <div class=\"displaymath\">\u201e<span class=\"mathop\">(<span class=\"mathrm\">WWFW</span>)</span>&nbsp; (<var>p</var>, <var>q</var>)\u201c.</div></p><p>(Die Anzahl der Stellen in der linken Klammer ist durch die Anzahl der Glieder in der rechten bestimmt.)</p>",
                      "en": "<p>For example, the following is a propositional sign:</p><p>(Frege\u2019s \u2018judgement stroke\u2019 \u2018<span class=\"symbol\">\u22a2</span>\u2019 is logically quite meaningless: in the works of Frege (and Russell) it simply indicates that these authors hold the propositions marked with this sign to be true. Thus \u2018<span class=\"symbol\">\u22a2</span>\u2019 is no more a component part of a proposition than is, for instance, the proposition\u2019s number. It is quite impossible for a proposition to state that it itself is true.)</p><p>If the order or the truth-possibilities in a schema is fixed once and for all by a combinatory rule, then the last column by itself will be an expression of the truth-conditions. If we now write this column as a row, the propositional sign will become</p><p><div class=\"displaymath\">\u201c<span class=\"mathop\">(<span class=\"mathrm\">TT\u2013T</span>)</span>&nbsp; (<var>p</var>, <var>q</var>)\u201d,</div> or more explicitly <div class=\"displaymath\">\u201c<span class=\"mathop\">(<span class=\"mathrm\">TTFT</span>)</span>&nbsp; (<var>p</var>, <var>q</var>)\u201d.</div></p><p>(The number of places in the left-hand pair of brackets is determined by the number of terms in the right-hand pair.)</p>"
                    },
                    "empty": false,
                    "key": "4.4.4.2",
                    "sub_key": "2"
                  }
                ],
                "content": {
                  "de": "<p>Das Zeichen, welches durch die Zuordnung jener Abzeichen \u201eW\u201c und der Wahrheitsm\u00f6glichkeiten entsteht, ist ein Satzzeichen.</p>",
                  "en": "<p>The sign that results from correlating the mark \u2018T\u2019 with truth-possibilities is a propositional sign.</p>"
                },
                "empty": false,
                "key": "4.4.4",
                "sub_key": "4"
              }, {
                "children": [],
                "content": {
                  "de": "<p>F\u00fcr <var>n</var> Elementars\u00e4tze gibt es <span class=\"mathrm\"><var>L</var></span><sub><var>n</var></sub> m\u00f6gliche Gruppen von Wahrheitsbedingungen.</p><p>Die Gruppen von Wahrheitsbedingungen, welche zu den Wahrheitsm\u00f6glichkeiten einer Anzahl von Elementars\u00e4tzen geh\u00f6ren, lassen sich in eine Reihe ordnen.</p>",
                  "en": "<p>For <var>n</var> elementary propositions there are <span class=\"mathrm\"><var>L</var></span><sub><var>n</var></sub> possible groups of truth-conditions.</p><p>The groups of truth-conditions that are obtainable from the truth-possibilities of a given number of elementary propositions can be arranged in a series.</p>"
                },
                "empty": false,
                "key": "4.4.5",
                "sub_key": "5"
              }, {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Tautologie und Kontradiktion sind aber nicht unsinnig; sie geh\u00f6ren zum Symbolismus, und zwar \u00e4hnlich wie die \u201e0\u201c zum Symbolismus der Arithmetik.</p>",
                          "en": "<p>Tautologies and contradictions are not, however, nonsensical. They are part of the symbolism, much as \u20180\u2019 is part of the symbolism of arithmetic.</p>"
                        },
                        "empty": false,
                        "key": "4.4.6.1.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Der Satz zeigt was er sagt, die Tautologie und die Kontradiktion, dass sie nichts sagen.</p><p>Die Tautologie hat keine Wahrheitsbedingungen, denn sie ist bedingungslos wahr; und die Kontradiktion ist unter keiner Bedingung wahr.</p><p>Tautologie und Kontradiktion sind sinnlos.</p><p>(Wie der Punkt, von dem zwei Pfeile in entgegengesetzter Richtung auseinandergehen.)</p><p>(Ich wei\u00df z. B. nichts \u00fcber das Wetter, wenn ich wei\u00df, dass es regnet oder nicht regnet.)</p>",
                      "en": "<p>Propositions show what they say: tautologies and contradictions show that they say nothing.</p><p>A tautology has no truth-conditions, since it is unconditionally true: and a contradiction is true on no condition.</p><p>Tautologies and contradictions lack sense.</p><p>(Like a point from which two arrows go out in opposite directions to one another.)</p><p>(For example, I know nothing about the weather when I know that it is either raining or not raining.)</p>"
                    },
                    "empty": false,
                    "key": "4.4.6.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Tautologie und Kontradiktion sind nicht Bilder der Wirklichkeit. Sie stellen keine m\u00f6gliche Sachlage dar. Denn jene l\u00e4sst <em class=\"germph\">jede</em> m\u00f6gliche Sachlage zu, diese <em class=\"germph\">keine</em>.</p><p>In der Tautologie heben die Bedingungen der \u00dcbereinstimmung mit der Welt\u2014die darstellenden Beziehungen\u2014einander auf, so dass sie in keiner darstellenden Beziehung zur Wirklichkeit steht.</p>",
                      "en": "<p>Tautologies and contradictions are not pictures of reality. They do not represent any possible situations. For the former admit <em>all</em> possible situations, and latter <em>none</em>.</p><p>In a tautology the conditions of agreement with the world\u2014the representational relations\u2014cancel one another, so that it does not stand in any representational relation to reality.</p>"
                    },
                    "empty": false,
                    "key": "4.4.6.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die Wahrheitsbedingungen bestimmen den Spielraum, der den Tatsachen durch den Satz gelassen wird.</p><p>(Der Satz, das Bild, das Modell, sind im negativen Sinne wie ein fester K\u00f6rper, der die Bewegungsfreiheit der anderen beschr\u00e4nkt; im positiven Sinne, wie der von fester Substanz begrenzte Raum, worin ein K\u00f6rper Platz hat.)</p><p>Die Tautologie l\u00e4sst der Wirklichkeit den ganzen\u2014unendlichen\u2014logischen Raum; die Kontradiktion erf\u00fcllt den ganzen logischen Raum und l\u00e4sst der Wirklichkeit keinen Punkt. Keine von beiden kann daher die Wirklichkeit irgendwie bestimmen.</p>",
                      "en": "<p>The truth-conditions of a proposition determine the range that it leaves open to the facts.</p><p>(A proposition, a picture, or a model is, in the negative sense, like a solid body that restricts the freedom of movement of others, and, in the positive sense, like a space bounded by solid substance in which there is room for a body.)</p><p>A tautology leaves open to reality the whole\u2014the infinite whole\u2014of logical space: a contradiction fills the whole of logical space leaving no point of it for reality. Thus neither of them can determine reality in any way.</p>"
                    },
                    "empty": false,
                    "key": "4.4.6.3",
                    "sub_key": "3"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die Wahrheit der Tautologie ist gewiss, des Satzes m\u00f6glich, der Kontradiktion unm\u00f6glich.</p><p>(Gewiss, m\u00f6glich, unm\u00f6glich: Hier haben wir das Anzeichen jener Gradation, die wir in der Wahrscheinlichkeitslehre brauchen.)</p>",
                      "en": "<p>A tautology\u2019s truth is certain, a proposition\u2019s possible, a contradiction\u2019s impossible.</p><p>(Certain, possible, impossible: here we have the first indication of the scale that we need in the theory of probability.)</p>"
                    },
                    "empty": false,
                    "key": "4.4.6.4",
                    "sub_key": "4"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Das logische Produkt einer Tautologie und eines Satzes sagt dasselbe, wie der Satz. Also ist jenes Produkt identisch mit dem Satz. Denn man kann das Wesentliche des Symbols nicht \u00e4ndern, ohne seinen Sinn zu \u00e4ndern.</p>",
                      "en": "<p>The logical product of a tautology and a proposition says the same thing as the proposition. This product, therefore, is identical with the proposition. For it is impossible to alter what is essential to a symbol without altering its sense.</p>"
                    },
                    "empty": false,
                    "key": "4.4.6.5",
                    "sub_key": "5"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Freilich sind auch in der Tautologie und Kontradiktion die Zeichen noch mit einander verbunden, d. h. sie stehen in Beziehungen zu einander, aber diese Beziehungen sind bedeutungslos, dem <em class=\"germph\">Symbol</em> unwesentlich.</p>",
                          "en": "<p>Admittedly the signs are still combined with one another even in tautologies and contradictions\u2014i.e. they stand in certain relations to one another: but these relations have no meaning, they are not essential to the <em>symbol</em>.</p>"
                        },
                        "empty": false,
                        "key": "4.4.6.6.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Einer bestimmten logischen Verbindung von Zeichen entspricht eine bestimmte logische Verbindung ihrer Bedeutungen; <em class=\"germph\">jede beliebige</em> Verbindung entspricht nur den unverbundenen Zeichen.</p><p>Das hei\u00dft, S\u00e4tze, die f\u00fcr jede Sachlage wahr sind, k\u00f6nnen \u00fcberhaupt keine Zeichenverbindungen sein, denn sonst k\u00f6nnten ihnen nur bestimmte Verbindungen von Gegenst\u00e4nden entsprechen.</p><p>(Und keiner logischen Verbindung entspricht <em class=\"germph\">keine</em> Verbindung der Gegenst\u00e4nde.)</p><p>Tautologie und Kontradiktion sind die Grenzf\u00e4lle der Zeichenverbindung, n\u00e4mlich ihre Aufl\u00f6sung.</p>",
                      "en": "<p>What corresponds to a determinate logical combination of signs is a determinate logical combination of their meanings. It is only to the uncombined signs that <em>absolutely any</em> combination corresponds.</p><p>In other words, propositions that are true for every situation cannot be combinations of signs at all, since, if they were, only determinate combinations of objects could correspond to them.</p><p>(And what is not a logical combination has <em>no</em> combination of objects corresponding to it.)</p><p>Tautology and contradiction are the limiting cases\u2014indeed the disintegration\u2014of the combination of signs.</p>"
                    },
                    "empty": false,
                    "key": "4.4.6.6",
                    "sub_key": "6"
                  }
                ],
                "content": {
                  "de": "<p>Unter den m\u00f6glichen Gruppen von Wahrheitsbedingungen gibt es zwei extreme F\u00e4lle.</p><p>In dem einen Fall ist der Satz f\u00fcr s\u00e4mtliche Wahrheitsm\u00f6glichkeiten der Elementars\u00e4tze wahr. Wir sagen, die Wahrheitsbedingungen sind <em class=\"germph\">tautologisch</em>.</p><p>Im zweiten Fall ist der Satz f\u00fcr s\u00e4mtliche Wahrheitsm\u00f6glichkeiten falsch: Die Wahrheitsbedingungen sind <em class=\"germph\">kontradiktorisch</em>.</p><p>Im ersten Fall nennen wir den Satz eine Tautologie, im zweiten Fall eine Kontradiktion.</p>",
                  "en": "<p>Among the possible groups of truth-conditions there are two extreme cases.</p><p>In one of these cases the proposition is true for all the truth-possibilities of the elementary propositions. We say that the truth-conditions are <em>tautological</em>.</p><p>In the second case the proposition is false for all the truth-possibilities: the truth-conditions are <em>contradictory</em>.</p><p>In the first case we call the proposition a tautology; in the second, a contradiction.</p>"
                },
                "empty": false,
                "key": "4.4.6",
                "sub_key": "6"
              }
            ],
            "content": {
              "de": "<p>Der Satz ist der Ausdruck der \u00dcbereinstimmung und Nicht\u00fcbereinstimmung mit den Wahrheitsm\u00f6glichkeiten der Elementars\u00e4tze.</p>",
              "en": "<p>A proposition is an expression of agreement and disagreement with truth-possibilities of elementary propositions.</p>"
            },
            "empty": false,
            "key": "4.4",
            "sub_key": "4"
          }, {
            "children": [
              {
                "children": [],
                "content": {
                  "de": "<p>Angenommen, mir w\u00e4ren <em class=\"germph\">alle</em> Elementars\u00e4tze gegeben: Dann l\u00e4sst sich einfach fragen: Welche S\u00e4tze kann ich aus ihnen bilden? Und das sind <em class=\"germph\">alle</em> S\u00e4tze und <em class=\"germph\">so</em> sind sie begrenzt.</p>",
                  "en": "<p>Suppose that I am given <em>all</em> elementary propositions: then I can simply ask what propositions I can construct out of them. And there I have <em>all</em> propositions, and <em>that</em> fixes their limits.</p>"
                },
                "empty": false,
                "key": "4.5.1",
                "sub_key": "1"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Die S\u00e4tze sind alles, was aus der Gesamtheit aller Elementars\u00e4tze folgt (nat\u00fcrlich auch daraus, dass es die <em class=\"germph\">Gesamtheit aller</em> ist). (So k\u00f6nnte man in gewissem Sinne sagen, dass <em class=\"germph\">alle</em> S\u00e4tze Verallgemeinerungen der Elementars\u00e4tze sind.)</p>",
                  "en": "<p>Propositions comprise all that follows from the totality of all elementary propositions (and, of course, from its being the <em>totality</em> of them <em>all</em>). (Thus, in a certain sense, it could be said that <em>all</em> propositions were generalizations of elementary propositions.)</p>"
                },
                "empty": false,
                "key": "4.5.2",
                "sub_key": "2"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Die allgemeine Satzform ist eine Variable.</p>",
                  "en": "<p>The general propositional form is a variable.</p>"
                },
                "empty": false,
                "key": "4.5.3",
                "sub_key": "3"
              }
            ],
            "content": {
              "de": "<p>Nun scheint es m\u00f6glich zu sein, die allgemeinste Satzform anzugeben: das hei\u00dft, eine Beschreibung der S\u00e4tze <em class=\"germph\">irgend einer</em> Zeichensprache zu geben, so dass jeder m\u00f6gliche Sinn durch ein Symbol, auf welches die Beschreibung passt, ausgedr\u00fcckt werden kann, und dass jedes Symbol, worauf die Beschreibung passt, einen Sinn ausdr\u00fccken kann, wenn die Bedeutungen der Namen entsprechend gew\u00e4hlt werden.</p><p>Es ist klar, dass bei der Beschreibung der allgemeinsten Satzform <em class=\"germph\">nur</em> ihr Wesentliches beschrieben werden darf,\u2014sonst w\u00e4re sie n\u00e4mlich nicht die allgemeinste.</p><p>Dass es eine allgemeine Satzform gibt, wird dadurch bewiesen, dass es keinen Satz geben darf, dessen Form man nicht h\u00e4tte voraussehen (d. h. konstruieren) k\u00f6nnen. Die allgemeine Form des Satzes ist: Es verh\u00e4lt sich so und so.</p>",
              "en": "<p>It now seems possible to give the most general propositional form: that is, to give a description of the propositions of <em>any</em> sign-language <em>whatsoever</em> in such a way that every possible sense can be expressed by a symbol satisfying the description, and every symbol satisfying the description can express a sense, provided that the meanings of the names are suitably chosen.</p><p>It is clear that <em>only</em> what is essential to the most general propositional form may be included in its description\u2014for otherwise it would not be the most general form.</p><p>The existence of a general propositional form is proved by the fact that there cannot be a proposition whose form could not have been foreseen (i.e. constructed). The general form of a proposition is: This is how things stand.</p>"
            },
            "empty": false,
            "key": "4.5",
            "sub_key": "5"
          }
        ],
        "content": {
          "de": "<p>Der Gedanke ist der sinnvolle Satz.</p>",
          "en": "<p>A thought is a proposition with a sense.</p>"
        },
        "empty": false,
        "key": "4",
        "sub_key": "4"
      }, {
        "children": [
          {
            "children": [
              {
                "children": [],
                "content": {
                  "de": "<p>Die Elementars\u00e4tze sind die Wahrheitsargumente des Satzes.</p>",
                  "en": "<p>Elementary propositions are the truth-arguments of propositions.</p>"
                },
                "empty": false,
                "key": "5.0.1",
                "sub_key": "1"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Es liegt nahe, die Argumente von Funktionen mit den Indices von Namen zu verwechseln. Ich erkenne n\u00e4mlich sowohl am Argument wie am Index die Bedeutung des sie enthaltenden Zeichens.</p><p>In Russells \u201e+<sub><var>c</var></sub>\u201c ist z.B. \u201e<sub><var>c</var></sub>\u201c ein Index, der darauf hinweist, dass das ganze Zeichen das Additionszeichen f\u00fcr Kardinalzahlen ist. Aber diese Bezeichnung beruht auf willk\u00fcrlicher \u00dcbereinkunft und man k\u00f6nnte statt \u201e+<sub><var>c</var></sub>\u201c auch ein einfaches Zeichen w\u00e4hlen; in \u201e<span class=\"mathop\">~</span><var>p</var>\u201c aber ist \u201e<var>p</var>\u201c kein Index, sondern ein Argument: der Sinn von \u201e<span class=\"mathop\">~</span><var>p</var>\u201c <em class=\"germph\">kann nicht</em> verstanden werden, ohne dass vorher der Sinn von \u201e<var>p</var>\u201c verstanden worden w\u00e4re. (Im Namen Julius C\u00e4sar ist \u201eJulius\u201c ein Index. Der Index ist immer ein Teil einer Beschreibung des Gegenstandes, dessen Namen wir ihn anh\u00e4ngen. Z. B. <em class=\"germph\">der</em> C\u00e4sar aus dem Geschlechte der Julier.)</p><p>Die Verwechslung von Argument und Index liegt, wenn ich mich nicht irre, der Theorie Freges von der Bedeutung der S\u00e4tze und Funktionen zugrunde. F\u00fcr Frege waren die S\u00e4tze der Logik Namen, und deren Argumente die Indices dieser Namen.</p>",
                  "en": "<p>The arguments of functions are readily confused with the affixes of names. For both arguments and affixes enable me to recognize the meaning of the signs containing them.</p><p>For example, when Russell writes \u2018+<sub><var>c</var></sub>\u2019, the \u2018<sub><var>c</var></sub>\u2019 is an affix which indicates that the sign as a whole is the addition-sign for cardinal numbers. But the use of this sign is the result of arbitrary convention and it would be quite possible to choose a simple sign instead of \u2018+<sub><var>c</var></sub>\u2019; in \u2018<span class=\"mathop\">~</span><var>p</var>\u2019, however, \u2018<var>p</var>\u2019 is not an affix but an argument: the sense of \u2018<span class=\"mathop\">~</span><var>p</var>\u2019 <em>cannot</em> be understood unless the sense of \u2018<var>p</var>\u2019 has been understood already. (In the name Julius Caesar \u2018Julius\u2019 is an affix. An affix is always part of a description of the object to whose name we attach it: e.g. <em>the</em> Caesar of the Julian gens.)</p><p>If I am not mistaken, Frege\u2019s theory about the meaning of propositions and functions is based on the confusion between an argument and an affix. Frege regarded the propositions of logic as names, and their arguments as the affixes of those names.</p>"
                },
                "empty": false,
                "key": "5.0.2",
                "sub_key": "2"
              }
            ],
            "content": {},
            "empty": true,
            "key": "5.0",
            "sub_key": "0"
          }, {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Die Wahrheitsfunktionen jeder Anzahl von Elementars\u00e4tzen lassen sich in einem Schema folgender Art hinschreiben:</p><p>Diejenigen Wahrheitsm\u00f6glichkeiten seiner Wahrheitsargumente, welche den Satz bewahrheiten, will ich seine <em class=\"germph\">Wahrheitsgr\u00fcnde</em> nennen.</p>",
                      "en": "<p>The truth-functions of a given number of elementary propositions can always be set out in a schema of the following kind:</p><p>I will give the name <em>truth-grounds</em> of a proposition to those truth-possibilities of its truth-arguments that make it true.</p>"
                    },
                    "empty": false,
                    "key": "5.1.0.1",
                    "sub_key": "1"
                  }
                ],
                "content": {},
                "empty": true,
                "key": "5.1.0",
                "sub_key": "0"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Sind die Wahrheitsgr\u00fcnde, die einer Anzahl von S\u00e4tzen gemeinsam sind, s\u00e4mtlich auch Wahrheitsgr\u00fcnde eines bestimmten Satzes, so sagen wir, die Wahrheit dieses Satzes folge aus der Wahrheit jener S\u00e4tze.</p>",
                  "en": "<p>If all the truth-grounds that are common to a number of propositions are at the same time truth-grounds of a certain proposition, then we say that the truth of that proposition follows from the truth of the others.</p>"
                },
                "empty": false,
                "key": "5.1.1",
                "sub_key": "1"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Die Wahrheitsgr\u00fcnde des einen sind in denen des anderen enthalten; <var>p</var> folgt aus <var>q</var>.</p>",
                      "en": "<p>The truth-grounds of the one are contained in those of the other: <var>p</var> follows from <var>q</var>.</p>"
                    },
                    "empty": false,
                    "key": "5.1.2.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Folgt <var>p</var> aus <var>q</var>, so ist der Sinn von \u201e<var>p</var>\u201c im Sinne von \u201e<var>q</var>\u201c enthalten.</p>",
                      "en": "<p>If <var>p</var> follows from <var>q</var>, the sense of \u2018<var>p</var>\u2019 is contained in the sense of \u2018<var>q</var>\u2019.</p>"
                    },
                    "empty": false,
                    "key": "5.1.2.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Wenn ein Gott eine Welt erschafft, worin gewisse S\u00e4tze wahr sind, so schafft er damit auch schon eine Welt, in welcher alle ihre Folges\u00e4tze stimmen. Und \u00e4hnlich k\u00f6nnte er keine Welt schaffen, worin der Satz \u201e<var>p</var>\u201c wahr ist, ohne seine s\u00e4mtlichen Gegenst\u00e4nde zu schaffen.</p>",
                      "en": "<p>If a god creates a world in which certain propositions are true, then by that very act he also creates a world in which all the propositions that follow from them come true. And similarly he could not create a world in which the proposition \u2018<var>p</var>\u2019 was true without creating all its objects.</p>"
                    },
                    "empty": false,
                    "key": "5.1.2.3",
                    "sub_key": "3"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>\u201e<var>p</var><span class=\"mathrel\">.</span><var>q</var>\u201c ist einer der S\u00e4tze, welche \u201e<var>p</var>\u201c bejahen, und zugleich einer der S\u00e4tze, welche \u201e<var>q</var>\u201c bejahen.</p><p>Zwei S\u00e4tze sind einander entgegengesetzt, wenn es keinen sinnvollen Satz gibt, der sie beide bejaht.</p><p>Jeder Satz der einem anderen widerspricht, verneint ihn.</p>",
                          "en": "<p>\u2018<var>p</var><span class=\"mathrel\">.</span><var>q</var>\u2019 is one of the propositions that affirm \u2018<var>p</var>\u2019 and at the same time one of the propositions that affirm \u2018<var>q</var>\u2019.</p><p>Two propositions are opposed to one another if there is no proposition with a sense, that affirms them both.</p><p>Every proposition that contradicts another negates it.</p>"
                        },
                        "empty": false,
                        "key": "5.1.2.4.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Der Satz bejaht jeden Satz, der aus ihm folgt.</p>",
                      "en": "<p>A proposition affirms every proposition that follows from it.</p>"
                    },
                    "empty": false,
                    "key": "5.1.2.4",
                    "sub_key": "4"
                  }
                ],
                "content": {
                  "de": "<p>Insbesondere folgt die Wahrheit eines Satzes \u201e<var>p</var>\u201c aus der Wahrheit eines anderen \u201e<var>q</var>\u201c, wenn alle Wahrheitsgr\u00fcnde des zweiten Wahrheitsgr\u00fcnde des ersten sind.</p>",
                  "en": "<p>In particular, the truth of a proposition \u2018<var>p</var>\u2019 follows from the truth of another proposition \u2018<var>q</var>\u2019 if all the truth-grounds of the latter are truth-grounds of the former.</p>"
                },
                "empty": false,
                "key": "5.1.2",
                "sub_key": "2"
              }, {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Wenn wir von <var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><var>q</var> und <span class=\"mathop\">~</span><var>p</var> auf <var>q</var> schlie\u00dfen, so ist hier durch die Bezeichnungsweise die Beziehung der Satzformen von \u201e<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><var>q</var>\u201c und \u201e<span class=\"mathop\">~</span><var>p</var>\u201c verh\u00fcllt. Schreiben wir aber z. B. statt \u201e<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><var>q</var>\u201c \u201e<var>p</var><span class=\"mathrel\">|</span><var>q</var><span class=\"mathrel\">.|.</span><var>p</var><span class=\"mathrel\">|</span><var>q</var>\u201c und statt \u201e<span class=\"mathop\">~</span><var>p</var>\u201c \u201e<var>p</var><span class=\"mathrel\">|</span><var>p</var>\u201c (<var>p</var><span class=\"mathrel\">|</span><var>q</var><span class=\"mathrel\">=</span>weder <var>p</var>, noch <var>q</var>), so wird der innere Zusammenhang offenbar.</p><p>(Dass man aus <span class=\"quant\">(<var>x</var>).</span><var>fx</var> auf <var>fa</var> schlie\u00dfen kann, das zeigt, dass die Allgemeinheit auch im Symbol \u201e<span class=\"quant\">(<var>x</var>).</span><var>fx</var>\u201c vorhanden ist.)</p>",
                          "en": "<p>When we infer <var>q</var> from <var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><var>q</var> and <span class=\"mathop\">~</span><var>p</var>, the relation between the propositional forms of \u2018<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><var>q</var>\u2019 and \u2018<span class=\"mathop\">~</span><var>p</var>\u2019 is masked, in this case, by our mode of signifying. But if instead of \u2018<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><var>q</var>\u2019 we write, for example, \u2018<var>p</var><span class=\"mathrel\">|</span><var>q</var><span class=\"mathrel\">.|.</span><var>p</var><span class=\"mathrel\">|</span><var>q</var>\u2019, and instead of \u2018<span class=\"mathop\">~</span><var>p</var>\u2019, \u2018<var>p</var><span class=\"mathrel\">|</span><var>p</var>\u2019 (<var>p</var><span class=\"mathrel\">|</span><var>q</var><span class=\"mathrel\">=</span>neither <var>p</var> nor <var>q</var>), then the inner connexion becomes obvious.</p><p>(The possibility of inference from <span class=\"quant\">(<var>x</var>).</span><var>fx</var> to <var>fa</var> shows that the symbol <span class=\"quant\">(<var>x</var>).</span><var>fx</var> itself has generality in it.)</p>"
                        },
                        "empty": false,
                        "key": "5.1.3.1.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Folgt die Wahrheit eines Satzes aus der Wahrheit anderer, so dr\u00fcckt sich dies durch Beziehungen aus, in welchen die Formen jener S\u00e4tze zu einander stehen; und zwar brauchen wir sie nicht erst in jene Beziehungen zu setzen, indem wir sie in einem Satz miteinander verbinden, sondern diese Beziehungen sind intern und bestehen, sobald, und dadurch dass, jene S\u00e4tze bestehen.</p>",
                      "en": "<p>If the truth of one proposition follows from the truth of others, this finds expression in relations in which the forms of the propositions stand to one another: nor is it necessary for us to set up these relations between them, by combining them with one another in a single proposition; on the contrary, the relations are internal, and their existence is an immediate result of the existence of the propositions.</p>"
                    },
                    "empty": false,
                    "key": "5.1.3.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Folgt <var>p</var> aus <var>q</var>, so kann ich von <var>q</var> auf <var>p</var> schlie\u00dfen; <var>p</var> aus <var>q</var> folgern.</p><p>Die Art des Schlusses ist allein aus den beiden S\u00e4tzen zu entnehmen.</p><p>Nur sie selbst k\u00f6nnen den Schluss rechtfertigen.</p><p>\u201eSchlussgesetze\u201c, welche\u2014wie bei Frege und Russell\u2014die Schl\u00fcsse rechtfertigen sollen, sind sinnlos, und w\u00e4ren \u00fcberfl\u00fcssig.</p>",
                      "en": "<p>If <var>p</var> follows from <var>q</var>, I can make an inference from <var>q</var> to <var>p</var>, deduce <var>p</var> from <var>q</var>.</p><p>The nature of the inference can be gathered only from the two propositions.</p><p>They themselves are the only possible justification of the inference.</p><p>\u2018Laws of inference\u2019, which are supposed to justify inferences, as in the works of Frege and Russell, have no sense, and would be superfluous.</p>"
                    },
                    "empty": false,
                    "key": "5.1.3.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Alles Folgern geschieht a priori.</p>",
                      "en": "<p>All deductions are made <em>a priori</em>.</p>"
                    },
                    "empty": false,
                    "key": "5.1.3.3",
                    "sub_key": "3"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Aus einem Elementarsatz l\u00e4sst sich kein anderer folgern.</p>",
                      "en": "<p>One elementary proposition cannot be deduced form another.</p>"
                    },
                    "empty": false,
                    "key": "5.1.3.4",
                    "sub_key": "4"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Auf keine Weise kann aus dem Bestehen irgend einer Sachlage auf das Bestehen einer von ihr g\u00e4nzlich verschiedenen Sachlage geschlossen werden.</p>",
                      "en": "<p>There is no possible way of making an inference from the existence of one situation to the existence of another, entirely different situation.</p>"
                    },
                    "empty": false,
                    "key": "5.1.3.5",
                    "sub_key": "5"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Die Ereignisse der Zukunft <em class=\"germph\">k\u00f6nnen</em> wir nicht aus den gegenw\u00e4rtigen erschlie\u00dfen.</p><p>Der Glaube an den Kausalnexus ist der <em class=\"germph\">Aberglaube</em>.</p>",
                          "en": "<p>We <em>cannot</em> infer the events of the future from those of the present.</p><p>Belief in the causal nexus is <em>superstition</em>.</p>"
                        },
                        "empty": false,
                        "key": "5.1.3.6.1",
                        "sub_key": "1"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Die Willensfreiheit besteht darin, dass zuk\u00fcnftige Handlungen jetzt nicht gewusst werden k\u00f6nnen. Nur dann k\u00f6nnten wir sie wissen, wenn die Kausalit\u00e4t eine <em class=\"germph\">innere</em> Notwendigkeit w\u00e4re, wie die des logischen Schlusses.\u2014Der Zusammenhang von Wissen und Gewusstem ist der der logischen Notwendigkeit.</p><p>(\u201eA wei\u00df, dass <var>p</var> der Fall ist\u201c ist sinnlos, wenn <var>p</var> eine Tautologie ist.)</p>",
                          "en": "<p>The freedom of the will consists in the impossibility of knowing actions that still lie in the future. We could know them only if causality were an <em>inner</em> necessity like that of logical inference.\u2014The connexion between knowledge and what is known is that of logical necessity.</p><p>(\u2018A knows that <var>p</var> is the case\u2019, has no sense if <var>p</var> is a tautology.)</p>"
                        },
                        "empty": false,
                        "key": "5.1.3.6.2",
                        "sub_key": "2"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Wenn daraus, dass ein Satz uns einleuchtet, nicht <em class=\"germph\">folgt</em>, dass er wahr ist, so ist das Einleuchten auch keine Rechtfertigung f\u00fcr unseren Glauben an seine Wahrheit.</p>",
                          "en": "<p>If the truth of a proposition does not <em>follow</em> from the fact that it is self-evident to us, then its self-evidence in no way justifies our belief in its truth.</p>"
                        },
                        "empty": false,
                        "key": "5.1.3.6.3",
                        "sub_key": "3"
                      }
                    ],
                    "content": {
                      "de": "<p>Einen Kausalnexus, der einen solchen Schluss rechtfertigte, gibt es nicht.</p>",
                      "en": "<p>There is no causal nexus to justify such an inference.</p>"
                    },
                    "empty": false,
                    "key": "5.1.3.6",
                    "sub_key": "6"
                  }
                ],
                "content": {
                  "de": "<p>Dass die Wahrheit eines Satzes aus der Wahrheit anderer S\u00e4tze folgt, ersehen wir aus der Struktur der S\u00e4tze.</p>",
                  "en": "<p>When the truth of one proposition follows from the truth of others, we can see this from the structure of the propositions.</p>"
                },
                "empty": false,
                "key": "5.1.3",
                "sub_key": "3"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Folgt <var>p</var> aus <var>q</var> und <var>q</var> aus <var>p</var>, so sind sie ein und derselbe Satz.</p>",
                      "en": "<p>If <var>p</var> follows from <var>q</var> and <var>q</var> from <var>p</var>, then they are one and the same proposition.</p>"
                    },
                    "empty": false,
                    "key": "5.1.4.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die Tautologie folgt aus allen S\u00e4tzen: sie sagt nichts.</p>",
                      "en": "<p>A tautology follows from all propositions: it says nothing.</p>"
                    },
                    "empty": false,
                    "key": "5.1.4.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die Kontradiktion ist das Gemeinsame der S\u00e4tze, was <em class=\"germph\">kein</em> Satz mit einem anderen gemein hat. Die Tautologie ist das Gemeinsame aller S\u00e4tze, welche nichts miteinander gemein haben.</p><p>Die Kontradiktion verschwindet sozusagen au\u00dferhalb, die Tautologie innerhalb aller S\u00e4tze.</p><p>Die Kontradiktion ist die \u00e4u\u00dfere Grenze der S\u00e4tze, die Tautologie ihr substanzloser Mittelpunkt.</p>",
                      "en": "<p>Contradiction is that common factor of propositions which <em>no</em> proposition has in common with another. Tautology is the common factor of all propositions that have nothing in common with one another. </p><p>Contradiction, one might say, vanishes outside all propositions: tautology vanishes inside them.</p><p>Contradiction is the outer limit of propositions: tautology is the unsubstantial point at their centre.</p>"
                    },
                    "empty": false,
                    "key": "5.1.4.3",
                    "sub_key": "3"
                  }
                ],
                "content": {
                  "de": "<p>Folgt ein Satz aus einem anderen, so sagt dieser mehr als jener, jener weniger als dieser.</p>",
                  "en": "<p>If one proposition follows from another, then the latter says more than the former, and the former less than the latter.</p>"
                },
                "empty": false,
                "key": "5.1.4",
                "sub_key": "4"
              }, {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Es gibt keinen besonderen Gegenstand, der den Wahrscheinlichkeitss\u00e4tzen eigen w\u00e4re.</p>",
                          "en": "<p>There is no special object peculiar to probability propositions.</p>"
                        },
                        "empty": false,
                        "key": "5.1.5.1.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Sei in einem Schema wie dem obigen in No. 5.101 <span class=\"mathrm\">W</span><sub><var>r</var></sub> die Anzahl der \u201eW\u201c im Satze <var>r</var>; <span class=\"mathrm\">W</span><sub><var>rs</var></sub> die Anzahl derjenigen \u201eW\u201c im Satze <var>s</var>, die in gleichen Kolonnen mit \u201eW\u201c des Satzes <var>r</var> stehen. Der Satz <var>r</var> gibt dann dem Satze <var>s</var> die Wahrscheinlichkeit: <span class=\"mathrm\">W</span><sub><var>rs</var></sub> : <span class=\"mathrm\">W</span><sub><var>r</var></sub>.</p>",
                      "en": "<p>In a schema like the one above in 5.101, let <span class=\"mathrm\">T</span><sub><var>r</var></sub> be the number of \u2018T\u2019s\u2019 in the proposition <var>r</var>, and let <span class=\"mathrm\">T</span><sub><var>rs</var></sub>, be the number of \u2018T\u2019s\u2019 in the proposition <var>s</var> that stand in columns in which the proposition <var>r</var> has \u2018T\u2019s\u2019. Then the proposition <var>r</var> gives to the proposition <var>s</var> the probability <span class=\"mathrm\">T</span><sub><var>rs</var></sub> : <span class=\"mathrm\">T</span><sub><var>r</var></sub>.</p>"
                    },
                    "empty": false,
                    "key": "5.1.5.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>S\u00e4tze, welche keine Wahrheitsargumente mit einander gemein haben, nennen wir von einander unabh\u00e4ngig.</p><p>Zwei Elementars\u00e4tze geben einander die Wahrscheinlichkeit \u00bd.</p><p>Folgt <var>p</var> aus <var>q</var>, so gibt der Satz \u201e<var>q</var>\u201c dem Satz \u201e<var>p</var>\u201c die Wahrscheinlichkeit 1. Die Gewissheit des logischen Schlusses ist ein Grenzfall der Wahrscheinlichkeit.</p><p>(Anwendung auf Tautologie und Kontradiktion.)</p>",
                      "en": "<p>When propositions have no truth-arguments in common with one another, we call them independent of one another.</p><p>Two elementary propositions give one another the probability \u00bd.</p><p>If <var>p</var> follows from <var>q</var>, then the proposition \u2018<var>q</var>\u2019 gives to the proposition \u2018<var>p</var>\u2019 the probability 1. The certainty of logical inference is a limiting case of probability.</p><p>(Application of this to tautology and contradiction.)</p>"
                    },
                    "empty": false,
                    "key": "5.1.5.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Ein Satz ist an sich weder wahrscheinlich noch unwahrscheinlich. Ein Ereignis trifft ein, oder es trifft nicht ein, ein Mittelding gibt es nicht.</p>",
                      "en": "<p>In itself, a proposition is neither probable nor improbable. Either an event occurs or it does not: there is no middle way.</p>"
                    },
                    "empty": false,
                    "key": "5.1.5.3",
                    "sub_key": "3"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>In einer Urne seien gleichviel wei\u00dfe und schwarze Kugeln (und keine anderen). Ich ziehe eine Kugel nach der anderen und lege sie wieder in die Urne zur\u00fcck. Dann kann ich durch den Versuch feststellen, dass sich die Zahlen der gezogenen schwarzen und wei\u00dfen Kugeln bei fortgesetztem Ziehen einander n\u00e4hern.</p><p><em class=\"germph\">Das</em> ist also kein mathematisches Faktum.</p><p>Wenn ich nun sage: Es ist gleich wahrscheinlich, dass ich eine wei\u00dfe Kugel wie eine schwarze ziehen werde, so hei\u00dft das: Alle mir bekannten Umst\u00e4nde (die hypothetisch angenommenen Naturgesetze mitinbegriffen) geben dem Eintreffen des einen Ereignisses nicht <em class=\"germph\">mehr</em> Wahrscheinlichkeit als dem Eintreffen des anderen. Das hei\u00dft, sie geben\u2014wie aus den obigen Erkl\u00e4rungen leicht zu entnehmen ist\u2014jedem die Wahrscheinlichkeit \u00bd.</p><p>Was ich durch den Versuch best\u00e4tige ist, dass das Eintreffen der beiden Ereignisse von den Umst\u00e4nden, die ich nicht n\u00e4her kenne, unabh\u00e4ngig ist.</p>",
                      "en": "<p>Suppose that an urn contains black and white balls in equal numbers (and none of any other kind). I draw one ball after another, putting them back into the urn. By this experiment I can establish that the number of black balls drawn and the number of white balls drawn approximate to one another as the draw continues.</p><p>So <em>this</em> is not a mathematical truth.</p><p>Now, if I say, \u2018The probability of my drawing a white ball is equal to the probability of my drawing a black one\u2019, this means that all the circumstances that I know of (including the laws of nature assumed as hypotheses) give no <em>more</em> probability to the occurrence of the one event than to that of the other. That is to say, they give each the probability \u00bd, as can easily be gathered from the above definitions.</p><p>What I confirm by the experiment is that the occurrence of the two events is independent of the circumstances of which I have no more detailed knowledge.</p>"
                    },
                    "empty": false,
                    "key": "5.1.5.4",
                    "sub_key": "4"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die Einheit des Wahrscheinlichkeitssatzes ist: Die Umst\u00e4nde\u2014die ich sonst nicht weiter kenne\u2014geben dem Eintreffen eines bestimmten Ereignisses den und den Grad der Wahrscheinlichkeit.</p>",
                      "en": "<p>The minimal unit for a probability proposition is this: The circumstances\u2014of which I have no further knowledge\u2014give such and such a degree of probability to the occurrence of a particular event.</p>"
                    },
                    "empty": false,
                    "key": "5.1.5.5",
                    "sub_key": "5"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>So ist die Wahrscheinlichkeit eine Verallgemeinerung.</p><p>Sie involviert eine allgemeine Beschreibung einer Satzform.</p><p>Nur in Ermanglung der Gewissheit gebrauchen wir die Wahrscheinlichkeit.\u2014Wenn wir zwar eine Tatsache nicht vollkommen kennen, wohl aber <em class=\"germph\">etwas</em> \u00fcber ihre Form wissen.</p><p>(Ein Satz kann zwar ein unvollst\u00e4ndiges Bild einer gewissen Sachlage sein, aber er ist immer <em class=\"germph\">ein</em> vollst\u00e4ndiges Bild.)</p><p>Der Wahrscheinlichkeitssatz ist gleichsam ein Auszug aus anderen S\u00e4tzen.</p>",
                      "en": "<p>It is in this way that probability is a generalization.</p><p>It involves a general description of a propositional form.</p><p>We use probability only in default of certainty\u2014if our knowledge of a fact is not indeed complete, but we do know <em>something</em> about its form.</p><p>(A proposition may well be an incomplete picture of a certain situation, but it is always a complete picture of <em>something</em>.)</p><p>A probability proposition is a sort of excerpt from other propositions.</p>"
                    },
                    "empty": false,
                    "key": "5.1.5.6",
                    "sub_key": "6"
                  }
                ],
                "content": {
                  "de": "<p>Ist <span class=\"mathrm\">W</span><sub><var>r</var></sub> die Anzahl der Wahrheitsgr\u00fcnde des Satzes \u201e<var>r</var>\u201c, <span class=\"mathrm\">W</span><sub><var>rs</var></sub> die Anzahl derjenigen Wahrheitsgr\u00fcnde des Satzes \u201e<var>s</var>\u201c, die zugleich Wahrheitsgr\u00fcnde von \u201e<var>r</var>\u201c sind, dann nennen wir das Verh\u00e4ltnis: <span class=\"mathrm\">W</span><sub><var>rs</var></sub> : <span class=\"mathrm\">W</span><sub><var>r</var></sub> das Ma\u00df der <em class=\"germph\">Wahrscheinlichkeit</em>, welche der Satz \u201e<var>r</var>\u201c dem Satz \u201e<var>s</var>\u201c gibt.</p>",
                  "en": "<p>If <span class=\"mathrm\">T</span><sub><var>r</var></sub> is the number of the truth-grounds of a proposition \u2018<var>r</var>\u2019, and if <span class=\"mathrm\">T</span><sub><var>rs</var></sub> is the number of the truth-grounds of a proposition \u2018<var>s</var>\u2019 that are at the same time truth-grounds of \u2018<var>r</var>\u2019, then we call the ratio <span class=\"mathrm\">T</span><sub><var>rs</var></sub> : <span class=\"mathrm\">T</span><sub><var>r</var></sub> the degree of probability that the proposition \u2018<var>r</var>\u2019 gives to the proposition \u2018<var>s</var>\u2019.</p>"
                },
                "empty": false,
                "key": "5.1.5",
                "sub_key": "5"
              }
            ],
            "content": {
              "de": "<p>Die Wahrheitsfunktionen lassen sich in Reihen ordnen.</p><p>Das ist die Grundlage der Wahrscheinlichkeitslehre.</p>",
              "en": "<p>Truth-functions can be arranged in series.</p><p>That is the foundation of the theory of probability.</p>"
            },
            "empty": false,
            "key": "5.1",
            "sub_key": "1"
          }, {
            "children": [
              {
                "children": [],
                "content": {
                  "de": "<p>Wir k\u00f6nnen diese internen Beziehungen dadurch in unserer Ausdrucksweise hervorheben, dass wir einen Satz als Resultat einer Operation darstellen, die ihn aus anderen S\u00e4tzen (den Basen der Operation) hervorbringt.</p>",
                  "en": "<p>In order to give prominence to these internal relations we can adopt the following mode of expression: we can represent a proposition as the result of an operation that produces it out of other propositions (which are the bases of the operation).</p>"
                },
                "empty": false,
                "key": "5.2.1",
                "sub_key": "1"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Die Operation ist der Ausdruck einer Beziehung zwischen den Strukturen ihres Resultats und ihrer Basen.</p>",
                  "en": "<p>An operation is the expression of a relation between the structures of its result and of its bases.</p>"
                },
                "empty": false,
                "key": "5.2.2",
                "sub_key": "2"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Und das wird nat\u00fcrlich von ihren formalen Eigenschaften, von der internen \u00c4hnlichkeit ihrer Formen abh\u00e4ngen.</p>",
                      "en": "<p>And that will, of course, depend on their formal properties, on the internal similarity of their forms.</p>"
                    },
                    "empty": false,
                    "key": "5.2.3.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die interne Relation, die eine Reihe ordnet, ist \u00e4quivalent mit der Operation, durch welche ein Glied aus dem anderen entsteht.</p>",
                      "en": "<p>The internal relation by which a series is ordered is equivalent to the operation that produces one term from another.</p>"
                    },
                    "empty": false,
                    "key": "5.2.3.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die Operation kann erst dort auftreten, wo ein Satz auf logisch bedeutungsvolle Weise aus einem anderen entsteht. Also dort, wo die logische Konstruktion des Satzes anf\u00e4ngt.</p>",
                      "en": "<p>Operations cannot make their appearance before the point at which one proposition is generated out of another in a logically meaningful way; i.e. the point at which the logical construction of propositions begins.</p>"
                    },
                    "empty": false,
                    "key": "5.2.3.3",
                    "sub_key": "3"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Der Sinn einer Wahrheitsfunktion von <var>p</var> ist eine Funktion des Sinnes von <var>p</var>.</p><p>Verneinung, logische Addition, logische Multiplikation, etc., etc. sind Operationen.</p><p>(Die Verneinung verkehrt den Sinn des Satzes.)</p>",
                          "en": "<p>The sense of a truth-function of <var>p</var> is a function of the sense of <var>p</var>.</p><p>Negation, logical addition, logical multiplication, etc. etc. are operations.</p><p>(Negation reverses the sense of a proposition.)</p>"
                        },
                        "empty": false,
                        "key": "5.2.3.4.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Die Wahrheitsfunktionen der Elementars\u00e4tze sind Resultate von Operationen, die die Elementars\u00e4tze als Basen haben. (Ich nenne diese Operationen Wahrheitsoperationen.)</p>",
                      "en": "<p>Truth-functions of elementary propositions are results of operations with elementary propositions as bases. (These operations I call truth-operations.)</p>"
                    },
                    "empty": false,
                    "key": "5.2.3.4",
                    "sub_key": "4"
                  }
                ],
                "content": {
                  "de": "<p>Die Operation ist das, was mit dem einen Satz geschehen muss, um aus ihm den anderen zu machen.</p>",
                  "en": "<p>The operation is what has to be done to the one proposition in order to make the other out of it.</p>"
                },
                "empty": false,
                "key": "5.2.3",
                "sub_key": "3"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Die Operation kennzeichnet keine Form, sondern nur den Unterschied der Formen.</p>",
                      "en": "<p>An operation is not the mark of a form, but only of a difference between forms.</p>"
                    },
                    "empty": false,
                    "key": "5.2.4.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Dieselbe Operation, die \u201e<var>q</var>\u201c aus \u201e<var>p</var>\u201c macht, macht aus \u201e<var>q</var>\u201c \u201e<var>r</var>\u201c u. s. f. Dies kann nur darin ausgedr\u00fcckt sein, dass \u201e<var>p</var>\u201c, \u201e<var>q</var>\u201c, \u201e<var>r</var>\u201c, etc. Variable sind, die gewisse formale Relationen allgemein zum Ausdruck bringen.</p>",
                      "en": "<p>The operation that produces \u2018<var>q</var>\u2019 from \u2018<var>p</var>\u2019 also produces \u2018<var>r</var>\u2019 from \u2018<var>q</var>\u2019, and so on. There is only one way of expressing this: \u2018<var>p</var>\u2019, \u2018<var>q</var>\u2019, \u2018<var>r</var>\u2019, etc. have to be variables that give expression in a general way to certain formal relations.</p>"
                    },
                    "empty": false,
                    "key": "5.2.4.2",
                    "sub_key": "2"
                  }
                ],
                "content": {
                  "de": "<p>Die Operation zeigt sich in einer Variablen; sie zeigt, wie man von einer Form von S\u00e4tzen zu einer anderen gelangen kann.</p><p>Sie bringt den Unterschied der Formen zum Ausdruck.</p><p>(Und das Gemeinsame zwischen den Basen und dem Resultat der Operation sind eben die Basen.)</p>",
                  "en": "<p>An operation manifests itself in a variable; it shows how we can get from one form of proposition to another.</p><p>It gives expression to the difference between the forms.</p><p>(And what the bases of an operation and its result have in common is just the bases themselves.)</p>"
                },
                "empty": false,
                "key": "5.2.4",
                "sub_key": "4"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Eine Funktion kann nicht ihr eigenes Argument sein, wohl aber kann das Resultat einer Operation ihre eigene Basis werden.</p>",
                      "en": "<p>A function cannot be its own argument, whereas an operation can take one of its own results as its base.</p>"
                    },
                    "empty": false,
                    "key": "5.2.5.1",
                    "sub_key": "1"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Die fortgesetzte Anwendung einer Operation auf ihr eigenes Resultat nenne ich ihre successive Anwendung (\u201e<span class=\"mathop\"><span class=\"mathrm\"><var>O</var>\u2019</span></span><span class=\"mathop\"><span class=\"mathrm\"><var>O</var>\u2019</span></span><span class=\"mathop\"><span class=\"mathrm\"><var>O</var>\u2019</span></span><var>a</var>\u201c ist das Resultat der dreimaligen successiven Anwendung von \u201e<span class=\"mathop\"><span class=\"mathrm\"><var>O</var>\u2019</span></span><var class=\"pushvar\">\u03be</var>\u201c auf \u201e<var>a</var>\u201c).</p><p>In einem \u00e4hnlichen Sinne rede ich von der successiven Anwendung <em class=\"germph\">mehrerer</em> Operationen auf eine Anzahl von S\u00e4tzen.</p>",
                          "en": "<p>If an operation is applied repeatedly to its own results, I speak of successive applications of it. (\u2018<span class=\"mathop\"><span class=\"mathrm\"><var>O</var>\u2019</span></span><span class=\"mathop\"><span class=\"mathrm\"><var>O</var>\u2019</span></span><span class=\"mathop\"><span class=\"mathrm\"><var>O</var>\u2019</span></span><var>a</var>\u2019 is the result of three successive applications of the operation \u2018<span class=\"mathop\"><span class=\"mathrm\"><var>O</var>\u2019</span></span><var class=\"pushvar\">\u03be</var>\u2019 to \u2018<var>a</var>\u2019.)</p><p>In a similar sense I speak of successive applications of <em>more than one</em> operation to a number of propositions.</p>"
                        },
                        "empty": false,
                        "key": "5.2.5.2.1",
                        "sub_key": "1"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Das allgemeine Glied einer Formenreihe <var>a</var>,  <span class=\"mathop\"><span class=\"mathrm\"><var>O</var>\u2019</span></span><var>a</var>,  <span class=\"mathop\"><span class=\"mathrm\"><var>O</var>\u2019</span></span><span class=\"mathop\"><span class=\"mathrm\"><var>O</var>\u2019</span></span><var>a</var>,<span class=\"mathrel\">\u2026</span> schreibe ich daher so: \u201e[<var>a</var>,  <var>x</var>,  <span class=\"mathop\"><span class=\"mathrm\"><var>O</var>\u2019</span></span><var>x</var>]\u201c. Dieser Klammerausdruck ist eine Variable. Das erste Glied des Klammerausdruckes ist der Anfang der Formenreihe, das zweite die Form eines beliebigen Gliedes <var>x</var> der Reihe und das dritte die Form desjenigen Gliedes der Reihe, welches auf <var>x</var> unmittelbar folgt.</p>",
                          "en": "<p>Accordingly I use the sign \u2018[<var>a</var>,  <var>x</var>,  <span class=\"mathop\"><span class=\"mathrm\"><var>O</var>\u2019</span></span><var>x</var>]\u2019 for the general term of the series of forms <var>a</var>,  <span class=\"mathop\"><span class=\"mathrm\"><var>O</var>\u2019</span></span><var>a</var>,  <span class=\"mathop\"><span class=\"mathrm\"><var>O</var>\u2019</span></span><span class=\"mathop\"><span class=\"mathrm\"><var>O</var>\u2019</span></span><var>a</var>,<span class=\"mathrel\">\u2026</span>. This bracketed expression is a variable: the first term of the bracketed expression is the beginning of the series of forms, the second is the form of a term <var>x</var> arbitrarily selected from the series, and the third is the form of the term that immediately follows <var>x</var> in the series.</p>"
                        },
                        "empty": false,
                        "key": "5.2.5.2.2",
                        "sub_key": "2"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Der Begriff der successiven Anwendung der Operation ist \u00e4quivalent mit dem Begriff \u201eund so weiter\u201c.</p>",
                          "en": "<p>The concept of successive applications of an operation is equivalent to the concept \u2018and so on\u2019.</p>"
                        },
                        "empty": false,
                        "key": "5.2.5.2.3",
                        "sub_key": "3"
                      }
                    ],
                    "content": {
                      "de": "<p>Nur so ist das Fortschreiten von Glied zu Glied in einer Formenreihe (von Type zu Type in den Hierarchien Russells und Whiteheads) m\u00f6glich. (Russell und Whitehead haben die M\u00f6glichkeit dieses Fortschreitens nicht zugegeben, aber immer wieder von ihr Gebrauch gemacht.)</p>",
                      "en": "<p>It is only in this way that the step from one term of a series of forms to another is possible (from one type to another in the hierarchies of Russell and Whitehead). (Russell and Whitehead did not admit the possibility of such steps, but repeatedly availed themselves of it.)</p>"
                    },
                    "empty": false,
                    "key": "5.2.5.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Eine Operation kann die Wirkung einer anderen r\u00fcckg\u00e4ngig machen. Operationen k\u00f6nnen einander aufheben.</p>",
                      "en": "<p>One operation can counteract the effect of another. Operations can cancel one another.</p>"
                    },
                    "empty": false,
                    "key": "5.2.5.3",
                    "sub_key": "3"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die Operation kann verschwinden (z. B. die Verneinung in \u201e<span class=\"mathop\">~</span><span class=\"mathop\">~</span><var>p</var>\u201c: <span class=\"mathop\">~</span><span class=\"mathop\">~</span><var>p</var><span class=\"mathrel\">=</span><var>p</var>).</p>",
                      "en": "<p>An operation can vanish (e.g. negation in \u2018<span class=\"mathop\">~</span><span class=\"mathop\">~</span><var>p</var>\u2019: <span class=\"mathop\">~</span><span class=\"mathop\">~</span><var>p</var><span class=\"mathrel\">=</span><var>p</var>).</p>"
                    },
                    "empty": false,
                    "key": "5.2.5.4",
                    "sub_key": "4"
                  }
                ],
                "content": {
                  "de": "<p>Das Vorkommen der Operation charakterisiert den Sinn des Satzes nicht.</p><p>Die Operation sagt ja nichts aus, nur ihr Resultat, und dies h\u00e4ngt von den Basen der Operation ab.</p><p>(Operation und Funktion d\u00fcrfen nicht miteinander verwechselt werden.)</p>",
                  "en": "<p>The occurrence of an operation does not characterize the sense of a proposition.</p><p>Indeed, no statement is made by an operation, but only by its result, and this depends on the bases of the operation.</p><p>(Operations and functions must not be confused with each other.)</p>"
                },
                "empty": false,
                "key": "5.2.5",
                "sub_key": "5"
              }
            ],
            "content": {
              "de": "<p>Die Strukturen der S\u00e4tze stehen in internen Beziehungen zu einander.</p>",
              "en": "<p>The structures of propositions stand in internal relations to one another.</p>"
            },
            "empty": false,
            "key": "5.2",
            "sub_key": "2"
          }, {
            "children": [
              {
                "children": [],
                "content": {
                  "de": "<p>Die Schemata No. 4.31 haben auch dann eine Bedeutung, wenn \u201e<var>p</var>\u201c, \u201e<var>q</var>\u201c, \u201e<var>r</var>\u201c, etc. nicht Elementars\u00e4tze sind.</p><p>Und es ist leicht zu sehen, dass das Satzzeichen in No. 4.442, auch wenn \u201e<var>p</var>\u201c und \u201e<var>q</var>\u201c Wahrheitsfunktionen von Elementars\u00e4tzen sind, Eine Wahrheitsfunktion von Elementars\u00e4tzen ausdr\u00fcckt.</p>",
                  "en": "<p>The schemata in 4.31 have a meaning even when \u2018<var>p</var>\u2019, \u2018<var>q</var>\u2019, \u2018<var>r</var>\u2019, etc. are not elementary propositions.</p><p>And it is easy to see that the propositional sign in 4.442 expresses a single truth-function of elementary propositions even when \u2018<var>p</var>\u2019 and \u2018<var>q</var>\u2019 are truth-functions of elementary propositions.</p>"
                },
                "empty": false,
                "key": "5.3.1",
                "sub_key": "1"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Alle Wahrheitsfunktionen sind Resultate der successiven Anwendung einer endlichen Anzahl von Wahrheitsoperationen auf die Elementars\u00e4tze.</p>",
                  "en": "<p>All truth-functions are results of successive applications to elementary propositions of a finite number of truth-operations.</p>"
                },
                "empty": false,
                "key": "5.3.2",
                "sub_key": "2"
              }
            ],
            "content": {
              "de": "<p>Alle S\u00e4tze sind Resultate von Wahrheitsoperationen mit den Elementars\u00e4tzen.</p><p>Die Wahrheitsoperation ist die Art und Weise, wie aus den Elementars\u00e4tzen die Wahrheitsfunktion entsteht.</p><p>Nach dem Wesen der Wahrheitsoperation wird auf die gleiche Weise, wie aus den Elementars\u00e4tzen ihre Wahrheitsfunktion, aus Wahrheitsfunktionen eine neue. Jede Wahrheitsoperation erzeugt aus Wahrheitsfunktionen von Elementars\u00e4tzen wieder eine Wahrheitsfunktion von Elementars\u00e4tzen, einen Satz. Das Resultat jeder Wahrheitsoperation mit den Resultaten von Wahrheitsoperationen mit Elementars\u00e4tzen ist wieder das Resultat <em class=\"germph\">Einer</em> Wahrheitsoperation mit Elementars\u00e4tzen.</p><p>Jeder Satz ist das Resultat von Wahrheitsoperationen mit Elementars\u00e4tzen.</p>",
              "en": "<p>All propositions are results of truth-operations on elementary propositions.</p><p>A truth-operation is the way in which a truth-function is produced out of elementary propositions.</p><p>It is of the essence of truth-operations that, just as elementary propositions yield a truth-function of themselves, so too in the same way truth-functions yield a further truth-function. When a truth-operation is applied to truth-functions of elementary propositions, it always generates another truth-function of elementary propositions, another proposition. When a truth-operation is applied to the results of truth-operations on elementary propositions, there is always a <em>single</em> operation on elementary propositions that has the same result.</p><p>Every proposition is the result of truth-operations on elementary propositions.</p>"
            },
            "empty": false,
            "key": "5.3",
            "sub_key": "3"
          }, {
            "children": [
              {
                "children": [],
                "content": {
                  "de": "<p>Denn: Alle Resultate von Wahrheitsoperationen mit Wahrheitsfunktionen sind identisch, welche eine und dieselbe Wahrheitsfunktion von Elementars\u00e4tzen sind.</p>",
                  "en": "<p>The reason is that the results of truth-operations on truth-functions are always identical whenever they are one and the same truth-function of elementary propositions.</p>"
                },
                "empty": false,
                "key": "5.4.1",
                "sub_key": "1"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Dass <span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span>, <span class=\"mathrel\"><span class=\"symbol\">\u2283</span></span>, etc. nicht Beziehungen im Sinne von rechts und links etc. sind, leuchtet ein.</p><p>Die M\u00f6glichkeit des kreuzweisen Definierens der logischen \u201eUrzeichen\u201c Freges und Russells zeigt schon, dass diese keine Urzeichen sind, und schon erst recht, dass sie keine Relationen bezeichnen.</p><p>Und es ist offenbar, dass das \u201e<span class=\"symbol\">\u2283</span>\u201c, welches wir durch \u201e<span class=\"mathop\">~</span>\u201c und \u201e<span class=\"symbol\">\u2228</span>\u201c definieren, identisch ist mit dem, durch welches wir \u201e<span class=\"symbol\">\u2228</span>\u201c mit \u201e<span class=\"mathop\">~</span>\u201c definieren, und dass dieses \u201e<span class=\"symbol\">\u2228</span>\u201c mit dem ersten identisch ist. U. s. w.</p>",
                  "en": "<p>It is self-evident that <span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span>, <span class=\"mathrel\"><span class=\"symbol\">\u2283</span></span>, etc. are not relations in the sense in which right and left etc. are relations.</p><p>The interdefinability of Frege\u2019s and Russell\u2019s \u2018primitive signs\u2019 of logic is enough to show that they are not primitive signs, still less signs for relations.</p><p>And it is obvious that the \u2018<span class=\"symbol\">\u2283</span>\u2019 defined by means of \u2018<span class=\"mathop\">~</span>\u2019 and \u2018<span class=\"symbol\">\u2228</span>\u2019 is identical with the one that figures with \u2018<span class=\"mathop\">~</span>\u2019 in the definition of \u2018<span class=\"symbol\">\u2228</span>\u2019; and that the second \u2018<span class=\"symbol\">\u2228</span>\u2019 is identical with the first one; and so on.</p>"
                },
                "empty": false,
                "key": "5.4.2",
                "sub_key": "2"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Dass aus einer Tatsache <var>p</var> unendlich viele <em class=\"germph\">andere</em> folgen sollten, n\u00e4mlich <span class=\"mathop\">~</span><span class=\"mathop\">~</span><var>p</var>, <span class=\"mathop\">~</span><span class=\"mathop\">~</span><span class=\"mathop\">~</span><span class=\"mathop\">~</span><var>p</var>, etc., ist doch von vornherein kaum zu glauben. Und nicht weniger merkw\u00fcrdig ist, dass die unendliche Anzahl der S\u00e4tze der Logik (der Mathematik) aus einem halben Dutzend \u201eGrundgesetzen\u201c folgen.</p><p>Alle S\u00e4tze der Logik sagen aber dasselbe. N\u00e4mlich nichts.</p>",
                  "en": "<p>Even at first sight it seems scarcely credible that there should follow from one fact <var>p</var> infinitely many <em>others</em>, namely <span class=\"mathop\">~</span><span class=\"mathop\">~</span><var>p</var>, <span class=\"mathop\">~</span><span class=\"mathop\">~</span><span class=\"mathop\">~</span><span class=\"mathop\">~</span><var>p</var>, etc. And it is no less remarkable that the infinite number of propositions of logic (mathematics) follow from half a dozen \u2018primitive propositions\u2019.</p><p>But in fact all the propositions of logic say the same thing, to wit nothing.</p>"
                },
                "empty": false,
                "key": "5.4.3",
                "sub_key": "3"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Dieses Verschwinden der scheinbaren logischen Konstanten tritt auch ein, wenn \u201e<span class=\"mathop\">~</span><span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>).</span><span class=\"mathop\">~</span><var>fx</var>\u201c dasselbe sagt wie \u201e<span class=\"quant\">(<var>x</var>).</span><var>fx</var>\u201c, oder \u201e<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>).</span><var>fx</var><span class=\"mathrel\">.</span><var>x</var><span class=\"mathrel\">=</span><var>a</var>\u201c dasselbe wie \u201e<var>fa</var>\u201c.</p>",
                      "en": "<p>This vanishing of the apparent logical constants also occurs in the case of \u2018<span class=\"mathop\">~</span><span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>).</span><span class=\"mathop\">~</span><var>fx</var>\u2019, which says the same as \u2018<span class=\"quant\">(<var>x</var>).</span><var>fx</var>\u2019, and in the case of \u2018<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>).</span><var>fx</var><span class=\"mathrel\">.</span><var>x</var><span class=\"mathrel\">=</span><var>a</var>\u2019, which says the same as \u2018<var>fa</var>\u2019.</p>"
                    },
                    "empty": false,
                    "key": "5.4.4.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Wenn uns ein Satz gegeben ist, so sind <em class=\"germph\">mit ihm</em> auch schon die Resultate aller Wahrheitsoperationen, die ihn zur Basis haben, gegeben.</p>",
                      "en": "<p>If we are given a proposition, then <em>with it</em> we are also given the results of all truth-operations that have it as their base.</p>"
                    },
                    "empty": false,
                    "key": "5.4.4.2",
                    "sub_key": "2"
                  }
                ],
                "content": {
                  "de": "<p>Die Wahrheitsfunktionen sind keine materiellen Funktionen.</p><p>Wenn man z. B. eine Bejahung durch doppelte Verneinung erzeugen kann, ist dann die Verneinung\u2014in irgend einem Sinn\u2014in der Bejahung enthalten? Verneint \u201e<span class=\"mathop\">~</span><span class=\"mathop\">~</span><var>p</var>\u201c <span class=\"mathop\">~</span><var>p</var>, oder bejaht es <var>p</var>; oder beides?</p><p>Der Satz \u201e<span class=\"mathop\">~</span><span class=\"mathop\">~</span><var>p</var>\u201c handelt nicht von der Verneinung wie von einem Gegenstand; wohl aber ist die M\u00f6glichkeit der Verneinung in der Bejahung bereits pr\u00e4judiziert.</p><p>Und g\u00e4be es einen Gegenstand, der \u201e<span class=\"mathop\">~</span>\u201c hie\u00dfe, so m\u00fcsste \u201e<span class=\"mathop\">~</span><span class=\"mathop\">~</span><var>p</var>\u201c etwas anderes sagen als \u201e<var>p</var>\u201c. Denn der eine Satz w\u00fcrde dann eben von <span class=\"mathop\">~</span> handeln, der andere nicht.</p>",
                  "en": "<p>Truth-functions are not material functions.</p><p>For example, an affirmation can be produced by double negation: in such a case does it follow that in some sense negation is contained in affirmation? Does \u2018<span class=\"mathop\">~</span><span class=\"mathop\">~</span><var>p</var>\u2019 negate <span class=\"mathop\">~</span><var>p</var>, or does it affirm <var>p</var>\u2014or both?</p><p>The proposition \u2018<span class=\"mathop\">~</span><span class=\"mathop\">~</span><var>p</var>\u2019 is not about negation, as if negation were an object: on the other hand, the possibility of negation is already written into affirmation.</p><p>And if there were an object called \u2018<span class=\"mathop\">~</span>\u2019, it would follow that \u2018<span class=\"mathop\">~</span><span class=\"mathop\">~</span><var>p</var>\u2019 said something different from what \u2018<var>p</var>\u2019 said, just because the one proposition would then be about <span class=\"mathop\">~</span> and the other would not.</p>"
                },
                "empty": false,
                "key": "5.4.4",
                "sub_key": "4"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Hat die Logik Grundbegriffe, so m\u00fcssen sie von einander unabh\u00e4ngig sein. Ist ein Grundbegriff eingef\u00fchrt, so muss er in allen Verbindungen eingef\u00fchrt sein, worin er \u00fcberhaupt vorkommt. Man kann ihn also nicht zuerst f\u00fcr <em class=\"germph\">eine</em> Verbindung, dann noch einmal f\u00fcr eine andere einf\u00fchren. Z. B.: Ist die Verneinung eingef\u00fchrt, so m\u00fcssen wir sie jetzt in S\u00e4tzen von der Form \u201e<span class=\"mathop\">~</span><var>p</var>\u201c ebenso verstehen, wie in S\u00e4tzen wie \u201e<span class=\"mathop\">~</span>(<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><var>q</var>)\u201c, \u201e<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>).</span><span class=\"mathop\">~</span><var>fx</var>\u201c u.&nbsp;a. Wir d\u00fcrfen sie nicht erst f\u00fcr die eine Klasse von F\u00e4llen, dann f\u00fcr die andere einf\u00fchren, denn es bliebe dann zweifelhaft, ob ihre Bedeutung in beiden F\u00e4llen die gleiche w\u00e4re und es w\u00e4re kein Grund vorhanden, in beiden F\u00e4llen dieselbe Art der Zeichenverbindung zu ben\u00fctzen.</p><p>(Kurz, f\u00fcr die Einf\u00fchrung der Urzeichen gilt, mutatis mutandis, dasselbe, was Frege (\u201eGrundgesetze der Arithmetik\u201c) f\u00fcr die Einf\u00fchrung von Zeichen durch Definitionen gesagt hat.)</p>",
                      "en": "<p>If logic has primitive ideas, they must be independent of one another. If a primitive idea has been introduced, it must have been introduced in all the combinations in which it ever occurs. It cannot, therefore, be introduced first for <em>one</em> combination and later reintroduced for another. For example, once negation has been introduced, we must understand it both in propositions of the form \u2018<span class=\"mathop\">~</span><var>p</var>\u2019 and in propositions like \u2018<span class=\"mathop\">~</span>(<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><var>q</var>)\u2019, \u2018<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>).</span><span class=\"mathop\">~</span><var>fx</var>\u2019, etc. We must not introduce it first for the one class of cases and then for the other, since it would then be left in doubt whether its meaning were the same in both cases, and no reason would have been given for combining the signs in the same way in both cases.</p><p>(In short, Frege\u2019s remarks about introducing signs by means of definitions (in <i>The Fundamental Laws of Arithmetic</i>) also apply, <em>mutatis mutandis</em>, to the introduction of primitive signs.)</p>"
                    },
                    "empty": false,
                    "key": "5.4.5.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die Einf\u00fchrung eines neuen Behelfes in den Symbolismus der Logik muss immer ein folgenschweres Ereignis sein. Kein neuer Behelf darf in die Logik\u2014sozusagen, mit ganz unschuldiger Miene\u2014in Klammern oder unter dem Striche eingef\u00fchrt werden.</p><p>(So kommen in den \u201ePrincipia Mathematica\u201c von Russell und Whitehead Definitionen und Grundgesetze in Worten vor. Warum hier pl\u00f6tzlich Worte? Dies bed\u00fcrfte einer Rechtfertigung. Sie fehlt und muss fehlen, da das Vorgehen tats\u00e4chlich unerlaubt ist.)</p><p>Hat sich aber die Einf\u00fchrung eines neuen Behelfes an einer Stelle als n\u00f6tig erwiesen, so muss man sich nun sofort fragen: Wo muss dieser Behelf nun <em class=\"germph\">immer</em> angewandt werden? Seine Stellung in der Logik muss nun erkl\u00e4rt werden.</p>",
                      "en": "<p>The introduction of any new device into the symbolism of logic is necessarily a momentous event. In logic a new device should not be introduced in brackets or in a footnote with what one might call a completely innocent air.</p><p>(Thus in Russell and Whitehead\u2019s <i>Principia Mathematica</i> there occur definitions and primitive propositions expressed in words. Why this sudden appearance of words? It would require a justification, but none is given, or could be given, since the procedure is in fact illicit.)</p><p>But if the introduction of a new device has proved necessary at a certain point, we must immediately ask ourselves, \u2018At what points is the employment of this device now <em>unavoidable</em>?\u2019 and its place in logic must be made clear.</p>"
                    },
                    "empty": false,
                    "key": "5.4.5.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Alle Zahlen der Logik m\u00fcssen sich rechtfertigen lassen.</p><p>Oder vielmehr: Es muss sich herausstellen, dass es in der Logik keine Zahlen gibt.</p><p>Es gibt keine ausgezeichneten Zahlen.</p>",
                      "en": "<p>All numbers in logic stand in need of justification.</p><p>Or rather, it must become evident that there are no numbers in logic.</p><p>There are no privileged numbers.</p>"
                    },
                    "empty": false,
                    "key": "5.4.5.3",
                    "sub_key": "3"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Die L\u00f6sungen der logischen Probleme m\u00fcssen einfach sein, denn sie setzen den Standard der Einfachheit.</p><p>Die Menschen haben immer geahnt, dass es ein Gebiet von Fragen geben m\u00fcsse, deren Antworten\u2014a priori\u2014symmetrisch, und zu einem abgeschlossenen, regelm\u00e4\u00dfigen Gebilde vereint liegen.</p><p>Ein Gebiet, in dem der Satz gilt: simplex sigillum veri.</p>",
                          "en": "<p>The solutions of the problems of logic must be simple, since they set the standard of simplicity.</p><p>Men have always had a presentiment that there must be a realm in which the answers to questions are symmetrically combined\u2014<em>a priori</em>\u2014to form a self-contained system.</p><p>A realm subject to the law: <em>Simplex sigillum veri</em>.</p>"
                        },
                        "empty": false,
                        "key": "5.4.5.4.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>In der Logik gibt es kein Nebeneinander, kann es keine Klassifikation geben.</p><p>In der Logik kann es nicht Allgemeineres und Spezielleres geben.</p>",
                      "en": "<p>In logic there is no co-ordinate status, and there can be no classification.</p><p>In logic there can be no distinction between the general and the specific.</p>"
                    },
                    "empty": false,
                    "key": "5.4.5.4",
                    "sub_key": "4"
                  }
                ],
                "content": {
                  "de": "<p>Gibt es logische Urzeichen, so muss eine richtige Logik ihre Stellung zueinander klar machen und ihr Dasein rechtfertigen. Der Bau der Logik <em class=\"germph\">aus</em> ihren Urzeichen muss klar werden.</p>",
                  "en": "<p>If there are primitive logical signs, then any logic that fails to show clearly how they are placed relatively to one another and to justify their existence will be incorrect. The construction of logic <em>out of</em> its primitive signs must be made clear.</p>"
                },
                "empty": false,
                "key": "5.4.5",
                "sub_key": "5"
              }, {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Die logischen Operationszeichen sind Interpunktionen.</p>",
                          "en": "<p>Signs for logical operations are punctuation-marks.</p>"
                        },
                        "empty": false,
                        "key": "5.4.6.1.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Bedeutungsvoll ist die scheinbar unwichtige Tatsache, dass die logischen Scheinbeziehungen, wie <span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span> und <span class=\"mathrel\"><span class=\"symbol\">\u2283</span></span>, der Klammern bed\u00fcrfen\u2014im Gegensatz zu den wirklichen Beziehungen.</p><p>Die Ben\u00fctzung der Klammern mit jenen scheinbaren Urzeichen deutet ja schon darauf hin, dass diese nicht die wirklichen Urzeichen sind. Und es wird doch wohl niemand glauben, dass die Klammern eine selbst\u00e4ndige Bedeutung haben.</p>",
                      "en": "<p>Though it seems unimportant, it is in fact significant that the pseudo-relations of logic, such as <span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span> and <span class=\"mathrel\"><span class=\"symbol\">\u2283</span></span>, need brackets\u2014unlike real relations.</p><p>Indeed, the use of brackets with these apparently primitive signs is itself an indication that they are not primitive signs. And surely no one is going to believe brackets have an independent meaning.</p>"
                    },
                    "empty": false,
                    "key": "5.4.6.1",
                    "sub_key": "1"
                  }
                ],
                "content": {
                  "de": "<p>Wenn man die logischen Zeichen richtig einf\u00fchrte, so h\u00e4tte man damit auch schon den Sinn aller ihrer Kombinationen eingef\u00fchrt; also nicht nur \u201e<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><var>q</var>\u201c sondern auch schon \u201e<span class=\"mathop\">~</span>(<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><span class=\"mathop\">~</span><var>q</var>)\u201c etc. etc. Man h\u00e4tte damit auch schon die Wirkung aller nur m\u00f6glichen Kombinationen von Klammern eingef\u00fchrt. Und damit w\u00e4re es klar geworden, dass die eigentlichen allgemeinen Urzeichen nicht die \u201e<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><var>q</var> \u201c, \u201e<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>).</span><var>fx</var>\u201c, etc. sind, sondern die allgemeinste Form ihrer Kombinationen.</p>",
                  "en": "<p>If we introduced logical signs properly, then we should also have introduced at the same time the sense of all combinations of them; i.e. not only \u2018<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><var>q</var>\u2019 but \u2018<span class=\"mathop\">~</span>(<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><span class=\"mathop\">~</span><var>q</var>)\u2019 as well, etc. etc. We should also have introduced at the same time the effect of all possible combinations of brackets. And thus it would have been made clear that the real general primitive signs are not \u2018<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><var>q</var>\u2019, \u2018<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>).</span><var>fx</var>\u2019, etc. but the most general form of their combinations.</p>"
                },
                "empty": false,
                "key": "5.4.6",
                "sub_key": "6"
              }, {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Das Wesen des Satzes angeben, hei\u00dft, das Wesen aller Beschreibung angeben, also das Wesen der Welt.</p>",
                          "en": "<p>To give the essence of a proposition means to give the essence of all description, and thus the essence of the world.</p>"
                        },
                        "empty": false,
                        "key": "5.4.7.1.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Die allgemeine Satzform ist das Wesen des Satzes.</p>",
                      "en": "<p>The general propositional form is the essence of a proposition.</p>"
                    },
                    "empty": false,
                    "key": "5.4.7.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die Beschreibung der allgemeinsten Satzform ist die Beschreibung des einen und einzigen allgemeinen Urzeichens der Logik.</p>",
                      "en": "<p>The description of the most general propositional form is the description of the one and only general primitive sign in logic.</p>"
                    },
                    "empty": false,
                    "key": "5.4.7.2",
                    "sub_key": "2"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Das Einleuchten, von dem Russell so viel sprach, kann nur dadurch in der Logik entbehrlich werden, dass die Sprache selbst jeden logischen Fehler verhindert.\u2014Dass die Logik a priori ist, besteht darin, dass nicht unlogisch gedacht werden <em class=\"germph\">kann</em>.</p>",
                          "en": "<p>Self-evidence, which Russell talked about so much, can become dispensable in logic, only because language itself prevents every logical mistake.\u2014What makes logic <em>a priori</em> is the <em>impossibility</em> of illogical thought.</p>"
                        },
                        "empty": false,
                        "key": "5.4.7.3.1",
                        "sub_key": "1"
                      }, {
                        "children": [
                          {
                            "children": [],
                            "content": {
                              "de": "<p>Occams Devise ist nat\u00fcrlich keine willk\u00fcrliche, oder durch ihren praktischen Erfolg gerechtfertigte Regel: Sie besagt, dass <em class=\"germph\">unn\u00f6tige</em> Zeicheneinheiten nichts bedeuten.</p><p>Zeichen, die <em class=\"germph\">Einen</em> Zweck erf\u00fcllen, sind logisch \u00e4quivalent, Zeichen, die <em class=\"germph\">keinen</em> Zweck erf\u00fcllen, logisch bedeutungslos.</p>",
                              "en": "<p>Occam\u2019s maxim is, of course, not an arbitrary rule, nor one that is justified by its success in practice: its point is that <em>unnecessary</em> units in a sign-language mean nothing.</p><p>Signs that serve <em>one</em> purpose are logically equivalent, and signs that serve <em>none</em> are logically meaningless.</p>"
                            },
                            "empty": false,
                            "key": "5.4.7.3.2.1",
                            "sub_key": "1"
                          }
                        ],
                        "content": {
                          "de": "<p>Wir k\u00f6nnen einem Zeichen nicht den unrechten Sinn geben.</p>",
                          "en": "<p>We cannot give a sign the wrong sense.</p>"
                        },
                        "empty": false,
                        "key": "5.4.7.3.2",
                        "sub_key": "2"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Frege sagt: Jeder rechtm\u00e4\u00dfig gebildete Satz muss einen Sinn haben; und ich sage: Jeder m\u00f6gliche Satz ist rechtm\u00e4\u00dfig gebildet, und wenn er keinen Sinn hat, so kann das nur daran liegen, dass wir einigen seiner Bestandteile keine <em class=\"germph\">Bedeutung</em> gegeben haben.</p><p>(Wenn wir auch glauben, es getan zu haben.)</p><p>So sagt \u201eSokrates ist identisch\u201c darum nichts, weil wir dem Wort \u201eidentisch\u201c als <em class=\"germph\">Eigenschaftswort</em> <em class=\"germph\">keine</em> Bedeutung gegeben haben. Denn, wenn es als Gleichheitszeichen auftritt, so symbolisiert es auf ganz andere Art und Weise\u2014die bezeichnende Beziehung ist eine andere,\u2014also ist auch das Symbol in beiden F\u00e4llen ganz verschieden; die beiden Symbole haben nur das Zeichen zuf\u00e4llig miteinander gemein.</p>",
                          "en": "<p>Frege says that any legitimately constructed proposition must have a sense. And I say that any possible proposition is legitimately constructed, and, if it has no sense, that can only be because we have failed to give a <em>meaning</em> to some of its constituents.</p><p>(Even if we think that we have done so.)</p><p>Thus the reason why \u2018Socrates is identical\u2019 says nothing is that we have <em>not</em> given any <em>adjectival</em> meaning to the word \u2018identical\u2019. For when it appears as a sign for identity, it symbolizes in an entirely different way\u2014the signifying relation is a different one\u2014therefore the symbols also are entirely different in the two cases: the two symbols have only the sign in common, and that is an accident.</p>"
                        },
                        "empty": false,
                        "key": "5.4.7.3.3",
                        "sub_key": "3"
                      }
                    ],
                    "content": {
                      "de": "<p>Die Logik muss f\u00fcr sich selber sorgen.</p><p>Ein <em class=\"germph\">m\u00f6gliches</em> Zeichen muss auch bezeichnen k\u00f6nnen. Alles was in der Logik m\u00f6glich ist, ist auch erlaubt. (\u201eSokrates ist identisch\u201c hei\u00dft darum nichts, weil es keine Eigenschaft gibt, die \u201eidentisch\u201c hei\u00dft. Der Satz ist unsinnig, weil wir eine willk\u00fcrliche Bestimmung nicht getroffen haben, aber nicht darum, weil das Symbol an und f\u00fcr sich unerlaubt w\u00e4re.)</p><p>Wir k\u00f6nnen uns, in gewissem Sinne, nicht in der Logik irren.</p>",
                      "en": "<p>Logic must look after itself.</p><p>If a sign is <em>possible</em>, then it is also capable of signifying. Whatever is possible in logic is also permitted. (The reason why \u2018Socrates is identical\u2019 means nothing is that there is no property called \u2018identical\u2019. The proposition is nonsensical because we have failed to make an arbitrary determination, and not because the symbol, in itself, would be illegitimate.)</p><p>In a certain sense, we cannot make mistakes in logic.</p>"
                    },
                    "empty": false,
                    "key": "5.4.7.3",
                    "sub_key": "3"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die Anzahl der n\u00f6tigen Grundoperationen h\u00e4ngt <em class=\"germph\">nur</em> von unserer Notation ab.</p>",
                      "en": "<p>The number of fundamental operations that are necessary depends <em>solely</em> on our notation.</p>"
                    },
                    "empty": false,
                    "key": "5.4.7.4",
                    "sub_key": "4"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Es kommt nur darauf an, ein Zeichensystem von einer bestimmten Anzahl von Dimensionen\u2014von einer bestimmten mathematischen Mannigfaltigkeit\u2014zu bilden.</p>",
                      "en": "<p>All that is required is that we should construct a system of signs with a particular number of dimensions\u2014with a particular mathematical multiplicity.</p>"
                    },
                    "empty": false,
                    "key": "5.4.7.5",
                    "sub_key": "5"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Es ist klar, dass es sich hier nicht um eine <em class=\"germph\">Anzahl von Grundbegriffen</em> handelt, die bezeichnet werden m\u00fcssen, sondern um den Ausdruck einer Regel.</p>",
                      "en": "<p>It is clear that this is not a question of a <em>number of primitive ideas</em> that have to be signified, but rather of the expression of a rule.</p>"
                    },
                    "empty": false,
                    "key": "5.4.7.6",
                    "sub_key": "6"
                  }
                ],
                "content": {
                  "de": "<p>Es ist klar, dass alles, was sich \u00fcberhaupt <em class=\"germph\">von vornherein</em> \u00fcber die Form aller S\u00e4tze sagen l\u00e4sst, sich <em class=\"germph\">auf einmal</em> sagen lassen muss.</p><p>Sind ja schon im Elementarsatze alle logischen Operationen enthalten. Denn \u201e<var>fa</var>\u201c sagt dasselbe wie</p><p><div class=\"displaymath\">\u201e<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>).</span><var>fx</var><span class=\"mathrel\">.</span><var>x</var><span class=\"mathrel\">=</span><var>a</var>\u201c.</div></p><p>Wo Zusammengesetztheit ist, da ist Argument und Funktion, und wo diese sind, sind bereits alle logischen Konstanten.</p><p>Man k\u00f6nnte sagen: Die Eine logische Konstante ist das, was <em class=\"germph\">alle</em> S\u00e4tze, ihrer Natur nach, mit einander gemein haben.</p><p>Das aber ist die allgemeine Satzform.</p>",
                  "en": "<p>It is clear that whatever we can say <em>in advance</em> about the form of all propositions, we must be able to say <em>all at once</em>.</p><p>An elementary proposition really contains all logical operations in itself. For \u2018<var>fa</var>\u2019 says the same thing as</p><p><div class=\"displaymath\">\u2018<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>).</span><var>fx</var><span class=\"mathrel\">.</span><var>x</var><span class=\"mathrel\">=</span><var>a</var>\u2019.</div></p><p>Wherever there is compositeness, argument and function are present, and where these are present, we already have all the logical constants.</p><p>One could say that the sole logical constant was what <em>all</em> propositions, by their very nature, had in common with one another.</p><p>But that is the general propositional form.</p>"
                },
                "empty": false,
                "key": "5.4.7",
                "sub_key": "7"
              }
            ],
            "content": {
              "de": "<p>Hier zeigt es sich, dass es \u201elogische Gegenst\u00e4nde\u201c, \u201elogische Konstante\u201c (im Sinne Freges und Russells) nicht gibt.</p>",
              "en": "<p>At this point it becomes manifest that there are no \u2018logical objects\u2019 or \u2018logical constants\u2019 (in Frege\u2019s and Russell\u2019s sense).</p>"
            },
            "empty": false,
            "key": "5.4",
            "sub_key": "4"
          }, {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Einen Klammerausdruck, dessen Glieder S\u00e4tze sind, deute ich\u2014wenn die Reihenfolge der Glieder in der Klammer gleichg\u00fcltig ist\u2014durch ein Zeichen von der Form \u201e(<span class=\"overlined\"><var class=\"pushvar\">\u03be</var></span>)\u201c an. \u201e<var class=\"pushvar\">\u03be</var>\u201c ist eine Variable, deren Werte die Glieder des Klammerausdruckes sind; und der Strich \u00fcber der Variablen deutet an, dass sie ihre s\u00e4mtlichen Werte in der Klammer vertritt.</p><p>(Hat also <var>\u03be</var> etwa die 3 Werte P, Q, R, so ist (<span class=\"overlined\"><var class=\"pushvar\">\u03be</var></span>)<span class=\"mathrel\">=</span>(P, Q, R).)</p><p>Die Werte der Variablen werden festgesetzt.</p><p>Die Festsetzung ist die Beschreibung der S\u00e4tze, welche die Variable vertritt.</p><p>Wie die Beschreibung der Glieder des Klammerausdruckes geschieht, ist unwesentlich.</p><p>Wir <em class=\"germph\">k\u00f6nnen</em> drei Arten der Beschreibung unterscheiden: 1. Die direkte Aufz\u00e4hlung. In diesem Fall k\u00f6nnen wir statt der Variablen einfach ihre konstanten Werte setzen. 2. Die Angabe einer Funktion <var>fx</var>, deren Werte f\u00fcr alle Werte von <var>x</var> die zu beschreibenden S\u00e4tze sind. 3. Die Angabe eines formalen Gesetzes, nach welchem jene S\u00e4tze gebildet sind. In diesem Falle sind die Glieder des Klammerausdrucks s\u00e4mtliche Glieder einer Formenreihe.</p>",
                      "en": "<p>When a bracketed expression has propositions as its terms\u2014and the order of the terms inside the brackets is indifferent\u2014then I indicate it by a sign of the form \u2018(<span class=\"overlined\"><var class=\"pushvar\">\u03be</var></span>)\u2019. \u2018<var class=\"pushvar\">\u03be</var>\u2019 is a variable whose values are terms of the bracketed expression and the bar over the variable indicates that it is the representative of all its values in the brackets.</p><p>(E.g. if <var>\u03be</var> has the three values P, Q, R, then (<span class=\"overlined\"><var class=\"pushvar\">\u03be</var></span>)<span class=\"mathrel\">=</span>(P, Q, R). )</p><p>What the values of the variable are is something that is stipulated.</p><p>The stipulation is a description of the propositions that have the variable as their representative. </p><p>How the description of the terms of the bracketed expression is produced is not essential.</p><p>We <em>can</em> distinguish three kinds of description: 1. direct enumeration, in which case we can simply substitute for the variable the constants that are its values; 2. giving a function <var>fx</var> whose values for all values of <var>x</var> are the propositions to be described; 3. giving a formal law that governs the construction of the propositions, in which case the bracketed expression has as its members all the terms of a series of forms.</p>"
                    },
                    "empty": false,
                    "key": "5.5.0.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Ich schreibe also statt \u201e<span class=\"mathop\">(-----<span class=\"mathrm\">W</span>)</span>(<var class=\"pushvar\">\u03be</var>,&nbsp;.&nbsp;.&nbsp;.&nbsp;.&nbsp;.)\u201c \u201e<span class=\"nop\">N</span>(<span class=\"overlined\"><var class=\"pushvar\">\u03be</var></span>)\u201c.</p><p><span class=\"nop\">N</span>(<span class=\"overlined\"><var class=\"pushvar\">\u03be</var></span>) ist die Negation s\u00e4mtlicher Werte der Satzvariablen <var class=\"pushvar\">\u03be</var>.</p>",
                      "en": "<p>So instead of \u2018<span class=\"mathop\">(-----<span class=\"mathrm\">T</span>)</span>(<var class=\"pushvar\">\u03be</var>,&nbsp;.&nbsp;.&nbsp;.&nbsp;.&nbsp;.)\u2019, I write \u2018<span class=\"nop\">N</span>(<span class=\"overlined\"><var class=\"pushvar\">\u03be</var></span>)\u2019.</p><p><span class=\"nop\">N</span>(<span class=\"overlined\"><var class=\"pushvar\">\u03be</var></span>) is the negation of all the values of the propositional variable <var class=\"pushvar\">\u03be</var>.</p>"
                    },
                    "empty": false,
                    "key": "5.5.0.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Da sich offenbar leicht ausdr\u00fccken l\u00e4\u00dft, wie mit dieser Operation S\u00e4tze gebildet werden k\u00f6nnen und wie S\u00e4tze mit ihr nicht zu bilden sind, so muss dies auch einen exakten Ausdruck finden k\u00f6nnen.</p>",
                      "en": "<p>It is obvious that we can easily express how propositions may be constructed with this operation, and how they may not be constructed with it; so it must be possible to find an exact expression for this.</p>"
                    },
                    "empty": false,
                    "key": "5.5.0.3",
                    "sub_key": "3"
                  }
                ],
                "content": {},
                "empty": true,
                "key": "5.5.0",
                "sub_key": "0"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Wie kann die allumfassende, weltspiegelnde Logik so spezielle Haken und Manipulationen gebrauchen? Nur, indem sich alle diese zu einem unendlich feinen Netzwerk, zu dem gro\u00dfen Spiegel, verkn\u00fcpfen.</p>",
                      "en": "<p>How can logic\u2014all-embracing logic, which mirrors the world\u2014use such peculiar crotchets and contrivances? Only because they are all connected with one another in an infinitely fine network, the great mirror.</p>"
                    },
                    "empty": false,
                    "key": "5.5.1.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>\u201e<span class=\"mathop\">~</span><var>p</var>\u201c ist wahr, wenn \u201e<var>p</var>\u201c falsch ist. Also in dem wahren Satz \u201e<span class=\"mathop\">~</span><var>p</var>\u201c ist \u201e<var>p</var>\u201c ein falscher Satz. Wie kann ihn nun der Strich \u201e<span class=\"mathop\">~</span>\u201c mit der Wirklichkeit zum Stimmen bringen?</p><p>Das, was in \u201e<span class=\"mathop\">~</span><var>p</var>\u201c verneint, ist aber nicht das \u201e<span class=\"mathop\">~</span>\u201c, sondern dasjenige, was allen Zeichen dieser Notation, welche <var>p</var> verneinen, gemeinsam ist.</p><p>Also die gemeinsame Regel, nach welcher \u201e<span class=\"mathop\">~</span><var>p</var>\u201c, \u201e<span class=\"mathop\">~</span><span class=\"mathop\">~</span><span class=\"mathop\">~</span><var>p</var>\u201c, \u201e<span class=\"mathop\">~</span><var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><span class=\"mathop\">~</span><var>p</var>\u201c, \u201e<span class=\"mathop\">~</span><var>p</var><span class=\"mathrel\">.</span><span class=\"mathop\">~</span><var>p</var>\u201c, etc. etc. (ad inf.) gebildet werden. Und dies Gemeinsame spiegelt die Verneinung wieder.</p>",
                      "en": "<p>\u2018<span class=\"mathop\">~</span><var>p</var>\u2019 is true if \u2018<var>p</var>\u2019 is false. Therefore, in the proposition \u2018<span class=\"mathop\">~</span><var>p</var>\u2019, when it is true, \u2018<var>p</var>\u2019 is a false proposition. How then can the stroke \u2018<span class=\"mathop\">~</span>\u2019 make it agree with reality?</p><p>But in \u2018<span class=\"mathop\">~</span><var>p</var>\u2019 it is not \u2018<span class=\"mathop\">~</span>\u2019 that negates, it is rather what is common to all the signs of this notation that negate <var>p</var>.</p><p>That is to say the common rule that governs the construction of \u2018<span class=\"mathop\">~</span><var>p</var>\u2019, \u2018<span class=\"mathop\">~</span><span class=\"mathop\">~</span><span class=\"mathop\">~</span><var>p</var>\u2019, \u2018<span class=\"mathop\">~</span><var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><span class=\"mathop\">~</span><var>p</var>\u2019, \u2018<span class=\"mathop\">~</span><var>p</var><span class=\"mathrel\">.</span><span class=\"mathop\">~</span><var>p</var>\u2019, etc. etc. (ad inf.). And this common factor mirrors negation.</p>"
                    },
                    "empty": false,
                    "key": "5.5.1.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Man k\u00f6nnte sagen: Das Gemeinsame aller Symbole, die sowohl <var>p</var> als <var>q</var> bejahen, ist der Satz \u201e<var>p</var><span class=\"mathrel\">.</span><var>q</var>\u201c. Das Gemeinsame aller Symbole, die entweder <var>p</var> oder <var>q</var> bejahen, ist der Satz \u201e<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><var>q</var>\u201c.</p><p>Und so kann man sagen: Zwei S\u00e4tze sind einander entgegengesetzt, wenn sie nichts miteinander gemein haben, und: Jeder Satz hat nur ein Negativ, weil es nur einen Satz gibt, der ganz au\u00dferhalb seiner liegt.</p><p>Es zeigt sich so auch in Russells Notation, dass \u201e<var>q</var><span class=\"mathrel\">:</span><var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><span class=\"mathop\">~</span><var>p</var>\u201c dasselbe sagt wie \u201e<var>q</var>\u201c; dass \u201e<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><span class=\"mathop\">~</span><var>p</var>\u201c nichts sagt.</p>",
                      "en": "<p>We might say that what is common to all symbols that affirm both <var>p</var> and <var>q</var> is the proposition \u2018<var>p</var><span class=\"mathrel\">.</span><var>q</var>\u2019; and that what is common to all symbols that affirm either <var>p</var> or <var>q</var> is the proposition \u2018<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><var>q</var>\u2019.</p><p>And similarly we can say that two propositions are opposed to one another if they have nothing in common with one another, and that every proposition has only one negative, since there is only one proposition that lies completely outside it.</p><p>Thus in Russell\u2019s notation too it is manifest that \u2018<var>q</var><span class=\"mathrel\">:</span><var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><span class=\"mathop\">~</span><var>p</var>\u2019 says the same thing as \u2018<var>q</var>\u2019, that \u2018<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><span class=\"mathop\">~</span><var>p</var>\u2019 says nothing.</p>"
                    },
                    "empty": false,
                    "key": "5.5.1.3",
                    "sub_key": "3"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Ist eine Notation festgelegt, so gibt es in ihr eine Regel, nach der alle <var>p</var> verneinenden S\u00e4tze gebildet werden, eine Regel, nach der alle <var>p</var> bejahenden S\u00e4tze gebildet werden, eine Regel, nach der alle <var>p</var> oder <var>q</var> bejahenden S\u00e4tze gebildet werden, u.&nbsp;s.&nbsp;f. Diese Regeln sind den Symbolen \u00e4quivalent und in ihnen spiegelt sich ihr Sinn wieder.</p>",
                      "en": "<p>Once a notation has been established, there will be in it a rule governing the construction of all propositions that negate <var>p</var>, a rule governing the construction of all propositions that affirm <var>p</var>, and a rule governing the construction of all propositions that affirm <var>p</var> or <var>q</var>; and so on. These rules are equivalent to the symbols; and in them their sense is mirrored.</p>"
                    },
                    "empty": false,
                    "key": "5.5.1.4",
                    "sub_key": "4"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Muss das Zeichen des negativen Satzes mit dem Zeichen des positiven gebildet werden? Warum sollte man den negativen Satz nicht durch eine negative Tatsache ausdr\u00fccken k\u00f6nnen. (Etwa: Wenn \u201e<var>a</var>\u201c nicht in einer bestimmten Beziehung zu \u201e<var>b</var>\u201c steht, k\u00f6nnte das ausdr\u00fccken, dass <var>aRb</var> nicht der Fall ist.)</p><p>Aber auch hier ist ja der negative Satz indirekt durch den positiven gebildet.</p><p>Der positive <em class=\"germph\">Satz</em> muss die Existenz des negativen <em class=\"germph\">Satzes</em> voraussetzen und umgekehrt.</p>",
                          "en": "<p>Must the sign of a negative proposition be constructed with that of the positive proposition? Why should it not be possible to express a negative proposition by means of a negative fact? (E.g. suppose that \u2018<var>a</var>\u2019 does not stand in a certain relation to \u2018<var>b</var>\u2019; then this might be used to say that <var>aRb</var> was not the case.)</p><p>But really even in this case the negative proposition is constructed by an indirect use of the positive.</p><p>The positive <em>proposition</em> necessarily presupposes the existence of the negative <em>proposition</em> and <em>vice versa</em>.</p>"
                        },
                        "empty": false,
                        "key": "5.5.1.5.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Es muss sich an unseren Symbolen zeigen, dass das, was durch \u201e<span class=\"symbol\">\u2228</span>\u201c, \u201e<span class=\"mathrel\">.</span>\u201c, etc. miteinander verbunden ist, S\u00e4tze sein m\u00fcssen.</p><p>Und dies ist auch der Fall, denn das Symbol \u201e<var>p</var>\u201c und \u201e<var>q</var>\u201c setzt ja selbst das \u201e<span class=\"symbol\">\u2228</span>\u201c, \u201e<span class=\"mathop\">~</span>\u201c, etc. voraus. Wenn das Zeichen \u201e<var>p</var>\u201c in \u201e<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><var>q</var>\u201c nicht f\u00fcr ein komplexes Zeichen steht, dann kann es allein nicht Sinn haben; dann k\u00f6nnen aber auch die mit \u201e<var>p</var>\u201c gleichsinnigen Zeichen \u201e<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><var>p</var>\u201c, \u201e<var>p</var><span class=\"mathrel\">.</span><var>p</var>\u201c, etc. keinen Sinn haben. Wenn aber \u201e<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><var>p</var>\u201c keinen Sinn hat, dann kann auch \u201e<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><var>q</var>\u201c keinen Sinn haben.</p>",
                      "en": "<p>It must be manifest in our symbols that it can only be propositions that are combined with one another by \u2018<span class=\"symbol\">\u2228</span>\u2019, \u2018<span class=\"mathop\">~</span>\u2019, etc.</p><p>And this is indeed the case, since the symbol in \u2018<var>p</var>\u2019 and \u2018<var>q</var>\u2019 itself presupposes \u2018<span class=\"symbol\">\u2228</span>\u2019, \u2018<span class=\"mathop\">~</span>\u2019, etc. If the sign \u2018<var>p</var>\u2019 in \u2018<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><var>q</var>\u2019 does not stand for a complex sign, then it cannot have sense by itself: but in that case the signs \u2018<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><var>p</var>\u2019, \u2018<var>p</var><span class=\"mathrel\">.</span><var>p</var>\u2019, etc., which have the same sense as <var>p</var>, must also lack sense. But if \u2018<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><var>p</var>\u2019 has no sense, then \u2018<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2228</span></span><var>q</var>\u2019 cannot have a sense either.</p>"
                    },
                    "empty": false,
                    "key": "5.5.1.5",
                    "sub_key": "5"
                  }
                ],
                "content": {
                  "de": "<p>Hat <var>\u03be</var> nur einen Wert, so ist <span class=\"nop\">N</span>(<span class=\"overlined\"><var class=\"pushvar\">\u03be</var></span>)<span class=\"mathrel\">=</span><span class=\"mathop\">~</span><var>p</var> (nicht <var>p</var>), hat es zwei Werte, so ist <span class=\"nop\">N</span> (<span class=\"overlined\"><var class=\"pushvar\">\u03be</var></span>)<span class=\"mathrel\">=</span><span class=\"mathop\">~</span><var>p</var><span class=\"mathrel\">.</span><span class=\"mathop\">~</span><var>q</var> (weder <var>p</var> noch <var>q</var>).</p>",
                  "en": "<p>If <var>\u03be</var> has only one value, then <span class=\"nop\">N</span>(<span class=\"overlined\"><var class=\"pushvar\">\u03be</var></span>)<span class=\"mathrel\">=</span><span class=\"mathop\">~</span><var>p</var> (not <var>p</var>); if it has two values, then <span class=\"nop\">N</span> (<span class=\"overlined\"><var class=\"pushvar\">\u03be</var></span>)<span class=\"mathrel\">=</span><span class=\"mathop\">~</span><var>p</var><span class=\"mathrel\">.</span><span class=\"mathop\">~</span><var>q</var> (neither <var>p</var> nor <var>q</var>).</p>"
                },
                "empty": false,
                "key": "5.5.1",
                "sub_key": "1"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Ich trenne den Begriff <em class=\"germph\">Alle</em> von der Wahrheitsfunktion.</p><p>Frege und Russell haben die Allgemeinheit in Verbindung mit dem logischen Produkt oder der logischen Summe eingef\u00fchrt. So wurde es schwer, die S\u00e4tze \u201e<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>).</span><var>fx</var>\u201c und \u201e<span class=\"quant\">(<var>x</var>).</span><var>fx</var>\u201c, in welchen beide Ideen beschlossen liegen, zu verstehen.</p>",
                      "en": "<p>I dissociate the concept <em>all</em> from truth-functions.</p><p>Frege and Russell introduced generality in association with logical product or logical sum. This made it difficult to understand the propositions \u2018<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>).</span><var>fx</var>\u2019 and \u2018<span class=\"quant\">(<var>x</var>).</span><var>fx</var>\u2019, in which both ideas are embedded.</p>"
                    },
                    "empty": false,
                    "key": "5.5.2.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Das Eigent\u00fcmliche der Allgemeinheitsbezeichnung ist erstens, dass sie auf ein logisches Urbild hinweist, und zweitens, dass sie Konstante hervorhebt.</p>",
                      "en": "<p>What is peculiar to the generality-sign is first, that it indicates a logical prototype, and secondly, that it gives prominence to constants.</p>"
                    },
                    "empty": false,
                    "key": "5.5.2.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die Allgemeinheitsbezeichnung tritt als Argument auf.</p>",
                      "en": "<p>The generality-sign occurs as an argument.</p>"
                    },
                    "empty": false,
                    "key": "5.5.2.3",
                    "sub_key": "3"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Wenn die Gegenst\u00e4nde gegeben sind, so sind uns damit auch schon <em class=\"germph\">alle</em> Gegenst\u00e4nde gegeben.</p><p>Wenn die Elementars\u00e4tze gegeben sind, so sind damit auch <em class=\"germph\">alle</em> Elementars\u00e4tze gegeben.</p>",
                      "en": "<p>If objects are given, then at the same time we are given <em>all</em> objects.</p><p>If elementary propositions are given, then at the same time <em>all</em> elementary propositions are given.</p>"
                    },
                    "empty": false,
                    "key": "5.5.2.4",
                    "sub_key": "4"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Es ist unrichtig, den Satz \u201e<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>).</span><var>fx</var>\u201c\u2014wie Russell dies tut\u2014in Worten durch \u201e<var>fx</var> ist <em class=\"germph\">m\u00f6glich</em>\u201c wiederzugeben.</p><p>Gewi\u00dfheit, M\u00f6glichkeit oder Unm\u00f6glichkeit einer Sachlage wird nicht durch einen Satz ausgedr\u00fcckt, sondern dadurch, dass ein Ausdruck eine Tautologie, ein sinnvoller Satz oder eine Kontradiktion ist.</p><p>Jener Pr\u00e4zedenzfall, auf den man sich immer berufen m\u00f6chte, muss schon im Symbol selber liegen.</p>",
                      "en": "<p>It is incorrect to render the proposition \u2018<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>).</span><var>fx</var>\u2019 in the words, \u2018<var>fx</var> is <em>possible</em>\u2019 as Russell does.</p><p>The certainty, possibility, or impossibility of a situation is not expressed by a proposition, but by an expression\u2019s being a tautology, a proposition with a sense, or a contradiction.</p><p>The precedent to which we are constantly inclined to appeal must reside in the symbol itself.</p>"
                    },
                    "empty": false,
                    "key": "5.5.2.5",
                    "sub_key": "5"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Ein vollkommen verallgemeinerter Satz ist, wie jeder andere Satz, zusammengesetzt. (Dies zeigt sich daran, dass wir in \u201e<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>, <var>\u03d5</var>).</span><var>\u03d5x</var>\u201c \u201e<var>\u03d5</var>\u201c und \u201e<var>x</var>\u201c getrennt erw\u00e4hnen m\u00fcssen. Beide stehen unabh\u00e4ngig in bezeichnenden Beziehungen zur Welt, wie im unverallgemeinerten Satz.)</p><p>Kennzeichen des zusammengesetzten Symbols: Es hat etwas mit <em class=\"germph\">anderen</em> Symbolen gemeinsam.</p>",
                          "en": "<p>A fully generalized proposition, like every other proposition, is composite. (This is shown by the fact that in \u2018<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>, <var>\u03d5</var>).</span><var>\u03d5x</var>\u2019 we have to mention \u2018<var>\u03d5</var>\u2019 and \u2018<var>x</var>\u2019 separately. They both, independently, stand in signifying relations to the world, just as is the case in ungeneralized propositions.)</p><p>It is a mark of a composite symbol that it has something in common with <em>other</em> symbols.</p>"
                        },
                        "empty": false,
                        "key": "5.5.2.6.1",
                        "sub_key": "1"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Es ver\u00e4ndert ja die Wahr- oder Falschheit <em class=\"germph\">jedes</em> Satzes etwas am allgemeinen Bau der Welt. Und der Spielraum, welcher ihrem Bau durch die Gesamtheit der Elementars\u00e4tze gelassen wird, ist eben derjenige, welchen die ganz allgemeinen S\u00e4tze begrenzen.</p><p>(Wenn ein Elementarsatz wahr ist, so ist damit doch jedenfalls Ein Elementarsatz <em class=\"germph\">mehr</em> wahr.)</p>",
                          "en": "<p>The truth or falsity of <em>every</em> proposition does make some alteration in the general construction of the world. And the range that the totality of elementary propositions leaves open for its construction is exactly the same as that which is delimited by entirely general propositions.</p><p>(If an elementary proposition is true, that means, at any rate, one <em>more</em> true elementary proposition.)</p>"
                        },
                        "empty": false,
                        "key": "5.5.2.6.2",
                        "sub_key": "2"
                      }
                    ],
                    "content": {
                      "de": "<p>Man kann die Welt vollst\u00e4ndig durch vollkommen verallgemeinerte S\u00e4tze beschreiben, das hei\u00dft also, ohne irgendeinen Namen von vornherein einem bestimmten Gegenstand zuzuordnen.</p><p>Um dann auf die gew\u00f6hnliche Ausdrucksweise zu kommen, muss man einfach nach einem Ausdruck: \u201eEs gibt ein und nur ein <var>x</var>, welches \u2026\u201c sagen: Und dies <var>x</var> ist <var>a</var>.</p>",
                      "en": "<p>We can describe the world completely by means of fully generalized propositions, i.e. without first correlating any name with a particular object.</p><p>Then, in order to arrive at the customary mode of expression, we simply need to add, after an expression like, \u2018There is one and only one <var>x</var> such that \u2026\u2019, the words, \u2018and that <var>x</var> is <var>a</var>\u2019.</p>"
                    },
                    "empty": false,
                    "key": "5.5.2.6",
                    "sub_key": "6"
                  }
                ],
                "content": {
                  "de": "<p>Sind die Werte von <var>\u03be</var> s\u00e4mtliche Werte einer Funktion <var>fx</var> f\u00fcr alle Werte von <var>x</var>, so wird <span class=\"nop\">N</span>(<span class=\"overlined\"><var class=\"pushvar\">\u03be</var></span>)<span class=\"mathrel\">=</span><span class=\"mathop\">~</span><span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>).</span><var>fx</var>.</p>",
                  "en": "<p>If <var>\u03be</var> has as its values all the values of a function <var>fx</var> for all values of <var>x</var>, then <span class=\"nop\">N</span>(<span class=\"overlined\"><var class=\"pushvar\">\u03be</var></span>)<span class=\"mathrel\">=</span><span class=\"mathop\">~</span><span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>).</span><var>fx</var>.</p>"
                },
                "empty": false,
                "key": "5.5.2",
                "sub_key": "2"
              }, {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Dass die Identit\u00e4t keine Relation zwischen Gegenst\u00e4nden ist, leuchtet ein. Dies wird sehr klar, wenn man z.&nbsp;B. den Satz \u201e<span class=\"quant\">(<var>x</var>):</span><var>fx</var><span class=\"mathrel\">.<span class=\"symbol\">\u2283</span>.</span><var>x</var><span class=\"mathrel\">=</span><var>a</var>\u201c betrachtet. Was dieser Satz sagt, ist einfach, dass <em class=\"germph\">nur</em> <var>a</var> der Funktion <var>f</var> gen\u00fcgt, und nicht, dass nur solche Dinge der Funktion <var>f</var> gen\u00fcgen, welche eine gewisse Beziehung zu <var>a</var> haben.</p><p>Man k\u00f6nnte nun freilich sagen, dass eben <em class=\"germph\">nur</em> <var>a</var> diese Beziehung zu <var>a</var> habe, aber, um dies auszudr\u00fccken, brauchten wir das Gleichheitszeichen selber.</p>",
                          "en": "<p>It is self-evident that identity is not a relation between objects. This becomes very clear if one considers, for example, the proposition \u2018<span class=\"quant\">(<var>x</var>):</span><var>fx</var><span class=\"mathrel\">.<span class=\"symbol\">\u2283</span>.</span><var>x</var><span class=\"mathrel\">=</span><var>a</var>\u2019. What this proposition says is simply that <em>only</em> <var>a</var> satisfies the function <var>f</var>, and not that only things that have a certain relation to <var>a</var> satisfy the function <var>f</var>.</p><p>Of course, it might then be said that <em>only</em> <var>a</var> did have this relation to <var>a</var>; but in order to express that, we should need the identity-sign itself.</p>"
                        },
                        "empty": false,
                        "key": "5.5.3.0.1",
                        "sub_key": "1"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Russells Definition von \u201e=\u201c gen\u00fcgt nicht; weil man nach ihr nicht sagen kann, dass zwei Gegenst\u00e4nde alle Eigenschaften gemeinsam haben. (Selbst wenn dieser Satz nie richtig ist, hat er doch <em class=\"germph\">Sinn</em>.)</p>",
                          "en": "<p>Russell\u2019s definition of \u2018=\u2019 is inadequate, because according to it we cannot say that two objects have all their properties in common. (Even if this proposition is never correct, it still has <em>sense</em>.)</p>"
                        },
                        "empty": false,
                        "key": "5.5.3.0.2",
                        "sub_key": "2"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Beil\u00e4ufig gesprochen: Von <em class=\"germph\">zwei</em> Dingen zu sagen, sie seien identisch, ist ein Unsinn, und von <em class=\"germph\">Einem</em> zu sagen, es sei identisch mit sich selbst, sagt gar nichts.</p>",
                          "en": "<p>Roughly speaking, to say of <em>two</em> things that they are identical is nonsense, and to say of <em>one</em> thing that it is identical with itself is to say nothing at all.</p>"
                        },
                        "empty": false,
                        "key": "5.5.3.0.3",
                        "sub_key": "3"
                      }
                    ],
                    "content": {},
                    "empty": true,
                    "key": "5.5.3.0",
                    "sub_key": "0"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Ich schreibe also nicht \u201e<var class=\"pushvar\">f</var>(<var>a</var>,<var>b</var>)<span class=\"mathrel\">.</span><var>a</var><span class=\"mathrel\">=</span><var>b</var>\u201c, sondern \u201e<var class=\"pushvar\">f</var>(<var>a</var>,<var>a</var>)\u201c (oder \u201e<var class=\"pushvar\">f</var>(<var>b</var>,<var>b</var>)\u201c). Und nicht \u201e<var class=\"pushvar\">f</var>(<var>a</var>,<var>b</var>)<span class=\"mathrel\">.</span><span class=\"mathop\">~</span><var>a</var><span class=\"mathrel\">=</span><var>b</var>\u201c, sondern \u201e<var class=\"pushvar\">f</var>(<var>a</var>,<var>b</var>)\u201c.</p>",
                      "en": "<p>Thus I do not write \u2018<var class=\"pushvar\">f</var>(<var>a</var>,<var>b</var>)<span class=\"mathrel\">.</span><var>a</var><span class=\"mathrel\">=</span><var>b</var>\u2019, but \u2018<var class=\"pushvar\">f</var>(<var>a</var>,<var>a</var>)\u2019 (or \u2018<var class=\"pushvar\">f</var>(<var>b</var>,<var>b</var>)\u2019); and not \u2018<var class=\"pushvar\">f</var>(<var>a</var>,<var>b</var>)<span class=\"mathrel\">.</span><span class=\"mathop\">~</span><var>a</var><span class=\"mathrel\">=</span><var>b</var>\u2019, but \u2018<var class=\"pushvar\">f</var>(<var>a</var>,<var>b</var>)\u2019.</p>"
                    },
                    "empty": false,
                    "key": "5.5.3.1",
                    "sub_key": "1"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Statt \u201e<span class=\"quant\">(<var>x</var>):</span><var>fx</var><span class=\"mathrel\"><span class=\"symbol\">\u2283</span></span><var>x</var><span class=\"mathrel\">=</span><var>a</var>\u201c schreiben wir also z.&nbsp;B. \u201e<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>).</span><var>fx</var><span class=\"mathrel\">.<span class=\"symbol\">\u2283</span>.</span><var>fa</var><span class=\"mathrel\">:</span><span class=\"mathop\">~</span><span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>,<var>y</var>).</span><var>fx</var><span class=\"mathrel\">.</span><var>fy</var>\u201c.</p><p>Und der Satz: \u201e<em class=\"germph\">nur</em> Ein <var>x</var> befriedigt <var class=\"pushvar\">f</var>(&nbsp;)\u201c lautet: \u201e<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>).</span><var>fx</var><span class=\"mathrel\">.<span class=\"symbol\">\u2283</span>.</span><var>fa</var><span class=\"mathrel\">:</span><span class=\"mathop\">~</span><span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>,<var>y</var>).</span><var>fx</var><span class=\"mathrel\">.</span><var>fy</var>\u201c.</p>",
                          "en": "<p>Thus, for example, instead of \u2018<span class=\"quant\">(<var>x</var>):</span><var>fx</var> <span class=\"mathrel\"><span class=\"symbol\">\u2283</span></span><var>x</var><span class=\"mathrel\">=</span><var>a</var>\u2019 we write \u2018<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>).</span><var>fx</var><span class=\"mathrel\">.<span class=\"symbol\">\u2283</span>.</span><var>fa</var><span class=\"mathrel\">:</span><span class=\"mathop\">~</span><span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>,<var>y</var>).</span><var>fx</var><span class=\"mathrel\">.</span><var>fy</var>\u2019.</p><p>And the proposition, \u2018<em>Only one</em> <var>x</var> satisfies <var class=\"pushvar\">f</var>(&nbsp;)\u2019, will read \u2018<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>).</span><var>fx</var><span class=\"mathrel\">.<span class=\"symbol\">\u2283</span>.</span><var>fa</var><span class=\"mathrel\">:</span><span class=\"mathop\">~</span><span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>,<var>y</var>).</span><var>fx</var><span class=\"mathrel\">.</span><var>fy</var>\u2019.</p>"
                        },
                        "empty": false,
                        "key": "5.5.3.2.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Und analog: Nicht \u201e<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>,<var>y</var>).</span><var class=\"pushvar\">f</var>(<var>x</var>,<var>y</var>)<span class=\"mathrel\">.</span><var>x</var><span class=\"mathrel\">=</span><var>y</var>\u201c, sondern \u201e<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>).</span><var class=\"pushvar\">f</var>(<var>x</var>,<var>x</var>)\u201c; und nicht \u201e<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>,<var>y</var>).</span><var class=\"pushvar\">f</var>(<var>x</var>,<var>y</var>)<span class=\"mathrel\">.</span><span class=\"mathop\">~</span><var>x</var><span class=\"mathrel\">=</span><var>y</var>\u201c, sondern \u201e<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>,<var>y</var>).</span><var class=\"pushvar\">f</var>(<var>x</var>,<var>y</var>)\u201c.</p><p>(Also statt des Russellschen \u201e<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>,<var>y</var>).</span><var class=\"pushvar\">f</var>(<var>x</var>,<var>y</var>)\u201c: \u201e<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>,<var>y</var>).</span><var class=\"pushvar\">f</var>(<var>x</var>,<var>y</var>)<span class=\"mathrel\">.<span class=\"symbol\">\u2228</span>.</span><span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>).</span><var class=\"pushvar\">f</var>(<var>x</var>,<var>x</var>)\u201c.)</p>",
                      "en": "<p>And analogously I do not write \u2018<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>,<var>y</var>).</span><var class=\"pushvar\">f</var>(<var>x</var>,<var>y</var>)<span class=\"mathrel\">.</span><var>x</var><span class=\"mathrel\">=</span><var>y</var>\u2019, but \u2018<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>).</span><var class=\"pushvar\">f</var>(<var>x</var>,<var>x</var>)\u2019; and not \u2018<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>,<var>y</var>).</span><var class=\"pushvar\">f</var>(<var>x</var>,<var>y</var>)<span class=\"mathrel\">.</span><span class=\"mathop\">~</span><var>x</var><span class=\"mathrel\">=</span><var>y</var>\u2019, but \u2018<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>,<var>y</var>).</span><var class=\"pushvar\">f</var>(<var>x</var>,<var>y</var>)\u2019.</p><p>(So Russell\u2019s \u2018<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>,<var>y</var>).</span><var class=\"pushvar\">f</var>(<var>x</var>,<var>y</var>)\u2019 becomes \u2018<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>,<var>y</var>).</span><var class=\"pushvar\">f</var>(<var>x</var>,<var>y</var>)<span class=\"mathrel\">.<span class=\"symbol\">\u2228</span>.</span><span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>).</span><var class=\"pushvar\">f</var>(<var>x</var>,<var>x</var>)\u2019.)</p>"
                    },
                    "empty": false,
                    "key": "5.5.3.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Das Gleichheitszeichen ist also kein wesentlicher Bestandteil der Begriffsschrift.</p>",
                      "en": "<p>The identity-sign, therefore, is not an essential constituent of conceptual notation.</p>"
                    },
                    "empty": false,
                    "key": "5.5.3.3",
                    "sub_key": "3"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Und nun sehen wir, dass Scheins\u00e4tze wie: \u201e<var>a</var><span class=\"mathrel\">=</span><var>a</var>\u201c, \u201e<var>a</var><span class=\"mathrel\">=</span><var>b</var><span class=\"mathrel\">.</span><var>b</var><span class=\"mathrel\">=</span><var>c</var><span class=\"mathrel\">.<span class=\"symbol\">\u2283</span></span><var>a</var><span class=\"mathrel\">=</span><var>c</var>\u201c, \u201e<span class=\"quant\">(<var>x</var>).</span><var>x</var><span class=\"mathrel\">=</span><var>x</var>\u201c, \u201e<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>).</span><var>x</var><span class=\"mathrel\">=</span><var>a</var>\u201c, etc. sich in einer richtigen Begriffsschrift gar nicht hinschreiben lassen.</p>",
                      "en": "<p>And now we see that in a correct conceptual notation pseudo-propositions like \u2018<var>a</var><span class=\"mathrel\">=</span><var>a</var>\u2019, \u2018<var>a</var><span class=\"mathrel\">=</span><var>b</var><span class=\"mathrel\">.</span><var>b</var><span class=\"mathrel\">=</span><var>c</var><span class=\"mathrel\">.<span class=\"symbol\">\u2283</span></span><var>a</var><span class=\"mathrel\">=</span><var>c</var>\u2019, \u2018<span class=\"quant\">(<var>x</var>).</span><var>x</var><span class=\"mathrel\">=</span><var>x</var>\u2019, \u2018<span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>).</span><var>x</var><span class=\"mathrel\">=</span><var>a</var>\u2019, etc. cannot even be written down.</p>"
                    },
                    "empty": false,
                    "key": "5.5.3.4",
                    "sub_key": "4"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Es gibt gewisse F\u00e4lle, wo man in Versuchung ger\u00e4t, Ausdr\u00fccke von der Form \u201e<var>a</var><span class=\"mathrel\">=</span><var>a</var>\u201c oder \u201e<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2283</span></span><var>p</var>\u201c u. dgl. zu ben\u00fctzen. Und zwar geschieht dies, wenn man von dem Urbild: Satz, Ding, etc. reden m\u00f6chte. So hat Russell in den \u201ePrinciples of Mathematics\u201c den Unsinn \u201e<var>p</var> ist ein Satz\u201c in Symbolen durch \u201e<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2283</span></span><var>p</var>\u201c wiedergegeben und als Hypothese vor gewisse S\u00e4tze gestellt, damit deren Argumentstellen nur von S\u00e4tzen besetzt werden k\u00f6nnten.</p><p>(Es ist schon darum Unsinn, die Hypothese <var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2283</span></span><var>p</var> vor einen Satz zu stellen, um ihm Argumente der richtigen Form zu sichern, weil die Hypothese f\u00fcr einen Nicht-Satz als Argument nicht falsch, sondern unsinnig wird, und weil der Satz selbst durch die unrichtige Gattung von Argumenten unsinnig wird, also sich selbst ebenso gut, oder so schlecht, vor den unrechten Argumenten bewahrt wie die zu diesem Zweck angeh\u00e4ngte sinnlose Hypothese.)</p>",
                          "en": "<p>There are certain cases in which one is tempted to use expressions of the form \u2018<var>a</var><span class=\"mathrel\">=</span><var>a</var>\u2019 or \u2018<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2283</span></span><var>p</var>\u2019 and the like. In fact, this happens when one wants to talk about prototypes, e.g. about proposition, thing, etc. Thus in Russell\u2019s <i>Principles of Mathematics</i> \u2018<var>p</var> is a proposition\u2019\u2014which is nonsense\u2014was given the symbolic rendering \u2018<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2283</span></span><var>p</var>\u2019 and placed as an hypothesis in front of certain propositions in order to exclude from their argument-places everything but propositions.</p><p>(It is nonsense to place the hypothesis \u2018<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2283</span></span><var>p</var>\u2019 in front of a proposition, in order to ensure that its arguments shall have the right form, if only because with a non-proposition as argument the hypothesis becomes not false but nonsensical, and because arguments of the wrong kind make the proposition itself nonsensical, so that it preserves itself from wrong arguments just as well, or as badly, as the hypothesis without sense that was appended for that purpose.)</p>"
                        },
                        "empty": false,
                        "key": "5.5.3.5.1",
                        "sub_key": "1"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Ebenso wollte man \u201eEs gibt keine <em class=\"germph\">Dinge</em>\u201c ausdr\u00fccken durch \u201e<span class=\"mathop\">~</span><span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>).</span><var>x</var><span class=\"mathrel\">=</span><var>x</var>\u201c. Aber selbst wenn dies ein Satz w\u00e4re\u2014w\u00e4re er nicht auch wahr, wenn es zwar \u201eDinge g\u00e4be\u201c, aber diese nicht mit sich selbst identisch w\u00e4ren?</p>",
                          "en": "<p>In the same way people have wanted to express, \u2018There are no <em>things</em>\u2019, by writing \u2018<span class=\"mathop\">~</span><span class=\"quant\">(<span class=\"symbol\">\u2203</span><var>x</var>).</span><var>x</var><span class=\"mathrel\">=</span><var>x</var>\u2019. But even if this were a proposition, would it not be equally true if in fact \u2018there were things\u2019 but they were not identical with themselves?</p>"
                        },
                        "empty": false,
                        "key": "5.5.3.5.2",
                        "sub_key": "2"
                      }
                    ],
                    "content": {
                      "de": "<p>Damit erledigen sich auch alle Probleme, die an solche Scheins\u00e4tze gekn\u00fcpft waren.</p><p>Alle Probleme, die Russells \u201eAxiom of Infinity\u201c mit sich bringt, sind schon hier zu l\u00f6sen.</p><p>Das, was das Axiom of Infinity sagen soll, w\u00fcrde sich in der Sprache dadurch ausdr\u00fccken, dass es unendlich viele Namen mit verschiedener Bedeutung g\u00e4be.</p>",
                      "en": "<p>This also disposes of all the problems that were connected with such pseudo-propositions.</p><p>All the problems that Russell\u2019s \u2018axiom of infinity\u2019 brings with it can be solved at this point.</p><p>What the axiom of infinity is intended to say would express itself in language through the existence of infinitely many names with different meanings.</p>"
                    },
                    "empty": false,
                    "key": "5.5.3.5",
                    "sub_key": "5"
                  }
                ],
                "content": {
                  "de": "<p>Gleichheit des Gegenstandes dr\u00fccke ich durch Gleichheit des Zeichens aus, und nicht mit Hilfe eines Gleichheitszeichens. Verschiedenheit der Gegenst\u00e4nde durch Verschiedenheit der Zeichen.</p>",
                  "en": "<p>Identity of object I express by identity of sign, and not by using a sign for identity. Difference of objects I express by difference of signs.</p>"
                },
                "empty": false,
                "key": "5.5.3",
                "sub_key": "3"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Auf den ersten Blick scheint es, als k\u00f6nne ein Satz in einem anderen auch auf andere Weise vorkommen.</p><p>Besonders in gewissen Satzformen der Psychologie, wie \u201eA glaubt, dass <var>p</var> der Fall ist\u201c, oder \u201eA denkt <var>p</var>\u201c, etc.</p><p>Hier scheint es n\u00e4mlich oberfl\u00e4chlich, als st\u00fcnde der Satz <var>p</var> zu einem Gegenstand A in einer Art von Relation.</p><p>(Und in der modernen Erkenntnistheorie (Russell, Moore, etc.) sind jene S\u00e4tze auch so aufgefasst worden.)</p>",
                      "en": "<p>At first sight it looks as if it were also possible for one proposition to occur in another in a different way.</p><p>Particularly with certain forms of proposition in psychology, such as \u2018A believes that <var>p</var> is the case\u2019 and A has the thought <var>p</var>\u2019, etc.</p><p>For if these are considered superficially, it looks as if the proposition <var>p</var> stood in some kind of relation to an object A.</p><p>(And in modern theory of knowledge (Russell, Moore, etc.) these propositions have actually been construed in this way.)</p>"
                    },
                    "empty": false,
                    "key": "5.5.4.1",
                    "sub_key": "1"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Dies zeigt auch, dass die Seele\u2014das Subjekt etc.\u2014wie sie in der heutigen oberfl\u00e4chlichen Psychologie aufgefasst wird, ein Unding ist.</p><p>Eine zusammengesetzte Seele w\u00e4re n\u00e4mlich keine Seele mehr.</p>",
                          "en": "<p>This shows too that there is no such thing as the soul\u2014the subject, etc.\u2014as it is conceived in the superficial psychology of the present day.</p><p>Indeed a composite soul would no longer be a soul.</p>"
                        },
                        "empty": false,
                        "key": "5.5.4.2.1",
                        "sub_key": "1"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Die richtige Erkl\u00e4rung der Form des Satzes \u201eA urteilt <var>p</var>\u201c muss zeigen, dass es unm\u00f6glich ist, einen Unsinn zu urteilen. (Russells Theorie gen\u00fcgt dieser Bedingung nicht.)</p>",
                          "en": "<p>The correct explanation of the form of the proposition, \u2018A makes the judgement <var>p</var>\u2019, must show that it is impossible for a judgement to be a piece of nonsense. (Russell\u2019s theory does not satisfy this requirement.)</p>"
                        },
                        "empty": false,
                        "key": "5.5.4.2.2",
                        "sub_key": "2"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Einen Komplex wahrnehmen hei\u00dft wahrnehmen, dass sich seine Bestandteile so und so zu einander verhalten.</p><p>Dies erkl\u00e4rt wohl auch, dass man die Figur\n<div class=\"centered\"><object data=\"http://people.umass.edu/phil335-klement-2/tlp/images/thecube.svg\" type=\"image/svg+xml\" class=\"thecubesvg\"><img src=\"./Tractatus Logico-Philosophicus_files/thecube.png\" alt=\"Cube with a face and b face\" class=\"thecubepng\" /></object></div></p><p>(Sehe ich erst auf die Ecken <var>a</var> und nur fl\u00fcchtig auf <var>b</var>, so erscheint <var>a</var> vorne; und umgekehrt.)</p>",
                          "en": "<p>To perceive a complex means to perceive that its constituents are related to one another in such and such a way.</p><p>This no doubt also explains why there are two possible ways of seeing the figure\n<div class=\"centered\"><object data=\"http://people.umass.edu/phil335-klement-2/tlp/images/thecube.svg\" type=\"image/svg+xml\" class=\"thecubesvg\"><img src=\"./Tractatus Logico-Philosophicus_files/thecube.png\" alt=\"Cube with a face and b face\" class=\"thecubepng\" /></object></div></p><p>(If I look in the first place at the corners marked <var>a</var> and only glance at the <var>b</var>\u2019s, then the <var>a</var>\u2019s appear to be in front, and <em>vice versa</em>).</p>"
                        },
                        "empty": false,
                        "key": "5.5.4.2.3",
                        "sub_key": "3"
                      }
                    ],
                    "content": {
                      "de": "<p>Es ist aber klar, dass \u201eA glaubt, dass <var>p</var>\u201c, \u201eA denkt <var>p</var>\u201c, \u201eA sagt <var>p</var>\u201c von der Form \u201e\u201a<var>p</var>\u2018 sagt <var>p</var>\u201c sind: Und hier handelt es sich nicht um eine Zuordnung von einer Tatsache und einem Gegenstand, sondern um die Zuordnung von Tatsachen durch Zuordnung ihrer Gegenst\u00e4nde.</p>",
                      "en": "<p>It is clear, however, that \u2018A believes that <var>p</var>\u2019, \u2018A has the thought <var>p</var>\u2019, and \u2018A says <var>p</var>\u2019 are of the form \u2018\u201c<var>p</var>\u201d says <var>p</var>\u2019: and this does not involve a correlation of a fact with an object, but rather the correlation of facts by means of the correlation of their objects.</p>"
                    },
                    "empty": false,
                    "key": "5.5.4.2",
                    "sub_key": "2"
                  }
                ],
                "content": {
                  "de": "<p>In der allgemeinen Satzform kommt der Satz im Satze nur als Basis der Wahrheitsoperationen vor.</p>",
                  "en": "<p>In the general propositional form propositions occur in other propositions only as bases of truth-operations.</p>"
                },
                "empty": false,
                "key": "5.5.4",
                "sub_key": "4"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Unser Grundsatz ist, dass jede Frage, die sich \u00fcberhaupt durch die Logik entscheiden l\u00e4\u00dft, sich ohne weiteres entscheiden lassen muss.</p><p>(Und wenn wir in die Lage kommen, ein solches Problem durch Ansehen der Welt beantworten zu m\u00fcssen, so zeigt dies, dass wir auf grundfalscher F\u00e4hrte sind.)</p>",
                      "en": "<p>Our fundamental principle is that whenever a question can be decided by logic at all it must be possible to decide it without more ado.</p><p>(And if we get into a position where we have to look at the world for an answer to such a problem, that shows that we are on a completely wrong track.)</p>"
                    },
                    "empty": false,
                    "key": "5.5.5.1",
                    "sub_key": "1"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Und wenn dies nicht so w\u00e4re, wie k\u00f6nnten wir die Logik anwenden? Man k\u00f6nnte sagen: Wenn es eine Logik g\u00e4be, auch wenn es keine Welt g\u00e4be, wie k\u00f6nnte es dann eine Logik geben, da es eine Welt gibt?</p>",
                          "en": "<p>And if this were not so, how could we apply logic? We might put it in this way: if there would be a logic even if there were no world, how then could there be a logic given that there is a world?</p>"
                        },
                        "empty": false,
                        "key": "5.5.5.2.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Die \u201eErfahrung\u201c, die wir zum Verstehen der Logik brauchen, ist nicht die, dass sich etwas so und so verh\u00e4lt, sondern, dass etwas <em class=\"germph\">ist</em>: aber das ist eben <em class=\"germph\">keine</em> Erfahrung.</p><p>Die Logik ist <em class=\"germph\">vor</em> jeder Erfahrung\u2014dass etwas <em class=\"germph\">so</em> ist.</p><p>Sie ist vor dem Wie, nicht vor dem Was.</p>",
                      "en": "<p>The \u2018experience\u2019 that we need in order to understand logic is not that something or other is the state of things, but that something <em>is</em>: that, however, is <em>not</em> an experience.</p><p>Logic is <em>prior</em> to every experience\u2014that something <em>is so</em>.</p><p>It is prior to the question \u2018How?\u2019, not prior to the question \u2018What?\u2019</p>"
                    },
                    "empty": false,
                    "key": "5.5.5.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Russell sagte, es g\u00e4be einfache Relationen zwischen verschiedenen Anzahlen von Dingen (Individuals). Aber zwischen welchen Anzahlen? Und wie soll sich das entscheiden?\u2014Durch die Erfahrung?</p><p>(Eine ausgezeichnete Zahl gibt es nicht.)</p>",
                      "en": "<p>Russell said that there were simple relations between different numbers of things (individuals). But between what numbers? And how is this supposed to be decided?\u2014By experience?</p><p>(There is no privileged number.)</p>"
                    },
                    "empty": false,
                    "key": "5.5.5.3",
                    "sub_key": "3"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Es soll sich a priori angeben lassen, ob ich z.&nbsp;B. in die Lage kommen kann, etwas mit dem Zeichen einer 27-stelligen Relation bezeichnen zu m\u00fcssen.</p>",
                          "en": "<p>It is supposed to be possible to answer <em>a priori</em> the question whether I can get into a position in which I need the sign for a 27-termed relation in order to signify something.</p>"
                        },
                        "empty": false,
                        "key": "5.5.5.4.1",
                        "sub_key": "1"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>D\u00fcrfen wir denn aber \u00fcberhaupt so fragen? K\u00f6nnen wir eine Zeichenform aufstellen und nicht wissen, ob ihr etwas entsprechen k\u00f6nne?</p><p>Hat die Frage einen Sinn: Was muss <em class=\"germph\">sein</em>, damit etwas der-Fall-sein kann?</p>",
                          "en": "<p>But is it really legitimate even to ask such a question? Can we set up a form of sign without knowing whether anything can correspond to it?</p><p>Does it make sense to ask what there must <em>be</em> in order that something can be the case?</p>"
                        },
                        "empty": false,
                        "key": "5.5.5.4.2",
                        "sub_key": "2"
                      }
                    ],
                    "content": {
                      "de": "<p>Die Angabe jeder speziellen Form w\u00e4re vollkommen willk\u00fcrlich.</p>",
                      "en": "<p>It would be completely arbitrary to give any specific form.</p>"
                    },
                    "empty": false,
                    "key": "5.5.5.4",
                    "sub_key": "4"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Es ist klar, wir haben vom Elementarsatz einen Begriff, abgesehen von seiner besonderen logischen Form.</p><p>Wo man aber Symbole nach einem System bilden kann, dort ist dieses System das logisch wichtige und nicht die einzelnen Symbole.</p><p>Und wie w\u00e4re es auch m\u00f6glich, dass ich es in der Logik mit Formen zu tun h\u00e4tte, die ich erfinden kann; sondern mit dem muss ich es zu tun haben, was es mir m\u00f6glich macht, sie zu erfinden.</p>",
                      "en": "<p>Clearly we have some concept of elementary propositions quite apart from their particular logical forms. </p><p>But when there is a system by which we can create symbols, the system is what is important for logic and not the individual symbols.</p><p>And anyway, is it really possible that in logic I should have to deal with forms that I can invent? What I have to deal with must be that which makes it possible for me to invent them.</p>"
                    },
                    "empty": false,
                    "key": "5.5.5.5",
                    "sub_key": "5"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Die empirische Realit\u00e4t ist begrenzt durch die Gesamtheit der Gegenst\u00e4nde. Die Grenze zeigt sich wieder in der Gesamtheit der Elementars\u00e4tze.</p><p>Die Hierarchien sind, und m\u00fcssen unabh\u00e4ngig von der Realit\u00e4t sein.</p>",
                          "en": "<p>Empirical reality is limited by the totality of objects. The limit also makes itself manifest in the totality of elementary propositions.</p><p>Hierarchies are and must be independent of reality.</p>"
                        },
                        "empty": false,
                        "key": "5.5.5.6.1",
                        "sub_key": "1"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Wissen wir aus rein logischen Gr\u00fcnden, dass es Elementars\u00e4tze geben muss, dann muss es jeder wissen, der die S\u00e4tze in ihrer unanalysierten Form versteht.</p>",
                          "en": "<p>If we know on purely logical grounds that there must be elementary propositions, then everyone who understands propositions in their unanalyzed form must know it.</p>"
                        },
                        "empty": false,
                        "key": "5.5.5.6.2",
                        "sub_key": "2"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Alle S\u00e4tze unserer Umgangssprache sind tats\u00e4chlich, so wie sie sind, logisch vollkommen geordnet.\u2014Jenes Einfachste, was wir hier angeben sollen, ist nicht ein Gleichnis der Wahrheit, sondern die volle Wahrheit selbst.</p><p>(Unsere Probleme sind nicht abstrakt, sondern vielleicht die konkretesten, die es gibt.)</p>",
                          "en": "<p>In fact, all the propositions of our everyday language, just as they stand, are in perfect logical order.\u2014That utterly simple thing, which we have to formulate here, is not an image of the truth, but the truth itself in its entirety.</p><p>(Our problems are not abstract, but perhaps the most concrete that there are.)</p>"
                        },
                        "empty": false,
                        "key": "5.5.5.6.3",
                        "sub_key": "3"
                      }
                    ],
                    "content": {
                      "de": "<p>Eine Hierarchie der Formen der Elementars\u00e4tze kann es nicht geben. Nur was wir selbst konstruieren, k\u00f6nnen wir voraussehen.</p>",
                      "en": "<p>There cannot be a hierarchy of the forms of elementary propositions. We can foresee only what we ourselves construct.</p>"
                    },
                    "empty": false,
                    "key": "5.5.5.6",
                    "sub_key": "6"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Wenn ich die Elementars\u00e4tze nicht a priori angeben kann, dann muss es zu offenbarem Unsinn f\u00fchren, sie angeben zu wollen.</p>",
                          "en": "<p>If I cannot say <em>a priori</em> what elementary propositions there are, then the attempt to do so must lead to obvious nonsense.</p>"
                        },
                        "empty": false,
                        "key": "5.5.5.7.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Die <em class=\"germph\">Anwendung</em> der Logik entscheidet dar\u00fcber, welche Elementars\u00e4tze es gibt.</p><p>Was in der Anwendung liegt, kann die Logik nicht vorausnehmen.</p><p>Das ist klar: Die Logik darf mit ihrer Anwendung nicht kollidieren.</p><p>Aber die Logik muss sich mit ihrer Anwendung ber\u00fchren.</p><p>Also d\u00fcrfen die Logik und ihre Anwendung einander nicht \u00fcbergreifen.</p>",
                      "en": "<p>The <em>application</em> of logic decides what elementary propositions there are.</p><p>What belongs to its application, logic cannot anticipate.</p><p>It is clear that logic must not clash with its application.</p><p>But logic has to be in contact with its application.</p><p>Therefore logic and its application must not overlap.</p>"
                    },
                    "empty": false,
                    "key": "5.5.5.7",
                    "sub_key": "7"
                  }
                ],
                "content": {
                  "de": "<p>Wir m\u00fcssen nun die Frage nach allen m\u00f6glichen Formen der Elementars\u00e4tze a priori beantworten.</p><p>Der Elementarsatz besteht aus Namen. Da wir aber die Anzahl der Namen von verschiedener Bedeutung nicht angeben k\u00f6nnen, so k\u00f6nnen wir auch nicht die Zusammensetzung des Elementarsatzes angeben.</p>",
                  "en": "<p>We now have to answer <i>a priori</i> the question about all the possible forms of elementary propositions.</p><p>Elementary propositions consist of names. Since, however, we are unable to give the number of names with different meanings, we are also unable to give the composition of elementary propositions.</p>"
                },
                "empty": false,
                "key": "5.5.5",
                "sub_key": "5"
              }
            ],
            "content": {
              "de": "<p>Jede Wahrheitsfunktion ist ein Resultat der successiven Anwendung der Operation <span class=\"mathop\">(-----<span class=\"mathrm\">W</span>)</span>(<var class=\"pushvar\">\u03be</var>,&nbsp;.&nbsp;.&nbsp;.&nbsp;.&nbsp;.) auf Elementars\u00e4tze.</p><p>Diese Operation verneint s\u00e4mtliche S\u00e4tze in der rechten Klammer, und ich nenne sie die Negation dieser S\u00e4tze.</p>",
              "en": "<p>Every truth-function is a result of successive applications to elementary propositions of the operation \u2018<span class=\"mathop\">(-----<span class=\"mathrm\">T</span>)</span>(<var class=\"pushvar\">\u03be</var>,&nbsp;.&nbsp;.&nbsp;.&nbsp;.&nbsp;.)\u2019.</p><p>This operation negates all the propositions in the right-hand pair of brackets, and I call it the negation of those propositions.</p>"
            },
            "empty": false,
            "key": "5.5",
            "sub_key": "5"
          }, {
            "children": [
              {
                "children": [],
                "content": {
                  "de": "<p>Die Logik erf\u00fcllt die Welt; die Grenzen der Welt sind auch ihre Grenzen.</p><p>Wir k\u00f6nnen also in der Logik nicht sagen: Das und das gibt es in der Welt, jenes nicht.</p><p>Das w\u00fcrde n\u00e4mlich scheinbar voraussetzen, dass wir gewisse M\u00f6glichkeiten ausschlie\u00dfen, und dies kann nicht der Fall sein, da sonst die Logik \u00fcber die Grenzen der Welt hinaus m\u00fcsste; wenn sie n\u00e4mlich diese Grenzen auch von der anderen Seite betrachten k\u00f6nnte.</p><p>Was wir nicht denken k\u00f6nnen, das k\u00f6nnen wir nicht denken; wir k\u00f6nnen also auch nicht <em class=\"germph\">sagen</em>, was wir nicht denken k\u00f6nnen.</p>",
                  "en": "<p>Logic pervades the world: the limits of the world are also its limits.</p><p>So we cannot say in logic, \u2018The world has this in it, and this, but not that.\u2019</p><p>For that would appear to presuppose that we were excluding certain possibilities, and this cannot be the case, since it would require that logic should go beyond the limits of the world; for only in that way could it view those limits from the other side as well.</p><p>We cannot think what we cannot think; so what we cannot think we cannot <em>say</em> either.</p>"
                },
                "empty": false,
                "key": "5.6.1",
                "sub_key": "1"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Die Welt und das Leben sind Eins.</p>",
                      "en": "<p>The world and life are one.</p>"
                    },
                    "empty": false,
                    "key": "5.6.2.1",
                    "sub_key": "1"
                  }
                ],
                "content": {
                  "de": "<p>Diese Bemerkung gibt den Schl\u00fcssel zur Entscheidung der Frage, inwieweit der Solipsismus eine Wahrheit ist.</p><p>Was der Solipsismus n\u00e4mlich <em class=\"germph\">meint</em>, ist ganz richtig, nur l\u00e4sst es sich nicht <em class=\"germph\">sagen</em>, sondern es zeigt sich.</p><p>Dass die Welt <em class=\"germph\">meine</em> Welt ist, das zeigt sich darin, dass die Grenzen <em class=\"germph\">der</em> Sprache (der Sprache, die allein ich verstehe) die Grenzen <em class=\"germph\">meiner</em> Welt bedeuten.</p>",
                  "en": "<p>This remark provides the key to the problem, how much truth there is in solipsism.</p><p>For what the solipsist <em>means</em> is quite correct; only it cannot be <em>said</em>, but makes itself manifest.</p><p>The world is <em>my</em> world: this is manifest in the fact that the limits of <em>language</em> (of that language which alone I understand) mean the limits of <em>my</em> world.</p>"
                },
                "empty": false,
                "key": "5.6.2",
                "sub_key": "2"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Das denkende, vorstellende, Subjekt gibt es nicht.</p><p>Wenn ich ein Buch schriebe \u201eDie Welt, wie ich sie vorfand\u201c, so w\u00e4re darin auch \u00fcber meinen Leib zu berichten und zu sagen, welche Glieder meinem Willen unterstehen und welche nicht, etc., dies ist n\u00e4mlich eine Methode, das Subjekt zu isolieren, oder vielmehr zu zeigen, dass es in einem wichtigen Sinne kein Subjekt gibt: Von ihm allein n\u00e4mlich k\u00f6nnte in diesem Buche <em class=\"germph\">nicht</em> die Rede sein.\u2014</p>",
                      "en": "<p>There is no such thing as the subject that thinks or entertains ideas.</p><p>If I wrote a book called <em>The World as I found it</em>, I should have to include a report on my body, and should have to say which parts were subordinate to my will, and which were not, etc., this being a method of isolating the subject, or rather of showing that in an important sense there is no subject; for it alone could <em>not</em> be mentioned in that book.\u2014</p>"
                    },
                    "empty": false,
                    "key": "5.6.3.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Das Subjekt geh\u00f6rt nicht zur Welt, sondern es ist eine Grenze der Welt.</p>",
                      "en": "<p>The subject does not belong to the world: rather, it is a limit of the world.</p>"
                    },
                    "empty": false,
                    "key": "5.6.3.2",
                    "sub_key": "2"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Das Gesichtsfeld hat n\u00e4mlich nicht etwa eine solche Form:\n<div class=\"centered\"><span class=\"sfmiddle\"><span class=\"lowered\">Auge \u2014</span><object data=\"http://people.umass.edu/phil335-klement-2/tlp/images/theeye.svg\" type=\"image/svg+xml\" class=\"theeyesvg\"><img src=\"./Tractatus Logico-Philosophicus_files/theeye.png\" alt=\"Eye image\" class=\"theeyepng\" /></object></span></div></p>",
                          "en": "<p>For the form of the visual field is surely not like this <div class=\"centered\"><span class=\"sfmiddle\"><span class=\"lowered\">Eye \u2014</span><object data=\"http://people.umass.edu/phil335-klement-2/tlp/images/theeye.svg\" type=\"image/svg+xml\" class=\"theeyesvg\"><img src=\"./Tractatus Logico-Philosophicus_files/theeye.png\" alt=\"Eye image\" class=\"theeyepng\" /></object></span></div></p>"
                        },
                        "empty": false,
                        "key": "5.6.3.3.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Wo <em class=\"germph\">in</em> der Welt ist ein metaphysisches Subjekt zu merken?</p><p>Du sagst, es verh\u00e4lt sich hier ganz wie mit Auge und Gesichtsfeld. Aber das Auge siehst du wirklich <em class=\"germph\">nicht</em>.</p><p>Und nichts <em class=\"germph\">am Gesichtsfeld</em> l\u00e4sst darauf schlie\u00dfen, dass es von einem Auge gesehen wird.</p>",
                      "en": "<p>Where <em>in</em> the world is a metaphysical subject to be found?</p><p>You will say that this is exactly like the case of the eye and the visual field. But really you do <em>not</em> see the eye.</p><p>And nothing <em>in the visual field</em> allows you to infer that it is seen by an eye.</p>"
                    },
                    "empty": false,
                    "key": "5.6.3.3",
                    "sub_key": "3"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Das h\u00e4ngt damit zusammen, dass kein Teil unserer Erfahrung auch a priori ist.</p><p>Alles, was wir sehen, k\u00f6nnte auch anders sein.</p><p>Alles, was wir \u00fcberhaupt beschreiben k\u00f6nnen, k\u00f6nnte auch anders sein.</p><p>Es gibt keine Ordnung der Dinge a priori.</p>",
                      "en": "<p>This is connected with the fact that no part of our experience is at the same time <i>a priori</i>.</p><p>Whatever we see could be other than it is.</p><p>Whatever we can describe at all could be other than it is.</p><p>There is no <i>a priori</i> order of things.</p>"
                    },
                    "empty": false,
                    "key": "5.6.3.4",
                    "sub_key": "4"
                  }
                ],
                "content": {
                  "de": "<p>Ich bin meine Welt. (Der Mikrokosmos.)</p>",
                  "en": "<p>I am my world. (The microcosm.)</p>"
                },
                "empty": false,
                "key": "5.6.3",
                "sub_key": "3"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Es gibt also wirklich einen Sinn, in welchem in der Philosophie nichtpsychologisch vom Ich die Rede sein kann.</p><p>Das Ich tritt in die Philosophie dadurch ein, dass \u201edie Welt meine Welt ist\u201c.</p><p>Das philosophische Ich ist nicht der Mensch, nicht der menschliche K\u00f6rper, oder die menschliche Seele, von der die Psychologie handelt, sondern das metaphysische Subjekt, die Grenze\u2014nicht ein Teil\u2014der Welt.</p>",
                      "en": "<p>Thus there really is a sense in which philosophy can talk about the self in a non-psychological way.</p><p>What brings the self into philosophy is the fact that \u2018the world is my world\u2019.</p><p>The philosophical self is not the human being, not the human body, or the human soul, with which psychology deals, but rather the metaphysical subject, the limit of the world\u2014not a part of it.</p>"
                    },
                    "empty": false,
                    "key": "5.6.4.1",
                    "sub_key": "1"
                  }
                ],
                "content": {
                  "de": "<p>Hier sieht man, dass der Solipsismus, streng durchgef\u00fchrt, mit dem reinen Realismus zusammenf\u00e4llt. Das Ich des Solipsismus schrumpft zum ausdehnungslosen Punkt zusammen, und es bleibt die ihm koordinierte Realit\u00e4t.</p>",
                  "en": "<p>Here it can be seen that solipsism, when its implications are followed out strictly, coincides with pure realism. The self of solipsism shrinks to a point without extension, and there remains the reality co-ordinated with it.</p>"
                },
                "empty": false,
                "key": "5.6.4",
                "sub_key": "4"
              }
            ],
            "content": {
              "de": "<p><em class=\"germph\">Die Grenzen meiner Sprache</em> bedeuten die Grenzen meiner Welt.</p>",
              "en": "<p><em>The limits of my language</em> mean the limits of my world.</p>"
            },
            "empty": false,
            "key": "5.6",
            "sub_key": "6"
          }
        ],
        "content": {
          "de": "<p>Der Satz ist eine Wahrheitsfunktion der Elementars\u00e4tze.</p><p>(Der Elementarsatz ist eine Wahrheitsfunktion seiner selbst.)</p>",
          "en": "<p>A proposition is a truth-function of elementary propositions.</p><p>(An elementary proposition is a truth-function of itself.)</p>"
        },
        "empty": false,
        "key": "5",
        "sub_key": "5"
      }, {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Dies sagt nichts anderes, als dass jeder Satz ein Resultat der successiven Anwendung der Operation <span class=\"mathop\"><span class=\"nop\">N</span>\u2019</span>(<span class=\"overlined\"><var class=\"pushvar\">\u03be</var></span>) auf die Elementars\u00e4tze ist.</p>",
                      "en": "<p>What this says is just that every proposition is a result of successive applications to elementary propositions of the operation <span class=\"nop\">N</span>(<span class=\"overlined\"><var class=\"pushvar\">\u03be</var></span>).</p>"
                    },
                    "empty": false,
                    "key": "6.0.0.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Ist die allgemeine Form gegeben, wie ein Satz gebaut ist, so ist damit auch schon die allgemeine Form davon gegeben, wie aus einem Satz durch eine Operation ein anderer erzeugt werden kann.</p>",
                      "en": "<p>If we are given the general form according to which propositions are constructed, then with it we are also given the general form according to which one proposition can be generated out of another by means of an operation.</p>"
                    },
                    "empty": false,
                    "key": "6.0.0.2",
                    "sub_key": "2"
                  }
                ],
                "content": {},
                "empty": true,
                "key": "6.0.0",
                "sub_key": "0"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Die allgemeine Form der Operation <span class=\"mathop\">\u03a9\u2019</span>(<span class=\"overlined\"><var>\u03b7</var></span>) ist also: <span class=\"mathop\">[<span class=\"overlined\"><var class=\"pushvar\">\u03be</var></span>,  <span class=\"nop\">N</span>(<span class=\"overlined\"><var class=\"pushvar\">\u03be</var></span>)]\u2019</span>(<span class=\"overlined\"><var>\u03b7</var></span>) (<span class=\"mathrel\">=</span>[<span class=\"overlined\"><var>\u03b7</var></span>,  <span class=\"overlined\"><var class=\"pushvar\">\u03be</var></span>,  <span class=\"nop\">N</span>(<span class=\"overlined\"><var class=\"pushvar\">\u03be</var></span>)]).</p><p>Das ist die allgemeinste Form des \u00dcberganges von einem Satz zum anderen.</p>",
                  "en": "<p>Therefore the general form of an operation <span class=\"mathop\">\u03a9\u2019</span>(<span class=\"overlined\"><var>\u03b7</var></span>) is <span class=\"mathop\">[<span class=\"overlined\"><var class=\"pushvar\">\u03be</var></span>,  <span class=\"nop\">N</span>(<span class=\"overlined\"><var class=\"pushvar\">\u03be</var></span>)]\u2019</span>(<span class=\"overlined\"><var>\u03b7</var></span>) (<span class=\"mathrel\">=</span>[<span class=\"overlined\"><var>\u03b7</var></span>,  <span class=\"overlined\"><var class=\"pushvar\">\u03be</var></span>,  <span class=\"nop\">N</span>(<span class=\"overlined\"><var class=\"pushvar\">\u03be</var></span>)]).</p><p>This is the most general form of transition from one proposition to another.</p>"
                },
                "empty": false,
                "key": "6.0.1",
                "sub_key": "1"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Die Zahl ist der Exponent einer Operation.</p>",
                      "en": "<p>A number is the exponent of an operation.</p>"
                    },
                    "empty": false,
                    "key": "6.0.2.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Der Zahlbegriff ist nichts anderes als das Gemeinsame aller Zahlen, die allgemeine Form der Zahl.</p><p>Der Zahlbegriff ist die variable Zahl.</p><p>Und der Begriff der Zahlengleichheit ist die allgemeine Form aller speziellen Zahlengleichheiten.</p>",
                      "en": "<p>The concept of number is simply what is common to all numbers, the general form of a number.</p><p>The concept of number is the variable number.</p><p>And the concept of numerical equality is the general form of all particular cases of numerical equality.</p>"
                    },
                    "empty": false,
                    "key": "6.0.2.2",
                    "sub_key": "2"
                  }
                ],
                "content": {
                  "de": "<p>Und <em class=\"germph\">so</em> kommen wir zu den Zahlen: Ich definiere</p><p><div class=\"centered\"><table class=\"alignedmath\"><tbody><tr><td class=\"righttight\"><var>x</var><span class=\"mathrel\">=</span></td><td class=\"lefttight\"><span class=\"mathop\">\u03a9<sup>0</sup>\u2019</span><var>x</var>&nbsp;&nbsp;Def. und</td></tr><tr><td class=\"righttight\"><span class=\"mathop\">\u03a9\u2019</span><span class=\"mathop\">\u03a9<sup><var>\u03bd</var></sup>\u2019</span><var>x</var><span class=\"mathrel\">=</span></td><td class=\"lefttight\"><span class=\"mathop\">\u03a9<sup><var>\u03bd</var>+1</sup>\u2019</span><var>x</var>&nbsp;&nbsp;Def.</td></tr></tbody></table></div></p><p>Nach diesen Zeichenregeln schreiben wir also die Reihe</p><p><div class=\"displaymath\"><var>x</var>,  <span class=\"mathop\">\u03a9\u2019</span><var>x</var>,  <span class=\"mathop\">\u03a9\u2019</span><span class=\"mathop\">\u03a9\u2019</span><var>x</var>,  <span class=\"mathop\">\u03a9\u2019</span><span class=\"mathop\">\u03a9\u2019</span><span class=\"mathop\">\u03a9\u2019</span><var>x</var>,<span class=\"mathrel\">\u2026</span></div></p><p>so:</p><p><div class=\"displaymath\"><span class=\"mathop\">\u03a9<sup>0</sup>\u2019</span><var>x</var>,  <span class=\"mathop\">\u03a9<sup>0+1</sup>\u2019</span><var>x</var>,  <span class=\"mathop\">\u03a9<sup>0+1+1</sup>\u2019</span><var>x</var>,  <span class=\"mathop\">\u03a9<sup>0<span class=\"mathrel\">+</span>1<span class=\"mathrel\">+</span>1<span class=\"mathrel\">+</span>1</sup>\u2019</span><var>x</var>,<span class=\"mathrel\">\u2026</span></div></p><p>Also schreibe ich statt \u201e[<var>x</var>,  <var class=\"pushvar\">\u03be</var>,  <span class=\"mathop\">\u03a9\u2019</span><var class=\"pushvar\">\u03be</var>]\u201c:</p><p><div class=\"displaymath\">\u201e[<span class=\"mathop\">\u03a9<sup>0</sup>\u2019</span><var>x</var>,  <span class=\"mathop\">\u03a9<sup><var>\u03bd</var></sup>\u2019</span><var>x</var>,  <span class=\"mathop\">\u03a9<sup><var>\u03bd</var><span class=\"mathrel\">+</span>1</sup>\u2019</span><var>x</var>]\u201c.</div></p><p>Und definiere:</p><p><div class=\"centered\"><table class=\"alignedmath\"><tbody><tr><td class=\"lefttight\">0<span class=\"mathrel\">+</span>1<span class=\"mathrel\">=</span>1&nbsp;&nbsp;Def.</td></tr><tr><td class=\"lefttight\">0<span class=\"mathrel\">+</span>1<span class=\"mathrel\">+</span>1<span class=\"mathrel\">=</span>2&nbsp;&nbsp;Def.</td></tr><tr><td class=\"lefttight\">0<span class=\"mathrel\">+</span>1<span class=\"mathrel\">+</span>1<span class=\"mathrel\">+</span>1<span class=\"mathrel\">=</span>3&nbsp;&nbsp;Def.</td></tr><tr><td class=\"lefttight\">(u. s. f.)</td></tr></tbody></table></div></p>",
                  "en": "<p>And <em>this</em> is how we arrive at numbers. I give the following definitions</p><p><div class=\"centered\"><table class=\"alignedmath\"><tbody><tr><td class=\"righttight\"><var>x</var><span class=\"mathrel\">=</span></td><td class=\"lefttight\"><span class=\"mathop\">\u03a9<sup>0</sup>\u2019</span><var>x</var>&nbsp;&nbsp;Def.,</td></tr><tr><td class=\"righttight\"><span class=\"mathop\">\u03a9\u2019</span><span class=\"mathop\">\u03a9<sup><var>\u03bd</var></sup>\u2019</span><var>x</var><span class=\"mathrel\">=</span></td><td class=\"lefttight\"><span class=\"mathop\">\u03a9<sup><var>\u03bd</var>+1</sup>\u2019</span><var>x</var>&nbsp;&nbsp;Def.</td></tr></tbody></table></div></p><p>So, in accordance with these rules, which deal with signs, we write the series</p><p><div class=\"displaymath\"><var>x</var>,  <span class=\"mathop\">\u03a9\u2019</span><var>x</var>,  <span class=\"mathop\">\u03a9\u2019</span><span class=\"mathop\">\u03a9\u2019</span><var>x</var>,  <span class=\"mathop\">\u03a9\u2019</span><span class=\"mathop\">\u03a9\u2019</span><span class=\"mathop\">\u03a9\u2019</span><var>x</var>,<span class=\"mathrel\">\u2026</span></div></p><p>in the following way</p><p><div class=\"displaymath\"><span class=\"mathop\">\u03a9<sup>0</sup>\u2019</span><var>x</var>,  <span class=\"mathop\">\u03a9<sup>0+1</sup>\u2019</span><var>x</var>,  <span class=\"mathop\">\u03a9<sup>0+1+1</sup>\u2019</span><var>x</var>,  <span class=\"mathop\">\u03a9<sup>0<span class=\"mathrel\">+</span>1<span class=\"mathrel\">+</span>1<span class=\"mathrel\">+</span>1</sup>\u2019</span><var>x</var>,<span class=\"mathrel\">\u2026</span></div></p><p>Therefore, instead of \u2018[<var>x</var>,  <var class=\"pushvar\">\u03be</var>,  <span class=\"mathop\">\u03a9\u2019</span><var class=\"pushvar\">\u03be</var>]\u2019,</p><p><div class=\"displaymath\">I write&nbsp;&nbsp;\u2018[<span class=\"mathop\">\u03a9<sup>0</sup>\u2019</span><var>x</var>,  <span class=\"mathop\">\u03a9<sup><var>\u03bd</var></sup>\u2019</span><var>x</var>,  <span class=\"mathop\">\u03a9<sup><var>\u03bd</var><span class=\"mathrel\">+</span>1</sup>\u2019</span><var>x</var>]\u2019.</div></p><p>And I give the following definitions</p><p><div class=\"centered\"><table class=\"alignedmath\"><tbody><tr><td class=\"righttight\">0<span class=\"mathrel\">+</span>1<span class=\"mathrel\">=</span></td><td class=\"lefttight\">1&nbsp;&nbsp;Def.,</td></tr><tr><td class=\"righttight\">0<span class=\"mathrel\">+</span>1<span class=\"mathrel\">+</span>1<span class=\"mathrel\">=</span></td><td class=\"lefttight\">2&nbsp;&nbsp;Def.,</td></tr><tr><td class=\"righttight\">0<span class=\"mathrel\">+</span>1<span class=\"mathrel\">+</span>1<span class=\"mathrel\">+</span>1<span class=\"mathrel\">=</span></td><td class=\"lefttight\">3&nbsp;&nbsp;Def.,</td></tr><tr><td class=\"centertight\" colspan=\"2\">(and so on).</td></tr></tbody></table></div></p>"
                },
                "empty": false,
                "key": "6.0.2",
                "sub_key": "2"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Die Theorie der Klassen ist in der Mathematik ganz \u00fcberfl\u00fcssig.</p><p>Dies h\u00e4ngt damit zusammen, dass die Allgemeinheit, welche wir in der Mathematik brauchen, nicht die <em class=\"germph\">zuf\u00e4llige</em> ist.</p>",
                      "en": "<p>The theory of classes is completely superfluous in mathematics.</p><p>This is connected with the fact that the generality required in mathematics is not <em>accidental</em> generality.</p>"
                    },
                    "empty": false,
                    "key": "6.0.3.1",
                    "sub_key": "1"
                  }
                ],
                "content": {
                  "de": "<p>Die allgemeine Form der ganzen Zahl ist: [0, <var class=\"pushvar\">\u03be</var>, <var>\u03be</var><span class=\"mathrel\">+</span>1].</p>",
                  "en": "<p>The general form of an integer is [0, <var class=\"pushvar\">\u03be</var>, <var>\u03be</var><span class=\"mathrel\">+</span>1].</p>"
                },
                "empty": false,
                "key": "6.0.3",
                "sub_key": "3"
              }
            ],
            "content": {},
            "empty": true,
            "key": "6.0",
            "sub_key": "0"
          }, {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Theorien, die einen Satz der Logik gehaltvoll erscheinen lassen, sind immer falsch. Man k\u00f6nnte z.&nbsp;B. glauben, dass die Worte \u201ewahr\u201c und \u201efalsch\u201c zwei Eigenschaften unter anderen Eigenschaften bezeichnen, und da erschiene es als eine merkw\u00fcrdige Tatsache, dass jeder Satz eine dieser Eigenschaften besitzt. Das scheint nun nichts weniger als selbstverst\u00e4ndlich zu sein, ebensowenig selbstverst\u00e4ndlich, wie etwa der Satz: \u201eAlle Rosen sind entweder gelb oder rot\u201c kl\u00e4nge, auch wenn er wahr w\u00e4re. Ja, jener Satz bekommt nun ganz den Charakter eines naturwissenschaftlichen Satzes, und dies ist das sichere Anzeichen daf\u00fcr, dass er falsch aufgefasst wurde.</p>",
                      "en": "<p>All theories that make a proposition of logic appear to have content are false. One might think, for example, that the words \u2018true\u2019 and \u2018false\u2019 signified two properties among other properties, and then it would seem to be a remarkable fact that every proposition possessed one of these properties. On this theory it seems to be anything but obvious, just as, for instance, the proposition, \u2018All roses are either yellow or red\u2019, would not sound obvious even if it were true. Indeed, the logical proposition acquires all the characteristics of a proposition of natural science and this is the sure sign that it has been construed wrongly.</p>"
                    },
                    "empty": false,
                    "key": "6.1.1.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die richtige Erkl\u00e4rung der logischen S\u00e4tze muss ihnen eine einzigartige Stellung unter allen S\u00e4tzen geben.</p>",
                      "en": "<p>The correct explanation of the propositions of logic must assign to them a unique status among all propositions.</p>"
                    },
                    "empty": false,
                    "key": "6.1.1.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Es ist das besondere Merkmal der logischen S\u00e4tze, dass man am Symbol allein erkennen kann, dass sie wahr sind, und diese Tatsache schlie\u00dft die ganze Philosophie der Logik in sich. Und so ist es auch eine derwichtigsten Tatsachen, dass sich die Wahrheit oder Falschheit der nichtlogischen S\u00e4tze <em class=\"germph\">nicht</em> am Satz allein erkennen l\u00e4sst.</p>",
                      "en": "<p>It is the peculiar mark of logical propositions that one can recognize that they are true from the symbol alone, and this fact contains in itself the whole philosophy of logic. And so too it is a very important fact that the truth or falsity of non-logical propositions <em>cannot</em> be recognized from the propositions alone.</p>"
                    },
                    "empty": false,
                    "key": "6.1.1.3",
                    "sub_key": "3"
                  }
                ],
                "content": {
                  "de": "<p>Die S\u00e4tze der Logik sagen also nichts. (Sie sind die analytischen S\u00e4tze.)</p>",
                  "en": "<p>Therefore the propositions of logic say nothing. (They are the analytic propositions.)</p>"
                },
                "empty": false,
                "key": "6.1.1",
                "sub_key": "1"
              }, {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Dass z.&nbsp;B. die S\u00e4tze \u201e<var>p</var>\u201c und \u201e<span class=\"mathop\">~</span><var>p</var>\u201c in der Verbindung \u201e<span class=\"mathop\">~</span>(<var>p</var><span class=\"mathrel\">.</span><span class=\"mathop\">~</span><var>p</var>)\u201c eine Tautologie ergeben, zeigt, dass sie einander widersprechen. Dass die S\u00e4tze \u201e<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2283</span></span><var>q</var>\u201c, \u201e<var>p</var>\u201c und \u201e<var>q</var>\u201c in der Form \u201e(<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2283</span></span><var>q</var>)<span class=\"mathrel\">.</span>(<var>p</var>)<span class=\"mathrel\">:<span class=\"symbol\">\u2283</span>:</span>(<var>q</var>)\u201c miteinander verbunden eine Tautologie ergeben, zeigt, dass <var>q</var> aus <var>p</var> und <var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2283</span></span><var>q</var> folgt. Dass \u201e<span class=\"quant\">(<var>x</var>).</span><var>fx</var><span class=\"mathrel\">:<span class=\"symbol\">\u2283</span>:</span><var>fa</var>\u201c eine Tautologie ist, dass <var>fa</var> aus <span class=\"quant\">(<var>x</var>).</span><var>fx</var> folgt. etc. etc.</p>",
                          "en": "<p>For example, the fact that the propositions \u2018<var>p</var>\u2019 and \u2018<span class=\"mathop\">~</span><var>p</var>\u2019 in the combination \u2018<span class=\"mathop\">~</span>(<var>p</var><span class=\"mathrel\">.</span><span class=\"mathop\">~</span><var>p</var>)\u2019 yield a tautology shows that they contradict one another. The fact that the propositions \u2018<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2283</span></span><var>q</var>\u2019, \u2018<var>p</var>\u2019, and \u2018<var>q</var>\u2019, combined with one another in the form \u2018(<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2283</span></span><var>q</var>)<span class=\"mathrel\">.</span>(<var>p</var>)<span class=\"mathrel\">:<span class=\"symbol\">\u2283</span>:</span>(<var>q</var>)\u2019, yield a tautology shows that <var>q</var> follows from <var>p</var> and <var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2283</span></span><var>q</var>. The fact that \u2018<span class=\"quant\">(<var>x</var>).</span><var>fx</var><span class=\"mathrel\">:<span class=\"symbol\">\u2283</span>:</span><var>fa</var>\u2019 is a tautology shows that <var>fa</var> follows from <span class=\"quant\">(<var>x</var>).</span><var>fx</var>. Etc. etc.</p>"
                        },
                        "empty": false,
                        "key": "6.1.2.0.1",
                        "sub_key": "1"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Es ist klar, dass man zu demselben Zweck statt der Tautologien auch die Kontradiktionen verwenden k\u00f6nnte.</p>",
                          "en": "<p>It is clear that one could achieve the same purpose by using contradictions instead of tautologies.</p>"
                        },
                        "empty": false,
                        "key": "6.1.2.0.2",
                        "sub_key": "2"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Um eine Tautologie als solche zu erkennen, kann man sich, in den F\u00e4llen, in welchen in der Tautologie keine Allgemeinheitsbezeichnung vorkommt, folgender anschaulichen Methode bedienen: Ich schreibe statt \u201e<var>p</var>\u201c, \u201e<var>q</var>\u201c, \u201e<var>r</var>\u201c etc. \u201e<span class=\"mathrm\">W</span><var class=\"doublepushvar\">p</var><span class=\"mathrm\">F</span>\u201c, \u201e<span class=\"mathrm\">W</span><var class=\"doublepushvar\">q</var><span class=\"mathrm\">F</span>\u201c, \u201e<span class=\"mathrm\">W</span><var class=\"doublepushvar\">r</var><span class=\"mathrm\">F</span>\u201c etc. Die Wahrheitskombinationen dr\u00fccke ich durch Klammern aus, z.&nbsp;B.:</p>",
                          "en": "<p>In order to recognize an expression as a tautology, in cases where no generality-sign occurs in it, one can employ the following intuitive method: instead of \u2018<var>p</var>\u2019, \u2018<var>q</var>\u2019, \u2018<var>r</var>\u2019, etc. I write \u2018<span class=\"mathrm\">T</span><var class=\"doublepushvar\">p</var><span class=\"mathrm\">F</span>\u2019, \u2018<span class=\"mathrm\">T</span><var class=\"doublepushvar\">q</var><span class=\"mathrm\">F</span>\u2019, \u2018<span class=\"mathrm\">T</span><var class=\"doublepushvar\">r</var><span class=\"mathrm\">F</span>\u2019, etc. Truth-combinations I express by means of brackets, e.g.</p>"
                        },
                        "empty": false,
                        "key": "6.1.2.0.3",
                        "sub_key": "3"
                      }
                    ],
                    "content": {},
                    "empty": true,
                    "key": "6.1.2.0",
                    "sub_key": "0"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die S\u00e4tze der Logik demonstrieren die logischen Eigenschaften der S\u00e4tze, indem sie sie zu nichtssagenden S\u00e4tzen verbinden.</p><p>Diese Methode k\u00f6nnte man auch eine Nullmethode nennen. Im logischen Satz werden S\u00e4tze miteinander ins Gleichgewicht gebracht und der Zustand des Gleichgewichts zeigt dann an, wie diese S\u00e4tze logisch beschaffen sein m\u00fcssen.</p>",
                      "en": "<p>The propositions of logic demonstrate the logical properties of propositions by combining them so as to form propositions that say nothing.</p><p>This method could also be called a zero-method. In a logical proposition, propositions are brought into equilibrium with one another, and the state of equilibrium then indicates what the logical constitution of these propositions must be.</p>"
                    },
                    "empty": false,
                    "key": "6.1.2.1",
                    "sub_key": "1"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Ergeben z.&nbsp;B. zwei S\u00e4tze \u201e<var>p</var>\u201c und \u201e<var>q</var>\u201c in der Verbindung \u201e<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2283</span></span><var>q</var>\u201c eine Tautologie, so ist klar, dass <var>q</var> aus <var>p</var> folgt.</p><p>Dass z.&nbsp;B. \u201e<var>q</var>\u201c aus \u201e<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2283</span></span><var>q</var><span class=\"mathrel\">.</span><var>p</var>\u201c folgt, ersehen wir aus diesen beiden S\u00e4tzen selbst, aber wir k\u00f6nnen es auch <em class=\"germph\">so</em> zeigen, indem wir sie zu \u201e<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2283</span></span><var>q</var><span class=\"mathrel\">.</span><var>p</var><span class=\"mathrel\">:<span class=\"symbol\">\u2283</span>:</span><var>q</var>\u201c verbinden und nun zeigen, dass dies eine Tautologie ist.</p>",
                          "en": "<p>If, for example, two propositions \u2018<var>p</var>\u2019 and \u2018<var>q</var>\u2019 in the combination \u2018<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2283</span></span><var>q</var>\u2019 yield a tautology, then it is clear that <var>q</var> follows from <var>p</var>.</p><p>For example, we see from the two propositions themselves that \u2018<var>q</var>\u2019 follows from \u2018<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2283</span></span><var>q</var><span class=\"mathrel\">.</span><var>p</var>\u2019, but it is also possible to show it in <em>this</em> way: we combine them to form \u2018<var>p</var><span class=\"mathrel\"><span class=\"symbol\">\u2283</span></span><var>q</var><span class=\"mathrel\">.</span><var>p</var><span class=\"mathrel\">:<span class=\"symbol\">\u2283</span>:</span><var>q</var>\u2019, and then show that this is a tautology.</p>"
                        },
                        "empty": false,
                        "key": "6.1.2.2.1",
                        "sub_key": "1"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Dies wirft ein Licht auf die Frage, warum die logischen S\u00e4tze nicht durch die Erfahrung best\u00e4tigt werden k\u00f6nnen, ebensowenig wie sie durch die Erfahrung widerlegt werden k\u00f6nnen. Nicht nur muss ein Satz der Logik durch keine m\u00f6gliche Erfahrung widerlegt werden k\u00f6nnen, sondern er darf auch nicht durch eine solche best\u00e4tigt werden k\u00f6nnen.</p>",
                          "en": "<p>This throws some light on the question why logical propositions cannot be confirmed by experience any more than they can be refuted by it. Not only must a proposition of logic be irrefutable by any possible experience, but it must also be unconfirmable by any possible experience.</p>"
                        },
                        "empty": false,
                        "key": "6.1.2.2.2",
                        "sub_key": "2"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Nun wird klar, warum man oft f\u00fchlte, als w\u00e4ren die \u201elogischen Wahrheiten\u201c von uns zu \u201e<em class=\"germph\">fordern</em>\u201c: Wir k\u00f6nnen sie n\u00e4mlich insofern fordern, als wir eine gen\u00fcgende Notation fordern k\u00f6nnen.</p>",
                          "en": "<p>Now it becomes clear why people have often felt as if it were for us to \u2018<em>postulate</em>\u2019 the \u2018truths of logic\u2019. The reason is that we can postulate them in so far as we can postulate an adequate notation.</p>"
                        },
                        "empty": false,
                        "key": "6.1.2.2.3",
                        "sub_key": "3"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Es wird jetzt auch klar, warum die Logik die Lehre von den Formen und vom Schlie\u00dfen genannt wurde.</p>",
                          "en": "<p>It also becomes clear now why logic was called the theory of forms and of inference.</p>"
                        },
                        "empty": false,
                        "key": "6.1.2.2.4",
                        "sub_key": "4"
                      }
                    ],
                    "content": {
                      "de": "<p>Daraus ergibt sich, dass wir auch ohne die logischen S\u00e4tze auskommen k\u00f6nnen, da wir ja in einer entsprechenden Notation die formalen Eigenschaften der S\u00e4tze durch das blo\u00dfe Ansehen dieser S\u00e4tze erkennen k\u00f6nnen.</p>",
                      "en": "<p>It follows from this that we can actually do without logical propositions; for in a suitable notation we can in fact recognize the formal properties of propositions by mere inspection of the propositions themselves.</p>"
                    },
                    "empty": false,
                    "key": "6.1.2.2",
                    "sub_key": "2"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Das Anzeichen des logischen Satzes ist <em class=\"germph\">nicht</em> die Allgemeing\u00fcltigkeit.</p><p>Allgemein sein hei\u00dft ja nur: zuf\u00e4lligerweise f\u00fcr alle Dinge gelten. Ein unverallgemeinerter Satz kann ja ebensowohl tautologisch sein als ein verallgemeinerter.</p>",
                          "en": "<p>The mark of a logical proposition is <em>not</em> general validity.</p><p>To be general means no more than to be accidentally valid for all things. An ungeneralized proposition can be tautological just as well as a generalized one.</p>"
                        },
                        "empty": false,
                        "key": "6.1.2.3.1",
                        "sub_key": "1"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Die logische Allgemeing\u00fcltigkeit k\u00f6nnte man wesentlich nennen, im Gegensatz zu jener zuf\u00e4lligen, etwa des Satzes: \u201eAlle Menschen sind sterblich\u201c. S\u00e4tze wie Russells \u201eAxiom of Reducibility\u201c sind nicht logische S\u00e4tze, und dies erkl\u00e4rt unser Gef\u00fchl: Dass sie, wenn wahr, so doch nur durch einen g\u00fcnstigen Zufall wahr sein k\u00f6nnten.</p>",
                          "en": "<p>The general validity of logic might be called essential, in contrast with the accidental general validity of such propositions as \u2018All men are mortal\u2019. Propositions like Russell\u2019s \u2018axiom of reducibility\u2019 are not logical propositions, and this explains our feeling that, even if they were true, their truth could only be the result of a fortunate accident.</p>"
                        },
                        "empty": false,
                        "key": "6.1.2.3.2",
                        "sub_key": "2"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Es l\u00e4sst sich eine Welt denken, in der das Axiom of Reducibility nicht gilt. Es ist aber klar, dass die Logik nichts mit der Frage zu schaffen hat, ob unsere Welt wirklich so ist oder nicht.</p>",
                          "en": "<p>It is possible to imagine a world in which the axiom of reducibility is not valid. It is clear, however, that logic has nothing to do with the question whether our world really is like that or not.</p>"
                        },
                        "empty": false,
                        "key": "6.1.2.3.3",
                        "sub_key": "3"
                      }
                    ],
                    "content": {
                      "de": "<p>Es ist klar: Die logischen Gesetze d\u00fcrfen nicht selbst wieder logischen Gesetzen unterstehen.</p><p>(Es gibt nicht, wie Russell meinte, f\u00fcr jede \u201eType\u201c ein eigenes Gesetz des Widerspruches, sondern Eines gen\u00fcgt, da es auf sich selbst nicht angewendet wird.)</p>",
                      "en": "<p>Clearly the laws of logic cannot in their turn be subject to laws of logic.</p><p>(There is not, as Russell thought, a special law of contradiction for each \u2018type\u2019; one law is enough, since it is not applied to itself.)</p>"
                    },
                    "empty": false,
                    "key": "6.1.2.3",
                    "sub_key": "3"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die logischen S\u00e4tze beschreiben das Ger\u00fcst der Welt, oder vielmehr, sie stellen es dar. Sie \u201ehandeln\u201c von nichts. Sie setzen voraus, dass Namen Bedeutung, und Elementars\u00e4tze Sinn haben: Und dies ist ihre Verbindung mit der Welt. Es ist klar, dass es etwas \u00fcber die Welt anzeigen muss, dass gewisse Verbindungen von Symbolen\u2014welche wesentlich einen bestimmten Charakter haben\u2014Tautologien sind. Hierin liegt das Entscheidende. Wir sagten, manches an den Symbolen, die wir gebrauchen, w\u00e4re willk\u00fcrlich, manches nicht. In der Logik dr\u00fcckt nur dieses aus: Das hei\u00dft aber, in der Logik dr\u00fccken nicht <em class=\"germph\">wir</em> mit Hilfe der Zeichen aus, was wir wollen, sondern in der Logik sagt die Natur der naturnotwendigen Zeichen selbst aus: Wenn wir die logische Syntax irgendeiner Zeichensprache kennen, dann sind bereits alle S\u00e4tze der Logik gegeben.</p>",
                      "en": "<p>The propositions of logic describe the scaffolding of the world, or rather they represent it. They have no \u2018subject-matter\u2019. They presuppose that names have meaning and elementary propositions sense; and that is their connexion with the world. It is clear that something about the world must be indicated by the fact that certain combinations of symbols\u2014whose essence involves the possession of a determinate character\u2014are tautologies. This contains the decisive point. We have said that some things are arbitrary in the symbols that we use and that some things are not. In logic it is only the latter that express: but that means that logic is not a field in which <em>we</em> express what we wish with the help of signs, but rather one in which the nature of the natural and inevitable signs speaks for itself. If we know the logical syntax of any sign-language, then we have already been given all the propositions of logic.</p>"
                    },
                    "empty": false,
                    "key": "6.1.2.4",
                    "sub_key": "4"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Darum kann es in der Logik auch <em class=\"germph\">nie</em> \u00dcberraschungen geben.</p>",
                          "en": "<p>Hence there can <em>never</em> be surprises in logic.</p>"
                        },
                        "empty": false,
                        "key": "6.1.2.5.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Es ist m\u00f6glich, und zwar auch nach der alten Auffassung der Logik, von vornherein eine Beschreibung aller \u201ewahren\u201c logischen S\u00e4tze zu geben.</p>",
                      "en": "<p>It is possible\u2014indeed possible even according to the old conception of logic\u2014to give in advance a description of all \u2018true\u2019 logical propositions.</p>"
                    },
                    "empty": false,
                    "key": "6.1.2.5",
                    "sub_key": "5"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>In der Logik sind Prozess und Resultat \u00e4quivalent. (Darum keine \u00dcberraschung.)</p>",
                          "en": "<p>In logic process and result are equivalent. (Hence the absence of surprise.)</p>"
                        },
                        "empty": false,
                        "key": "6.1.2.6.1",
                        "sub_key": "1"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Der Beweis in der Logik ist nur ein mechanisches Hilfsmittel zum leichteren Erkennen der Tautologie, wo sie kompliziert ist.</p>",
                          "en": "<p>Proof in logic is merely a mechanical expedient to facilitate the recognition of tautologies in complicated cases.</p>"
                        },
                        "empty": false,
                        "key": "6.1.2.6.2",
                        "sub_key": "2"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Es w\u00e4re ja auch zu merkw\u00fcrdig, wenn man einen sinnvollen Satz <em class=\"germph\">logisch</em> aus anderen beweisen k\u00f6nnte, und einen logischen Satz <em class=\"germph\">auch</em>. Es ist von vornherein klar, dass der logische Beweis eines sinnvollen Satzes und der Beweis <em class=\"germph\">in</em> der Logik zwei ganz verschiedene Dinge sein m\u00fcssen.</p>",
                          "en": "<p>Indeed, it would be altogether too remarkable if a proposition that had sense could be proved <em>logically</em> from others, and <em>so too</em> could a logical proposition. It is clear from the start that a logical proof of a proposition that has sense and a proof <em>in</em> logic must be two entirely different things.</p>"
                        },
                        "empty": false,
                        "key": "6.1.2.6.3",
                        "sub_key": "3"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Der sinnvolle Satz sagt etwas aus, und sein Beweis zeigt, dass es so ist; in der Logik ist jeder Satz die Form eines Beweises.</p><p>Jeder Satz der Logik ist ein in Zeichen dargestellter modus ponens. (Und den modus ponens kann man nicht durch einen Satz ausdr\u00fccken.)</p>",
                          "en": "<p>A proposition that has sense states something, which is shown by its proof to be so. In logic every proposition is the form of a proof.</p><p>Every proposition of logic is a <em>modus ponens</em> represented in signs. (And one cannot express the <em>modus ponens</em> by means of a proposition.)</p>"
                        },
                        "empty": false,
                        "key": "6.1.2.6.4",
                        "sub_key": "4"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Immer kann man die Logik so auffassen, dass jeder Satz sein eigener Beweis ist.</p>",
                          "en": "<p>It is always possible to construe logic in such a way that every proposition is its own proof.</p>"
                        },
                        "empty": false,
                        "key": "6.1.2.6.5",
                        "sub_key": "5"
                      }
                    ],
                    "content": {
                      "de": "<p>Ob ein Satz der Logik angeh\u00f6rt, kann man berechnen, indem man die logischen Eigenschaften des <em class=\"germph\">Symbols</em> berechnet.</p><p>Und dies tun wir, wenn wir einen logischen Satz \u201ebeweisen\u201c. Denn, ohne uns um einen Sinn und eine Bedeutung zu k\u00fcmmern, bilden wir den logischen Satz aus anderen nach blo\u00dfen <em class=\"germph\">Zeichenregeln</em>.</p><p>Der Beweis der logischen S\u00e4tze besteht darin, dass wir sie aus anderen logischen S\u00e4tzen durch successive Anwendung gewisser Operationen entstehen lassen, die aus den ersten immer wieder Tautologien erzeugen. (Und zwar <em class=\"germph\">folgen</em> aus einer Tautologie nur Tautologien.)</p><p>Nat\u00fcrlich ist diese Art zu zeigen, dass ihre S\u00e4tze Tautologien sind, der Logik durchaus unwesentlich. Schon darum, weil die S\u00e4tze, von welchen der Beweis ausgeht, ja ohne Beweis zeigen m\u00fcssen, dass sie Tautologien sind.</p>",
                      "en": "<p>One can calculate whether a proposition belongs to logic, by calculating the logical properties of the <em>symbol</em>.</p><p>And this is what we do when we \u2018prove\u2019 a logical proposition. For, without bothering about sense or meaning, we construct the logical proposition out of others using only <em>rules that deal with signs</em>.</p><p>The proof of logical propositions consists in the following process: we produce them out of other logical propositions by successively applying certain operations that always generate further tautologies out of the initial ones. (And in fact only tautologies <em>follow</em> from a tautology.)</p><p>Of course this way of showing that the propositions of logic are tautologies is not at all essential to logic, if only because the propositions from which the proof starts must show without any proof that they are tautologies.</p>"
                    },
                    "empty": false,
                    "key": "6.1.2.6",
                    "sub_key": "6"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Es ist klar, dass die Anzahl der \u201elogischen Grundgesetze\u201c willk\u00fcrlich ist, denn man k\u00f6nnte die Logik ja aus Einem Grundgesetz ableiten, indem man einfach z. B. aus Freges Grundgesetzen das logische Produkt bildet. (Frege w\u00fcrde vielleicht sagen, dass dieses Grundgesetz nun nicht mehr unmittelbar einleuchte. Aber es ist merkw\u00fcrdig, dass ein so exakter Denker wie Frege sich auf den Grad des Einleuchtens als Kriterium des logischen Satzes berufen hat.)</p>",
                          "en": "<p>It is clear that the number of the \u2018primitive propositions of logic\u2019 is arbitrary, since one could derive logic from a single primitive proposition, e.g. by simply constructing the logical product of Frege\u2019s primitive propositions. (Frege would perhaps say that we should then no longer have an immediately self-evident primitive proposition. But it is remarkable that a thinker as rigorous as Frege appealed to the degree of self-evidence as the criterion of a logical proposition.)</p>"
                        },
                        "empty": false,
                        "key": "6.1.2.7.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Alle S\u00e4tze der Logik sind gleichberechtigt, es gibt unter ihnen nicht wesentlich Grundgesetze und abgeleitete S\u00e4tze.</p><p>Jede Tautologie zeigt selbst, dass sie eine Tautologie ist.</p>",
                      "en": "<p>All the propositions of logic are of equal status: it is not the case that some of them are essentially derived propositions.</p><p>Every tautology itself shows that it is a tautology.</p>"
                    },
                    "empty": false,
                    "key": "6.1.2.7",
                    "sub_key": "7"
                  }
                ],
                "content": {
                  "de": "<p>Dass die S\u00e4tze der Logik Tautologien sind, das <em class=\"germph\">zeigt</em> die formalen\u2014logischen\u2014Eigenschaften der Sprache, der Welt.</p><p>Dass ihre Bestandteile <em class=\"germph\">so</em> verkn\u00fcpft eine Tautologie ergeben, das charakterisiert die Logik ihrer Bestandteile.</p><p>Damit S\u00e4tze, auf bestimmte Art und Weise verkn\u00fcpft, eine Tautologie ergeben, dazu m\u00fcssen sie bestimmte Eigenschaften der Struktur haben. Dass sie <em class=\"germph\">so</em> verbunden eine Tautologie ergeben, zeigt also, dass sie diese Eigenschaften der Struktur besitzen.</p>",
                  "en": "<p>The fact that the propositions of logic are tautologies <em>shows</em> the formal\u2014logical\u2014properties of language and the world.</p><p>The fact that a tautology is yielded by <em>this particular way</em> of connecting its constituents characterizes the logic of its constituents.</p><p>If propositions are to yield a tautology when they are connected in a certain way, they must have certain structural properties. So their yielding a tautology when combined <em>in this way</em> shows that they possess these structural properties.</p>"
                },
                "empty": false,
                "key": "6.1.2",
                "sub_key": "2"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Die Logik ist keine Lehre, sondern ein Spiegelbild der Welt.</p><p>Die Logik ist transzendental.</p>",
                  "en": "<p>Logic is not a body of doctrine, but a mirror-image of the world.</p><p>Logic is transcendental.</p>"
                },
                "empty": false,
                "key": "6.1.3",
                "sub_key": "3"
              }
            ],
            "content": {
              "de": "<p>Die S\u00e4tze der Logik sind Tautologien.</p>",
              "en": "<p>The propositions of logic are tautologies.</p>"
            },
            "empty": false,
            "key": "6.1",
            "sub_key": "1"
          }, {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Im Leben ist es ja nie der mathematische Satz, den wir brauchen, sondern wir ben\u00fctzen den mathematischen Satz <em class=\"germph\">nur</em>, um aus S\u00e4tzen, welche nicht der Mathematik angeh\u00f6ren, auf andere zu schlie\u00dfen, welche gleichfalls nicht der Mathematik angeh\u00f6ren.</p><p>(In der Philosophie f\u00fchrt die Frage: \u201eWozu gebrauchen wir eigentlich jenes Wort, jenen Satz\u201c immer wieder zu wertvollen Einsichten.)</p>",
                      "en": "<p>Indeed in real life a mathematical proposition is never what we want. Rather, we make use of mathematical propositions <em>only</em> in inferences from propositions that do not belong to mathematics to others that likewise do not belong to mathematics.</p><p>(In philosophy the question, \u2018What do we actually use this word or this proposition for?\u2019 repeatedly leads to valuable insights.)</p>"
                    },
                    "empty": false,
                    "key": "6.2.1.1",
                    "sub_key": "1"
                  }
                ],
                "content": {
                  "de": "<p>Der Satz der Mathematik dr\u00fcckt keinen Gedanken aus.</p>",
                  "en": "<p>A proposition of mathematics does not express a thought.</p>"
                },
                "empty": false,
                "key": "6.2.1",
                "sub_key": "1"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Die Logik der Welt, die die S\u00e4tze der Logik in den Tautologien zeigen, zeigt die Mathematik in den Gleichungen.</p>",
                  "en": "<p>The logic of the world, which is shown in tautologies by the propositions of logic, is shown in equations by mathematics.</p>"
                },
                "empty": false,
                "key": "6.2.2",
                "sub_key": "2"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Es ist eine Eigenschaft der Bejahung, dass man sie als doppelte Verneinung auffassen kann.</p><p>Es ist eine Eigenschaft von \u201e1<span class=\"mathrel\">+</span>1<span class=\"mathrel\">+</span>1<span class=\"mathrel\">+</span>1\u201c, dass man es als \u201e(1<span class=\"mathrel\">+</span>1)<span class=\"mathrel\">+</span>(1<span class=\"mathrel\">+</span>1)\u201c auffassen kann.</p>",
                      "en": "<p>It is a property of affirmation that it can be construed as double negation.</p><p>It is a property of \u20181<span class=\"mathrel\">+</span>1<span class=\"mathrel\">+</span>1<span class=\"mathrel\">+</span>1\u2019 that it can be construed as \u2018(1<span class=\"mathrel\">+</span>1)<span class=\"mathrel\">+</span>(1<span class=\"mathrel\">+</span>1)\u2019.</p>"
                    },
                    "empty": false,
                    "key": "6.2.3.1",
                    "sub_key": "1"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Und, dass die S\u00e4tze der Mathematik bewiesen werden k\u00f6nnen, hei\u00dft ja nichts anderes, als dass ihre Richtigkeit einzusehen ist, ohne dass das, was sie ausdr\u00fccken, selbst mit den Tatsachen auf seine Richtigkeit hin verglichen werden muss.</p>",
                          "en": "<p>And the possibility of proving the propositions of mathematics means simply that their correctness can be perceived without its being necessary that what they express should itself be compared with the facts in order to determine its correctness.</p>"
                        },
                        "empty": false,
                        "key": "6.2.3.2.1",
                        "sub_key": "1"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Die Identit\u00e4t der Bedeutung zweier Ausdr\u00fccke l\u00e4sst sich nicht <em class=\"germph\">behaupten</em>. Denn, um etwas von ihrer Bedeutung behaupten zu k\u00f6nnen, muss ich ihre Bedeutung kennen: und indem ich ihre Bedeutung kenne, wei\u00df ich, ob sie dasselbe oder verschiedenes bedeuten.</p>",
                          "en": "<p>It is impossible to <em>assert</em> the identity of meaning of two expressions. For in order to be able to assert anything about their meaning, I must know their meaning, and I cannot know their meaning without knowing whether what they mean is the same or different.</p>"
                        },
                        "empty": false,
                        "key": "6.2.3.2.2",
                        "sub_key": "2"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Die Gleichung kennzeichnet nur den Standpunkt, von welchem ich die beiden Ausdr\u00fccke betrachte, n\u00e4mlich vom Standpunkte ihrer Bedeutungsgleichheit.</p>",
                          "en": "<p>An equation merely marks the point of view from which I consider the two expressions: it marks their equivalence in meaning.</p>"
                        },
                        "empty": false,
                        "key": "6.2.3.2.3",
                        "sub_key": "3"
                      }
                    ],
                    "content": {
                      "de": "<p>Frege sagt, die beiden Ausdr\u00fccke haben dieselbe Bedeutung, aber verschiedenen Sinn.</p><p>Das Wesentliche an der Gleichung ist aber, dass sie nicht notwendig ist, um zu zeigen, dass die beiden Ausdr\u00fccke, die das Gleichheitszeichen verbindet, dieselbe Bedeutung haben, da sich dies aus den beiden Ausdr\u00fccken selbst ersehen l\u00e4sst.</p>",
                      "en": "<p>Frege says that the two expressions have the same meaning but different senses.</p><p>But the essential point about an equation is that it is not necessary in order to show that the two expressions connected by the sign of equality have the same meaning, since this can be seen from the two expressions themselves.</p>"
                    },
                    "empty": false,
                    "key": "6.2.3.2",
                    "sub_key": "2"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Der Vorgang des <em class=\"germph\">Rechnens</em> vermittelt eben diese Anschauung.</p><p>Die Rechnung ist kein Experiment.</p>",
                          "en": "<p>The process of <em>calculating</em> serves to bring about that intuition.</p><p>Calculation is not an experiment.</p>"
                        },
                        "empty": false,
                        "key": "6.2.3.3.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Die Frage, ob man zur L\u00f6sung der mathematischen Probleme die Anschauung brauche, muss dahin beantwortet werden, dass eben die Sprache hier die n\u00f6tige Anschauung liefert.</p>",
                      "en": "<p>The question whether intuition is needed for the solution of mathematical problems must be given the answer that in this case language itself provides the necessary intuition.</p>"
                    },
                    "empty": false,
                    "key": "6.2.3.3",
                    "sub_key": "3"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Das Wesentliche der mathematischen Methode ist es, mit Gleichungen zu arbeiten. Auf dieser Methode beruht es n\u00e4mlich, dass jeder Satz der Mathematik sich von selbst verstehen muss.</p>",
                          "en": "<p>It is the essential characteristic of mathematical method that it employs equations. For it is because of this method that every proposition of mathematics must go without saying.</p>"
                        },
                        "empty": false,
                        "key": "6.2.3.4.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Die Mathematik ist eine Methode der Logik.</p>",
                      "en": "<p>Mathematics is a method of logic.</p>"
                    },
                    "empty": false,
                    "key": "6.2.3.4",
                    "sub_key": "4"
                  }
                ],
                "content": {
                  "de": "<p>Wenn zwei Ausdr\u00fccke durch das Gleichheitszeichen verbunden werden, so hei\u00dft das, sie sind durch einander ersetzbar. Ob dies aber der Fall ist, muss sich an den beiden Ausdr\u00fccken selbst zeigen.</p><p>Es charakterisiert die logische Form zweier Ausdr\u00fccke, dass sie durch einander ersetzbar sind.</p>",
                  "en": "<p>If two expressions are combined by means of the sign of equality, that means that they can be substituted for one another. But it must be manifest in the two expressions themselves whether this is the case or not.</p><p>When two expressions can be substituted for one another, that characterizes their logical form.</p>"
                },
                "empty": false,
                "key": "6.2.3",
                "sub_key": "3"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>So lautet der Beweis des Satzes 2<span class=\"mathrel\">\u00d7</span>2<span class=\"mathrel\">=</span>4:</p><p><div class=\"centered\">\n<span class=\"mathop\">(\u03a9<sup><var>\u03bd</var></sup>)<sup><var>\u03bc</var></sup>\u2019</span><var>x</var><span class=\"mathrel\">=</span><span class=\"mathop\">\u03a9<sup><var>\u03bd</var><span class=\"mathrel\">\u00d7</span><var>\u03bc</var></sup>\u2019</span><var>x</var> Def.<br />\n<span class=\"mathop\">\u03a9<sup>2<span class=\"mathrel\">\u00d7</span>2</sup>\u2019</span><var>x</var><span class=\"mathrel\">=</span><span class=\"mathop\">(\u03a9<sup>2</sup>)<sup>2</sup>\u2019</span><var>x</var><span class=\"mathrel\">=</span><span class=\"mathop\">(\u03a9<sup>2</sup>)<sup>1<span class=\"mathrel\">+</span>1</sup>\u2019</span><var>x</var><span class=\"mathrel\">=</span><span class=\"mathop\">\u03a9<sup>2</sup>\u2019</span><span class=\"mathop\">\u03a9<sup>2</sup>\u2019</span><var>x</var><br />\n\n = <span class=\"mathop\">\u03a9<sup>1<span class=\"mathrel\">+</span>1</sup>\u2019</span><span class=\"mathop\">\u03a9<sup>1<span class=\"mathrel\">+</span>1</sup>\u2019</span><var>x</var><span class=\"mathrel\">=</span><span class=\"mathop\">(\u03a9\u2019\u03a9)\u2019</span><span class=\"mathop\">(\u03a9\u2019\u03a9)\u2019</span><var>x</var><br />\n= <span class=\"mathop\">\u03a9\u2019</span><span class=\"mathop\">\u03a9\u2019</span><span class=\"mathop\">\u03a9\u2019</span><span class=\"mathop\">\u03a9\u2019</span><var>x</var><span class=\"mathrel\">=</span><span class=\"mathop\">\u03a9<sup>1<span class=\"mathrel\">+</span>1<span class=\"mathrel\">+</span>1<span class=\"mathrel\">+</span>1</sup>\u2019</span><var>x</var><span class=\"mathrel\">=</span><span class=\"mathop\">\u03a9<sup>4</sup>\u2019</span><var>x</var>.<br />\n</div></p>",
                      "en": "<p>Thus the proof of the proposition 2<span class=\"mathrel\">\u00d7</span>2<span class=\"mathrel\">=</span>4 runs as follows:</p><p><div class=\"centered\">\n<span class=\"mathop\">(\u03a9<sup><var>\u03bd</var></sup>)<sup><var>\u03bc</var></sup>\u2019</span><var>x</var><span class=\"mathrel\">=</span><span class=\"mathop\">\u03a9<sup><var>\u03bd</var><span class=\"mathrel\">\u00d7</span><var>\u03bc</var></sup>\u2019</span><var>x</var> Def.<br />\n<span class=\"mathop\">\u03a9<sup>2<span class=\"mathrel\">\u00d7</span>2</sup>\u2019</span><var>x</var><span class=\"mathrel\">=</span><span class=\"mathop\">(\u03a9<sup>2</sup>)<sup>2</sup>\u2019</span><var>x</var><span class=\"mathrel\">=</span><span class=\"mathop\">(\u03a9<sup>2</sup>)<sup>1<span class=\"mathrel\">+</span>1</sup>\u2019</span><var>x</var><span class=\"mathrel\">=</span><span class=\"mathop\">\u03a9<sup>2</sup>\u2019</span><span class=\"mathop\">\u03a9<sup>2</sup>\u2019</span><var>x</var><br />\n\n = <span class=\"mathop\">\u03a9<sup>1<span class=\"mathrel\">+</span>1</sup>\u2019</span><span class=\"mathop\">\u03a9<sup>1<span class=\"mathrel\">+</span>1</sup>\u2019</span><var>x</var><span class=\"mathrel\">=</span><span class=\"mathop\">(\u03a9\u2019\u03a9)\u2019</span><span class=\"mathop\">(\u03a9\u2019\u03a9)\u2019</span><var>x</var><br />\n= <span class=\"mathop\">\u03a9\u2019</span><span class=\"mathop\">\u03a9\u2019</span><span class=\"mathop\">\u03a9\u2019</span><span class=\"mathop\">\u03a9\u2019</span><var>x</var><span class=\"mathrel\">=</span><span class=\"mathop\">\u03a9<sup>1<span class=\"mathrel\">+</span>1<span class=\"mathrel\">+</span>1<span class=\"mathrel\">+</span>1</sup>\u2019</span><var>x</var><span class=\"mathrel\">=</span><span class=\"mathop\">\u03a9<sup>4</sup>\u2019</span><var>x</var>.<br />\n</div></p>"
                    },
                    "empty": false,
                    "key": "6.2.4.1",
                    "sub_key": "1"
                  }
                ],
                "content": {
                  "de": "<p>Die Methode der Mathematik, zu ihren Gleichungen zu kommen, ist die Substitutionsmethode.</p><p>Denn die Gleichungen dr\u00fccken die Ersetzbarkeit zweier Ausdr\u00fccke aus und wir schreiten von einer Anzahl von Gleichungen zu neuen Gleichungen vor, indem wir, den Gleichungen entsprechend, Ausdr\u00fccke durch andere ersetzen.</p>",
                  "en": "<p>The method by which mathematics arrives at its equations is the method of substitution.</p><p>For equations express the substitutability of two expressions and, starting from a number of equations, we advance to new equations by substituting different expressions in accordance with the equations.</p>"
                },
                "empty": false,
                "key": "6.2.4",
                "sub_key": "4"
              }
            ],
            "content": {
              "de": "<p>Die Mathematik ist eine logische Methode.</p><p>Die S\u00e4tze der Mathematik sind Gleichungen, also Scheins\u00e4tze.</p>",
              "en": "<p>Mathematics is a logical method.</p><p>The propositions of mathematics are equations, and therefore pseudo-propositions.</p>"
            },
            "empty": false,
            "key": "6.2",
            "sub_key": "2"
          }, {
            "children": [
              {
                "children": [],
                "content": {
                  "de": "<p>Das sogenannte Gesetz der Induktion kann jedenfalls kein logisches Gesetz sein, denn es ist offenbar ein sinnvoller Satz.\u2014Und darum kann es auch kein Gesetz a priori sein.</p>",
                  "en": "<p>The so-called law of induction cannot possibly be a law of logic, since it is obviously a proposition with sense.\u2014Nor, therefore, can it be an <em>a priori</em> law.</p>"
                },
                "empty": false,
                "key": "6.3.1",
                "sub_key": "1"
              }, {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Man hat ja auch davon eine Ahnung gehabt, dass es <em class=\"germph\">ein</em> \u201eGesetz der kleinsten Wirkung\u201c geben m\u00fcsse, ehe man genau wusste, wie es lautete. (Hier, wie immer, stellt sich das a priori Gewisse als etwas rein Logisches heraus.)</p>",
                          "en": "<p>Indeed people even surmised that there must be a \u2018law of least action\u2019 before they knew exactly how it went. (Here, as always, what is certain <em>a priori</em> proves to be something purely logical.)</p>"
                        },
                        "empty": false,
                        "key": "6.3.2.1.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>\u201eKausalit\u00e4tsgesetz\u201c, das ist ein Gattungsname. Und wie es in der Mechanik, sagen wir, Minimum-Gesetze gibt\u2014etwa der kleinsten Wirkung\u2014so gibt es in der Physik Kausalit\u00e4tsgesetze, Gesetze von der Kausalit\u00e4tsform.</p>",
                      "en": "<p>\u2018Law of causality\u2019\u2014that is a general name. And just as in mechanics, for example, there are \u2018minimum-principles\u2019, such as the law of least action, so too in physics there are causal laws, laws of the causal form.</p>"
                    },
                    "empty": false,
                    "key": "6.3.2.1",
                    "sub_key": "1"
                  }
                ],
                "content": {
                  "de": "<p>Das Kausalit\u00e4tsgesetz ist kein Gesetz, sondern die Form eines Gesetzes.</p>",
                  "en": "<p>The law of causality is not a law but the form of a law.</p>"
                },
                "empty": false,
                "key": "6.3.2",
                "sub_key": "2"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Wir <em class=\"germph\">glauben</em> nicht a priori an ein Erhaltungsgesetz, sondern wir <em class=\"germph\">wissen</em> a priori die M\u00f6glichkeit einer logischen Form.</p>",
                  "en": "<p>We do not have an <em>a priori belief</em> in a law of conservation, but rather <em>a priori knowledge</em> of the possibility of a logical form.</p>"
                },
                "empty": false,
                "key": "6.3.3",
                "sub_key": "3"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Die Newtonsche Mechanik z.&nbsp;B. bringt die Weltbeschreibung auf eine einheitliche Form. Denken wir uns eine wei\u00dfe Fl\u00e4che, auf der unregelm\u00e4\u00dfige schwarze Flecken w\u00e4ren. Wir sagen nun: Was f\u00fcr ein Bild immer hierdurch entsteht, immer kann ich seiner Beschreibung beliebig nahe kommen, indem ich die Fl\u00e4che mit einem entsprechend feinen quadratischen Netzwerk bedecke und nun von jedem Quadrat sage, dass es wei\u00df oder schwarz ist. Ich werde auf diese Weise die Beschreibung der Fl\u00e4che auf eine einheitliche Form gebracht haben. Diese Form ist beliebig, denn ich h\u00e4tte mit dem gleichen Erfolge ein Netz aus dreieckigen oder sechseckigen Maschen verwenden k\u00f6nnen. Es kann sein, dass die Beschreibung mit Hilfe eines Dreiecks-Netzes einfacher geworden w\u00e4re; das hei\u00dft, dass wir die Fl\u00e4che mit einem gr\u00f6beren Dreiecks-Netz genauer beschreiben k\u00f6nnten als mit einem feineren quadratischen (oder umgekehrt) usw. Den verschiedenen Netzen entsprechen verschiedene Systeme der Weltbeschreibung. Die Mechanik bestimmt eine Form der Weltbeschreibung, indem sie sagt: Alle S\u00e4tze der Weltbeschreibung m\u00fcssen aus einer Anzahl gegebener S\u00e4tze\u2014den mechanischen Axiomen\u2014auf eine gegebene Art und Weise erhalten werden. Hierdurch liefert sie die Bausteine zum Bau des wissenschaftlichen Geb\u00e4udes und sagt: Welches Geb\u00e4ude immer du auff\u00fchren willst, jedes musst du irgendwie mit diesen und nur diesen Bausteinen zusammenbringen.</p><p>(Wie man mit dem Zahlensystem jede beliebige Anzahl, so muss man mit dem System der Mechanik jeden beliebigen Satz der Physik hinschreiben k\u00f6nnen.)</p>",
                      "en": "<p>Newtonian mechanics, for example, imposes a unified form on the description of the world. Let us imagine a white surface with irregular black spots on it. We then say that whatever kind of picture these make, I can always approximate as closely as I wish to the description of it by covering the surface with a sufficiently fine square mesh, and then saying of every square whether it is black or white. In this way I shall have imposed a unified form on the description of the surface. The form is optional, since I could have achieved the same result by using a net with a triangular or hexagonal mesh. Possibly the use of a triangular mesh would have made the description simpler: that is to say, it might be that we could describe the surface more accurately with a coarse triangular mesh than with a fine square mesh (or conversely), and so on. The different nets correspond to different systems for describing the world. Mechanics determines one form of description of the world by saying that all propositions used in the description of the world must be obtained in a given way from a given set of propositions\u2014the axioms of mechanics. It thus supplies the bricks for building the edifice of science, and it says, \u2018Any building that you want to erect, whatever it may be, must somehow be constructed with these bricks, and with these alone.\u2019</p><p>(Just as with the number-system we must be able to write down any number we wish, so with the system of mechanics we must be able to write down any proposition of physics that we wish.)</p>"
                    },
                    "empty": false,
                    "key": "6.3.4.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Und nun sehen wir die gegenseitige Stellung von Logik und Mechanik. (Man k\u00f6nnte das Netz auch aus verschiedenartigen Figuren etwa aus Dreiecken und Sechsecken bestehen lassen.) Dass sich ein Bild, wie das vorhin erw\u00e4hnte, durch ein Netz von gegebener Form beschreiben l\u00e4sst, sagt \u00fcber das Bild <em class=\"germph\">nichts</em> aus. (Denn dies gilt f\u00fcr jedes Bild dieser Art.) Das aber charakterisiert das Bild, dass es sich durch ein bestimmtes Netz von <em class=\"germph\">bestimmter</em> Feinheit <em class=\"germph\">vollst\u00e4ndig</em> beschreiben l\u00e4sst.</p><p>So auch sagt es nichts \u00fcber die Welt aus, dass sie sich durch die Newtonsche Mechanik beschreiben l\u00e4sst; wohl aber, dass sie sich <em class=\"germph\">so</em> durch jene beschreiben l\u00e4sst, wie dies eben der Fall ist. Auch das sagt etwas \u00fcber die Welt, dass sie sich durch die eine Mechanik einfacher beschreiben l\u00e4sst als durch die andere.</p>",
                      "en": "<p>And now we can see the relative position of logic and mechanics. (The net might also consist of more than one kind of mesh: e.g. we could use both triangles and hexagons.) The possibility of describing a picture like the one mentioned above with a net of a given form tells us <em>nothing</em> about the picture. (For that is true of all such pictures.) But what <em>does</em> characterize the picture is that it can be described <em>completely</em> by a particular net with a <em>particular</em> size of mesh.</p><p>Similarly the possibility of describing the world by means of Newtonian mechanics tells us nothing about the world: but what does tell us something about it is the precise <em>way</em> in which it is possible to describe it by these means. We are also told something about the world by the fact that it can be described more simply with one system of mechanics than with another.</p>"
                    },
                    "empty": false,
                    "key": "6.3.4.2",
                    "sub_key": "2"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Durch den ganzen logischen Apparat hindurch sprechen die physikalischen Gesetze doch von den Gegenst\u00e4nden der Welt.</p>",
                          "en": "<p>The laws of physics, with all their logical apparatus, still speak, however indirectly, about the objects of the world.</p>"
                        },
                        "empty": false,
                        "key": "6.3.4.3.1",
                        "sub_key": "1"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Wir d\u00fcrfen nicht vergessen, dass die Weltbeschreibung durch die Mechanik immer die ganz allgemeine ist. Es ist in ihr z.&nbsp;B. nie von <em class=\"germph\">bestimmten</em> materiellen Punkten die Rede, sondern immer nur von <em class=\"germph\">irgend welchen</em>.</p>",
                          "en": "<p>We ought not to forget that any description of the world by means of mechanics will be of the completely general kind. For example, it will never mention <em>particular</em> point-masses: it will only talk about <em>any point-masses whatsoever</em>.</p>"
                        },
                        "empty": false,
                        "key": "6.3.4.3.2",
                        "sub_key": "2"
                      }
                    ],
                    "content": {
                      "de": "<p>Die Mechanik ist ein Versuch, alle <em class=\"germph\">wahren</em> S\u00e4tze, die wir zur Weltbeschreibung brauchen, nach Einem Plane zu konstruieren.</p>",
                      "en": "<p>Mechanics is an attempt to construct according to a single plan all the <em>true</em> propositions that we need for the description of the world.</p>"
                    },
                    "empty": false,
                    "key": "6.3.4.3",
                    "sub_key": "3"
                  }
                ],
                "content": {
                  "de": "<p>Alle jene S\u00e4tze, wie der Satz vom Grunde, von der Kontinuit\u00e4t in der Natur, vom kleinsten Aufwande in der Natur etc. etc., alle diese sind Einsichten a priori \u00fcber die m\u00f6gliche Formgebung der S\u00e4tze der Wissenschaft.</p>",
                  "en": "<p>All such propositions, including the principle of sufficient reason, the laws of continuity in nature and of least effort in nature, etc. etc.\u2014all these are <em>a priori</em> insights about the forms in which the propositions of science can be cast.</p>"
                },
                "empty": false,
                "key": "6.3.4",
                "sub_key": "4"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Obwohl die Flecke in unserem Bild geometrische Figuren sind, so kann doch selbstverst\u00e4ndlich die Geometrie gar nichts \u00fcber ihre tats\u00e4chliche Form und Lage sagen. Das Netz aber ist <em class=\"germph\">rein</em> geometrisch, alle seine Eigenschaften k\u00f6nnen a priori angegeben werden.</p><p>Gesetze wie der Satz vom Grunde, etc. handeln vom Netz, nicht von dem, was das Netz beschreibt.</p>",
                  "en": "<p>Although the spots in our picture are geometrical figures, nevertheless geometry can obviously say nothing at all about their actual form and position. The network, however, is <em>purely</em> geometrical; all its properties can be given <em>a priori</em>.</p><p>Laws like the principle of sufficient reason, etc. are about the net and not about what the net describes.</p>"
                },
                "empty": false,
                "key": "6.3.5",
                "sub_key": "5"
              }, {
                "children": [
                  {
                    "children": [
                      {
                        "children": [
                          {
                            "children": [],
                            "content": {
                              "de": "<p>Das Kant\u2019sche Problem von der rechten und linken Hand, die man nicht zur Deckung bringen kann, besteht schon in der Ebene, ja im eindimensionalen Raum, wo die beiden kongruenten Figuren <var>a</var> und <var>b</var> auch nicht zur Deckung gebracht werden k\u00f6nnen, ohne aus diesem Raum</p><p>Den rechten Handschuh k\u00f6nnte man an die linke Hand ziehen, wenn man ihn im vierdimensionalen Raum umdrehen k\u00f6nnte.</p>",
                              "en": "<p>Kant\u2019s problem about the right hand and the left hand, which cannot be made to coincide, exists even in two dimensions. Indeed, it exists in one-dimensional space</p><p>A right-hand glove could be put on the left hand, if it could be turned round in four-dimensional space.</p>"
                            },
                            "empty": false,
                            "key": "6.3.6.1.1.1",
                            "sub_key": "1"
                          }
                        ],
                        "content": {
                          "de": "<p>Wir k\u00f6nnen keinen Vorgang mit dem \u201eAblauf der Zeit\u201c vergleichen\u2014diesen gibt es nicht\u2014, sondern nur mit einem anderen Vorgang (etwa mit dem Gang des Chronometers).</p><p>Daher ist die Beschreibung des zeitlichen Verlaufs nur so m\u00f6glich, dass wir uns auf einen anderen Vorgang st\u00fctzen.</p><p>Ganz Analoges gilt f\u00fcr den Raum. Wo man z.&nbsp;B. sagt, es k\u00f6nne keines von zwei Ereignissen (die sich gegenseitig ausschlie\u00dfen) eintreten, weil <em class=\"germph\">keine Ursache</em> vorhanden sei, warum das eine eher als das andere eintreten solle, da handelt es sich in Wirklichkeit darum, dass man gar nicht <em class=\"germph\">eines</em> der beiden Ereignisse beschreiben kann, wenn nicht irgend eine Asymmetrie vorhanden ist. Und <em class=\"germph\">wenn</em> eine solche Asymmetrie vorhanden <em class=\"germph\">ist</em>, so k\u00f6nnen wir diese als <em class=\"germph\">Ursache</em> des Eintreffens des einen und Nicht- Eintreffens des anderen auffassen.</p>",
                          "en": "<p>We cannot compare a process with \u2018the passage of time\u2019\u2014there is no such thing\u2014but only with another process (such as the working of a chronometer).</p><p>Hence we can describe the lapse of time only by relying on some other process.</p><p>Something exactly analogous applies to space: e.g. when people say that neither of two events (which exclude one another) can occur, because there is <em>nothing to cause</em> the one to occur rather than the other, it is really a matter of our being unable to describe <em>one</em> of the two events unless there is some sort of asymmetry to be found. And <em>if</em> such an asymmetry <em>is</em> to be found, we can regard it as the <em>cause</em> of the occurrence of the one and the non-occurrence of the other.</p>"
                        },
                        "empty": false,
                        "key": "6.3.6.1.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>In der Ausdrucksweise Hertz\u2019s  k\u00f6nnte man sagen: Nur <em class=\"germph\">gesetzm\u00e4\u00dfige</em> Zusammenh\u00e4nge sind <em class=\"germph\">denkbar</em>.</p>",
                      "en": "<p>One might say, using Hertz\u2019s terminology, that only connexions that are <em>subject to law</em> are <em>thinkable</em>.</p>"
                    },
                    "empty": false,
                    "key": "6.3.6.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Was sich beschreiben l\u00e4sst, das kann auch geschehen, und was das Kausalit\u00e4tsgesetz ausschlie\u00dfen soll, das l\u00e4sst sich auch nicht beschreiben.</p>",
                      "en": "<p>What can be described can happen too: and what the law of causality is meant to exclude cannot even be described.</p>"
                    },
                    "empty": false,
                    "key": "6.3.6.2",
                    "sub_key": "2"
                  }, {
                    "children": [
                      {
                        "children": [
                          {
                            "children": [],
                            "content": {
                              "de": "<p>Dass die Sonne morgen aufgehen wird, ist eine Hypothese; und das hei\u00dft: wir <em class=\"germph\">wissen</em> nicht, ob sie aufgehen wird.</p>",
                              "en": "<p>It is an hypothesis that the sun will rise tomorrow: and this means that we do not <em>know</em> whether it will rise.</p>"
                            },
                            "empty": false,
                            "key": "6.3.6.3.1.1",
                            "sub_key": "1"
                          }
                        ],
                        "content": {
                          "de": "<p>Dieser Vorgang hat aber keine logische, sondern nur eine psychologische Begr\u00fcndung.</p><p>Es ist klar, dass kein Grund vorhanden ist, zu glauben, es werde nun auch wirklich der einfachste Fall eintreten.</p>",
                          "en": "<p>This procedure, however, has no logical justification but only a psychological one.</p><p>It is clear that there are no grounds for believing that the simplest eventuality will in fact be realized.</p>"
                        },
                        "empty": false,
                        "key": "6.3.6.3.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Der Vorgang der Induktion besteht darin, dass wir das <em class=\"germph\">einfachste</em> Gesetz annehmen, das mit unseren Erfahrungen in Einklang zu bringen ist.</p>",
                      "en": "<p>The procedure of induction consists in accepting as true the <em>simplest</em> law that can be reconciled with our experiences.</p>"
                    },
                    "empty": false,
                    "key": "6.3.6.3",
                    "sub_key": "3"
                  }
                ],
                "content": {
                  "de": "<p>Wenn es ein Kausalit\u00e4tsgesetz g\u00e4be, so k\u00f6nnte es lauten: \u201eEs gibt Naturgesetze\u201c.</p><p>Aber freilich kann man das nicht sagen: es zeigt sich.</p>",
                  "en": "<p>If there were a law of causality, it might be put in the following way: There are laws of nature.</p><p>But of course that cannot be said: it makes itself manifest.</p>"
                },
                "empty": false,
                "key": "6.3.6",
                "sub_key": "6"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Der ganzen modernen Weltanschauung liegt die T\u00e4uschung zugrunde, dass die sogenannten Naturgesetze die Erkl\u00e4rungen der Naturerscheinungen seien.</p>",
                      "en": "<p>The whole modern conception of the world is founded on the illusion that the so-called laws of nature are the explanations of natural phenomena.</p>"
                    },
                    "empty": false,
                    "key": "6.3.7.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>So bleiben sie bei den Naturgesetzen als bei etwas Unantastbarem stehen, wie die \u00c4lteren bei Gott und dem Schicksal.</p><p>Und sie haben ja beide Recht, und Unrecht. Die Alten sind allerdings insofern klarer, als sie einen klaren Abschluss anerkennen, w\u00e4hrend es bei dem neuen System scheinen soll, als sei <em class=\"germph\">alles</em> erkl\u00e4rt.</p>",
                      "en": "<p>Thus people today stop at the laws of nature, treating them as something inviolable, just as God and Fate were treated in past ages.</p><p>And in fact both are right and both wrong: though the view of the ancients is clearer in so far as they have a clear and acknowledged terminus, while the modern system tries to make it look as if <em>everything</em> were explained.</p>"
                    },
                    "empty": false,
                    "key": "6.3.7.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Die Welt ist unabh\u00e4ngig von meinem Willen.</p>",
                      "en": "<p>The world is independent of my will.</p>"
                    },
                    "empty": false,
                    "key": "6.3.7.3",
                    "sub_key": "3"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Auch wenn alles, was wir w\u00fcnschen, gesch\u00e4he, so w\u00e4re dies doch nur, sozusagen, eine Gnade des Schicksals, denn es ist kein <em class=\"germph\">logischer</em> Zusammenhang zwischen Willen und Welt, der dies verb\u00fcrgte, und den angenommenen physikalischen Zusammenhang k\u00f6nnten wir doch nicht selbst wieder wollen.</p>",
                      "en": "<p>Even if all that we wish for were to happen, still this would only be a favour granted by fate, so to speak: for there is no <em>logical</em> connexion between the will and the world, which would guarantee it, and the supposed physical connexion itself is surely not something that we could will.</p>"
                    },
                    "empty": false,
                    "key": "6.3.7.4",
                    "sub_key": "4"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Dass z.&nbsp;B. zwei Farben zugleich an einem Ort des Gesichtsfeldes sind, ist unm\u00f6glich, und zwar logisch unm\u00f6glich, denn es ist durch die logische Struktur der Farbe ausgeschlossen.</p><p>Denken wir daran, wie sich dieser Widerspruch in der Physik darstellt: Ungef\u00e4hr so, dass ein Teilchen nicht zu gleicher Zeit zwei Geschwindigkeiten haben kann; das hei\u00dft, dass es nicht zu gleicher Zeit an zwei Orten sein kann; das hei\u00dft, dass Teilchen an verschiedenen Orten zu Einer Zeit nicht identisch sein k\u00f6nnen.</p><p>(Es ist klar, dass das logische Produkt zweier Elementars\u00e4tze weder eine Tautologie noch eine Kontradiktion sein kann. Die Aussage, dass ein Punkt des Gesichtsfeldes zu gleicher Zeit zwei verschiedene Farben hat, ist eine Kontradiktion.)</p>",
                          "en": "<p>For example, the simultaneous presence of two colours at the same place in the visual field is impossible, in fact logically impossible, since it is ruled out by the logical structure of colour.</p><p>Let us think how this contradiction appears in physics: more or less as follows\u2014a particle cannot have two velocities at the same time; that is to say, it cannot be in two places at the same time; that is to say, particles that are in different places at the same time cannot be identical.</p><p>(It is clear that the logical product of two elementary propositions can neither be a tautology nor a contradiction. The statement that a point in the visual field has two different colours at the same time is a contradiction.)</p>"
                        },
                        "empty": false,
                        "key": "6.3.7.5.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p>Wie es nur eine <em class=\"germph\">logische</em> Notwendigkeit gibt, so gibt es auch nur eine <em class=\"germph\">logische</em> Unm\u00f6glichkeit.</p>",
                      "en": "<p>Just as the only necessity that exists is <em>logical</em> necessity, so too the only impossibility that exists is <em>logical</em> impossibility.</p>"
                    },
                    "empty": false,
                    "key": "6.3.7.5",
                    "sub_key": "5"
                  }
                ],
                "content": {
                  "de": "<p>Einen Zwang, nach dem Eines geschehen m\u00fcsste, weil etwas anderes geschehen ist, gibt es nicht. Es gibt nur eine <em class=\"germph\">logische</em> Notwendigkeit.</p>",
                  "en": "<p>There is no compulsion making one thing happen because another has happened. The only necessity that exists is <em>logical</em> necessity</p>"
                },
                "empty": false,
                "key": "6.3.7",
                "sub_key": "7"
              }
            ],
            "content": {
              "de": "<p>Die Erforschung der Logik bedeutet die Erforschung <em class=\"germph\">aller Gesetzm\u00e4\u00dfigkeit</em>. Und au\u00dferhalb der Logik ist alles Zufall.</p>",
              "en": "<p>The exploration of logic means the exploration of <em>everything that is subject to law</em>. And outside logic everything is accidental.</p>"
            },
            "empty": false,
            "key": "6.3",
            "sub_key": "3"
          }, {
            "children": [
              {
                "children": [],
                "content": {
                  "de": "<p>Der Sinn der Welt muss au\u00dferhalb ihrer liegen. In der Welt ist alles, wie es ist, und geschieht alles, wie es geschieht; es gibt <em class=\"germph\">in</em> ihr keinen Wert\u2014und wenn es ihn g\u00e4be, so h\u00e4tte er keinen Wert.</p><p>Wenn es einen Wert gibt, der Wert hat, so muss er au\u00dferhalb alles Geschehens und So-Seins liegen. Denn alles Geschehen und So-Sein ist zuf\u00e4llig.</p><p>Was es nichtzuf\u00e4llig macht, kann nicht <em class=\"germph\">in</em> der Welt liegen, denn sonst w\u00e4re dies wieder zuf\u00e4llig.</p><p>Es muss au\u00dferhalb der Welt liegen.</p>",
                  "en": "<p>The sense of the world must lie outside the world. In the world everything is as it is, and everything happens as it does happen: <em>in</em> it no value exists\u2014and if it did exist, it would have no value.</p><p>If there is any value that does have value, it must lie outside the whole sphere of what happens and is the case. For all that happens and is the case is accidental.</p><p>What makes it non-accidental cannot lie <em>within</em> the world, since if it did it would itself be accidental.</p><p>It must lie outside the world.</p>"
                },
                "empty": false,
                "key": "6.4.1",
                "sub_key": "1"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Es ist klar, dass sich die Ethik nicht aussprechen l\u00e4sst.</p><p>Die Ethik ist transzendental.</p><p>(Ethik und \u00c4sthetik sind Eins.)</p>",
                      "en": "<p>It is clear that ethics cannot be put into words.</p><p>Ethics is transcendental.</p><p>(Ethics and aesthetics are one and the same.)</p>"
                    },
                    "empty": false,
                    "key": "6.4.2.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Der erste Gedanke bei der Aufstellung eines ethischen Gesetzes von der Form \u201eDu sollst \u2026\u201c ist: Und was dann, wenn ich es nicht tue? Es ist aber klar, dass die Ethik nichts mit Strafe und Lohn im gew\u00f6hnlichen Sinne zu tun hat. Also muss diese Frage nach den <em class=\"germph\">Folgen</em> einer Handlung belanglos sein.\u2014Zum Mindesten d\u00fcrfen diese Folgen nicht Ereignisse sein. Denn etwas muss doch an jener Fragestellung richtig sein. Es muss zwar eine Art von ethischem Lohn und ethischer Strafe geben, aber diese m\u00fcssen in der Handlung selbst liegen.</p><p>(Und das ist auch klar, dass der Lohn etwas Angenehmes, die Strafe etwas Unangenehmes sein muss.)</p>",
                      "en": "<p>When an ethical law of the form, \u2018Thou shalt \u2026\u2019 is laid down, one\u2019s first thought is, \u2018And what if I do not do it?\u2019 It is clear, however, that ethics has nothing to do with punishment and reward in the usual sense of the terms. So our question about the <em>consequences</em> of an action must be unimportant.\u2014At least those consequences should not be events. For there must be something right about the question we posed. There must indeed be some kind of ethical reward and ethical punishment, but they must reside in the action itself.</p><p>(And it is also clear that the reward must be something pleasant and the punishment something unpleasant.)</p>"
                    },
                    "empty": false,
                    "key": "6.4.2.2",
                    "sub_key": "2"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Vom Willen als dem Tr\u00e4ger des Ethischen kann nicht gesprochen werden.</p><p>Und der Wille als Ph\u00e4nomen interessiert nur die Psychologie.</p>",
                      "en": "<p>It is impossible to speak about the will in so far as it is the subject of ethical attributes.</p><p>And the will as a phenomenon is of interest only to psychology.</p>"
                    },
                    "empty": false,
                    "key": "6.4.2.3",
                    "sub_key": "3"
                  }
                ],
                "content": {
                  "de": "<p>Darum kann es auch keine S\u00e4tze der Ethik geben.</p><p>S\u00e4tze k\u00f6nnen nichts H\u00f6heres ausdr\u00fccken.</p>",
                  "en": "<p>So too it is impossible for there to be propositions of ethics.</p><p>Propositions can express nothing that is higher.</p>"
                },
                "empty": false,
                "key": "6.4.2",
                "sub_key": "2"
              }, {
                "children": [
                  {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Der Tod ist kein Ereignis des Lebens. Den Tod erlebt man nicht.</p><p>Wenn man unter Ewigkeit nicht unendliche Zeitdauer, sondern Unzeitlichkeit versteht, dann lebt der ewig, der in der Gegenwart lebt.</p><p>Unser Leben ist ebenso endlos, wie unser Gesichtsfeld grenzenlos ist.</p>",
                          "en": "<p>Death is not an event in life: we do not live to experience death.</p><p>If we take eternity to mean not infinite temporal duration but timelessness, then eternal life belongs to those who live in the present.</p><p>Our life has no end in just the way in which our visual field has no limits.</p>"
                        },
                        "empty": false,
                        "key": "6.4.3.1.1",
                        "sub_key": "1"
                      }, {
                        "children": [],
                        "content": {
                          "de": "<p>Die zeitliche Unsterblichkeit der Seele des Menschen, das hei\u00dft also ihr ewiges Fortleben auch nach dem Tode, ist nicht nur auf keine Weise verb\u00fcrgt, sondern vor allem leistet diese Annahme gar nicht das, was man immer mit ihr erreichen wollte. Wird denn dadurch ein R\u00e4tsel gel\u00f6st, dass ich ewig fortlebe? Ist denn dieses ewige Leben dann nicht ebenso r\u00e4tselhaft wie das gegenw\u00e4rtige? Die L\u00f6sung des R\u00e4tsels des Lebens in Raum und Zeit liegt <em class=\"germph\">au\u00dferhalb</em> von Raum und Zeit.</p><p>(Nicht Probleme der Naturwissenschaft sind ja zu l\u00f6sen.)</p>",
                          "en": "<p>Not only is there no guarantee of the temporal immortality of the human soul, that is to say of its eternal survival after death; but, in any case, this assumption completely fails to accomplish the purpose for which it has always been intended. Or is some riddle solved by my surviving for ever? Is not this eternal life itself as much of a riddle as our present life? The solution of the riddle of life in space and time lies <em>outside</em> space and time.</p><p>(It is certainly not the solution of any problems of natural science that is required.)</p>"
                        },
                        "empty": false,
                        "key": "6.4.3.1.2",
                        "sub_key": "2"
                      }
                    ],
                    "content": {
                      "de": "<p>Wie auch beim Tod die Welt sich nicht \u00e4ndert, sondern aufh\u00f6rt.</p>",
                      "en": "<p>So too at death the world does not alter, but comes to an end.</p>"
                    },
                    "empty": false,
                    "key": "6.4.3.1",
                    "sub_key": "1"
                  }, {
                    "children": [
                      {
                        "children": [],
                        "content": {
                          "de": "<p>Die Tatsachen geh\u00f6ren alle nur zur Aufgabe, nicht zur L\u00f6sung.</p>",
                          "en": "<p>The facts all contribute only to setting the problem, not to its solution.</p>"
                        },
                        "empty": false,
                        "key": "6.4.3.2.1",
                        "sub_key": "1"
                      }
                    ],
                    "content": {
                      "de": "<p><em class=\"germph\">Wie</em> die Welt ist, ist f\u00fcr das H\u00f6here vollkommen gleichg\u00fcltig. Gott offenbart sich nicht <em class=\"germph\">in</em> der Welt.</p>",
                      "en": "<p><em>How</em> things are in the world is a matter of complete indifference for what is higher. God does not reveal himself <em>in</em> the world.</p>"
                    },
                    "empty": false,
                    "key": "6.4.3.2",
                    "sub_key": "2"
                  }
                ],
                "content": {
                  "de": "<p>Wenn das gute oder b\u00f6se Wollen die Welt \u00e4ndert, so kann es nur die Grenzen der Welt \u00e4ndern, nicht die Tatsachen; nicht das, was durch die Sprache ausgedr\u00fcckt werden kann.</p><p>Kurz, die Welt muss dann dadurch \u00fcberhaupt eine andere werden. Sie muss sozusagen als Ganzes abnehmen oder zunehmen.</p><p>Die Welt des Gl\u00fccklichen ist eine andere als die des Ungl\u00fccklichen.</p>",
                  "en": "<p>If the good or bad exercise of the will does alter the world, it can alter only the limits of the world, not the facts\u2014not what can be expressed by means of language.</p><p>In short the effect must be that it becomes an altogether different world. It must, so to speak, wax and wane as a whole.</p><p>The world of the happy man is a different one from that of the unhappy man.</p>"
                },
                "empty": false,
                "key": "6.4.3",
                "sub_key": "3"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Nicht <em class=\"germph\">wie</em> die Welt ist, ist das Mystische, sondern <em class=\"germph\">dass</em> sie ist.</p>",
                  "en": "<p>It is not <em>how</em> things are in the world that is mystical, but <em>that</em> it exists.</p>"
                },
                "empty": false,
                "key": "6.4.4",
                "sub_key": "4"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Die Anschauung der Welt sub specie aeterni ist ihre Anschauung als\u2014begrenztes\u2014Ganzes.</p><p>Das Gef\u00fchl der Welt als begrenztes Ganzes ist das mystische.</p>",
                  "en": "<p>To view the world sub specie aeterni is to view it as a whole\u2014a limited whole.</p><p>Feeling the world as a limited whole\u2014it is this that is mystical.</p>"
                },
                "empty": false,
                "key": "6.4.5",
                "sub_key": "5"
              }
            ],
            "content": {
              "de": "<p>Alle S\u00e4tze sind gleichwertig.</p>",
              "en": "<p>All propositions are of equal value.</p>"
            },
            "empty": false,
            "key": "6.4",
            "sub_key": "4"
          }, {
            "children": [
              {
                "children": [],
                "content": {
                  "de": "<p>Skeptizismus ist <em class=\"germph\">nicht</em> unwiderleglich, sondern offenbar unsinnig, wenn er bezweifeln will, wo nicht gefragt werden kann.</p><p>Denn Zweifel kann nur bestehen, wo eine Frage besteht; eine Frage nur, wo eine Antwort besteht, und diese nur, wo etwas <em class=\"germph\">gesagt</em> werden <em class=\"germph\">kann</em>.</p>",
                  "en": "<p>Scepticism is <em>not</em> irrefutable, but obviously nonsensical, when it tries to raise doubts where no questions can be asked.</p><p>For doubt can exist only where a question exists, a question only where an answer exists, and an answer only where something <em>can be said</em>.</p>"
                },
                "empty": false,
                "key": "6.5.1",
                "sub_key": "1"
              }, {
                "children": [
                  {
                    "children": [],
                    "content": {
                      "de": "<p>Die L\u00f6sung des Problems des Lebens merkt man am Verschwinden dieses Problems.</p><p>(Ist nicht dies der Grund, warum Menschen, denen der Sinn des Lebens nach langen Zweifeln klar wurde, warum diese dann nicht sagen konnten, worin dieser Sinn bestand?)</p>",
                      "en": "<p>The solution of the problem of life is seen in the vanishing of the problem.</p><p>(Is not this the reason why those who have found after a long period of doubt that the sense of life became clear to them have then been unable to say what constituted that sense?)</p>"
                    },
                    "empty": false,
                    "key": "6.5.2.1",
                    "sub_key": "1"
                  }, {
                    "children": [],
                    "content": {
                      "de": "<p>Es gibt allerdings Unaussprechliches. Dies <em class=\"germph\">zeigt</em> sich, es ist das Mystische.</p>",
                      "en": "<p>There are, indeed, things that cannot be put into words. They <em>make themselves manifest</em>. They are what is mystical.</p>"
                    },
                    "empty": false,
                    "key": "6.5.2.2",
                    "sub_key": "2"
                  }
                ],
                "content": {
                  "de": "<p>Wir f\u00fchlen, dass, selbst wenn alle <em class=\"germph\">m\u00f6glichen</em> wissenschaftlichen Fragen beantwortet sind, unsere Lebensprobleme noch gar nicht ber\u00fchrt sind. Freilich bleibt dann eben keine Frage mehr; und eben dies ist die Antwort.</p>",
                  "en": "<p>We feel that even when <em>all possible</em> scientific questions have been answered, the problems of life remain completely untouched. Of course there are then no questions left, and this itself is the answer.</p>"
                },
                "empty": false,
                "key": "6.5.2",
                "sub_key": "2"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Die richtige Methode der Philosophie w\u00e4re eigentlich die: Nichts zu sagen, als was sich sagen l\u00e4sst, also S\u00e4tze der Naturwissenschaft\u2014also etwas, was mit Philosophie nichts zu tun hat\u2014, und dann immer, wenn ein anderer etwas Metaphysisches sagen wollte, ihm nachzuweisen, dass er gewissen Zeichen in seinen S\u00e4tzen keine Bedeutung gegeben hat. Diese Methode w\u00e4re f\u00fcr den anderen unbefriedigend\u2014er h\u00e4tte nicht das Gef\u00fchl, dass wir ihn Philosophie lehrten\u2014aber <em class=\"germph\">sie</em> w\u00e4re die einzig streng richtige.</p>",
                  "en": "<p>The correct method in philosophy would really be the following: to say nothing except what can be said, i.e. propositions of natural science\u2014i.e. something that has nothing to do with philosophy\u2014and then, whenever someone else wanted to say something metaphysical, to demonstrate to him that he had failed to give a meaning to certain signs in his propositions. Although it would not be satisfying to the other person\u2014he would not have the feeling that we were teaching him philosophy\u2014<em>this</em> method would be the only strictly correct one.</p>"
                },
                "empty": false,
                "key": "6.5.3",
                "sub_key": "3"
              }, {
                "children": [],
                "content": {
                  "de": "<p>Meine S\u00e4tze erl\u00e4utern dadurch, dass sie der, welcher mich versteht, am Ende als unsinnig erkennt, wenn er durch sie\u2014auf ihnen\u2014\u00fcber sie hinausgestiegen ist. (Er muss sozusagen die Leiter wegwerfen, nachdem er auf ihr hinaufgestiegen ist.)</p><p>Er muss diese S\u00e4tze \u00fcberwinden, dann sieht er die Welt richtig.</p>",
                  "en": "<p>My propositions serve as elucidations in the following way: anyone who understands me eventually recognizes them as nonsensical, when he has used them\u2014as steps\u2014to climb up beyond them. (He must, so to speak, throw away the ladder after he has climbed up it.)</p><p>He must transcend these propositions, and then he will see the world aright.</p>"
                },
                "empty": false,
                "key": "6.5.4",
                "sub_key": "4"
              }
            ],
            "content": {
              "de": "<p>Zu einer Antwort, die man nicht aussprechen kann, kann man auch die Frage nicht aussprechen.</p><p><em class=\"germph\">Das R\u00e4tsel</em> gibt es nicht. </p><p>Wenn sich eine Frage \u00fcberhaupt stellen l\u00e4sst, so <em class=\"germph\">kann</em> sie auch beantwortet werden.</p>",
              "en": "<p>When the answer cannot be put into words, neither can the question be put into words.</p><p><em>The riddle</em> does not exist.</p><p>If a question can be framed at all, it is also <em>possible</em> to answer it.</p>"
            },
            "empty": false,
            "key": "6.5",
            "sub_key": "5"
          }
        ],
        "content": {
          "de": "<p>Die allgemeine Form der Wahrheitsfunktion ist: [<span class=\"overlined\"><var>p</var></span>,  <span class=\"overlined\"><var class=\"pushvar\">\u03be</var></span>,  <span class=\"nop\">N</span>(<span class=\"overlined\"><var class=\"pushvar\">\u03be</var></span>)].</p><p>Dies ist die allgemeine Form des Satzes.</p>",
          "en": "<p>The general form of a truth-function is  [<span class=\"overlined\"><var>p</var></span>,  <span class=\"overlined\"><var class=\"pushvar\">\u03be</var></span>,  <span class=\"nop\">N</span>(<span class=\"overlined\"><var class=\"pushvar\">\u03be</var></span>)].</p><p>This is the general form of a proposition.</p>"
        },
        "empty": false,
        "key": "6",
        "sub_key": "6"
      }, {
        "children": [],
        "content": {
          "de": "<p>Wovon man nicht sprechen kann, dar\u00fcber muss man schweigen.</p>",
          "en": "<p>What we cannot speak about we must pass over in silence.</p>"
        },
        "empty": false,
        "key": "7",
        "sub_key": "7"
      }
    ],
    "key": "0"
  });

  angular.module('tractatus-tree').directive('tractatusGraph', [
    '$rootScope', 'constant.events', 'constant.tree', function($rootScope, EVENTS, TREE) {
      return {
        restrict: "A",
        template: "<div><svg></svg></div>",
        replace: true,
        link: function(scope, elem, attr) {
          var activeNode, collapseNode, colors, diagonal, duration, elemWidth, getHeight, getNodeColor, getTextColor, getWidth, height, i, init, margin, nodeHasChildren, nodeIsActive, nodeIsOpen, onNodeClicked, root, setActive, svg, toggleOpen, tree, update, width;
          activeNode = void 0;
          colors = {
            active: 'rgb(69, 69, 69)',
            inactive: 'rgb(179, 179, 179)'
          };
          elemWidth = $(elem).outerWidth();
          margin = {
            top: 20,
            right: 10,
            bottom: 20,
            left: 300
          };
          width = elemWidth;
          height = 550;
          i = 0;
          duration = 750;
          root = null;
          getWidth = function() {
            return width;
          };
          getHeight = function() {
            return height;
          };
          collapseNode = function(node) {
            if (node.opened) {
              node.opened = false;
            }
            if (node.children) {
              node._children = node.children;
              node._children.forEach(collapseNode);
              node.children = null;
            }
          };
          nodeHasChildren = function(node) {
            var children, has;
            children = node.children || node._children;
            children = angular.copy(children) || [];
            has = children.length > 0;
            return has;
          };
          getNodeColor = function(node) {
            if (nodeIsActive(node.key)) {
              return colors.active;
            } else {
              return colors.inactive;
            }
          };
          getTextColor = function(node) {
            if (nodeIsActive(node.key)) {
              return 'white';
            } else {
              return colors.active;
            }
          };
          nodeIsOpen = function(node) {
            var opened;
            opened = !!node.opened;
            return opened;
          };
          nodeIsActive = function(node_key) {
            var is_active;
            is_active = activeNode && activeNode === node_key;
            return is_active;
          };
          setActive = function(node_key) {
            activeNode = node_key;
            return activeNode;
          };
          toggleOpen = function(node) {
            if (!nodeIsActive(node.key)) {
              if (!nodeIsOpen(node)) {
                setActive(node.key);
              }
            }
            if (nodeIsOpen(node)) {
              node.opened = false;
              collapseNode(node);
            } else {
              node.opened = true;
              node.children = node._children;
              scope.$parent.$broadcast(EVENTS.node.selected, node);
            }
            return update(node);
          };
          onNodeClicked = toggleOpen;
          svg = d3.select(elem[0]).selectAll('svg').attr('width', getWidth()).attr('height', getHeight()).append("g").attr("transform", "translate(40,0)");
          tree = d3.layout.tree().size([getHeight(), getWidth()]);
          diagonal = d3.svg.diagonal().projection(function(node) {
            return [node.y, node.x];
          });
          init = function() {
            root = TREE;
            root.opened = true;
            root.x0 = height / 2;
            root.y0 = margin.left;
            root.children.forEach(collapseNode);
            return update(root);
          };
          update = function(source) {
            var link, links, node, nodeEnter, nodeExit, nodeUpdate, nodes;
            nodes = tree.nodes(root).reverse();
            links = tree.links(nodes);
            nodes.forEach(function(node) {
              node.y = node.depth * 120;
            });
            node = svg.selectAll("g.node").data(nodes, function(node) {
              return node.id || (node.id = ++i);
            });
            nodeEnter = node.enter().append("g").attr("class", 'node').attr("transform", function(node) {
              return "translate(" + source.y0 + "," + source.x0 + ")";
            }).on("click", onNodeClicked);
            nodeEnter.append("rect").attr("width", 60).attr("height", 20).attr("rx", 5).attr("ry", 5).attr("y", -10).style("stroke", "#000000").style("stroke-width", 1);
            nodeEnter.append("text").attr("dy", ".35em").attr("x", 30).attr("text-anchor", "middle").text(function(node) {
              return node.key;
            }).style("fill", 'white').style("fill-opacity", 1e-6);
            nodeUpdate = node.transition().duration(duration).attr("transform", function(node) {
              return "translate(" + node.y + "," + node.x + ")";
            });
            nodeUpdate.select("rect").style("fill", getNodeColor);
            nodeUpdate.select("text").style("fill", 'white').style("fill-opacity", 1);
            nodeExit = node.exit().transition().duration(duration).attr("transform", function(node) {
              return "translate(" + source.y + "," + source.x + ")";
            }).remove();
            nodeExit.select("circle").attr("r", 1e-6);
            nodeExit.select("text").style("fill-opacity", 1e-6);
            link = svg.selectAll("path.link").data(links, function(node) {
              return node.target.id;
            });
            link.enter().insert("path", "g").attr("class", "link").attr("d", function(node) {
              var o;
              o = {
                x: source.x0,
                y: source.y0
              };
              return diagonal({
                source: o,
                target: o
              });
            });
            link.transition().duration(duration).attr("d", diagonal);
            link.exit().transition().duration(duration).attr("d", function(node) {
              var o;
              o = {
                x: source.x,
                y: source.y
              };
              return diagonal({
                source: o,
                target: o
              });
            }).remove();
            nodes.forEach(function(node) {
              node.x0 = node.x;
              node.y0 = node.y;
            });
          };
          init();
        }
      };
    }
  ]);

}).call(this);
