/**
 * Contributor Profiles Configuration
 *
 * This file controls which community members appear on the
 * "Disney Employee Contributions" page. To add a new profile,
 * append a new object to the `contributorProfiles` array.
 *
 * Required fields (one of):
 * - username: GitHub username of the contributor (for GitHub profiles)
 * - name: Full name of the contributor (for non-GitHub profiles)
 *
 * Optional fields:
 * - email: Email address of the contributor (for non-GitHub profiles)
 * - featuredRepo: Specific repository to highlight (defaults to most starred repo, GitHub only)
 * - role: Contributor's role/title within Disney or the project
 * - description: Short blurb to display in the UI
 */
export interface ContributorProfileConfig {
  username?: string
  name?: string
  email?: string
  featuredRepo?: string | null
  role?: string
  description?: string
}

export const contributorProfiles: ContributorProfileConfig[] = [

  {
    username: 'iancward',
    role: 'Staff Reliability Engineer',
    featuredRepo: 'open-telemetry/opentelemetry-js-contrib',
    description: 'Contributing to open-telemetry/opentelemetry-js-contrib.',
  },
  {
    name: 'Dang H. Nguyen',
    email: 'dang.nguyen@disney.com',
    featuredRepo: 'chef-cookbooks/chef-splunk',
    description: 'Contributing to chef-cookbooks/chef-splunk.',
  },
  {
    name: 'David Petzel',
    email: 'david.petzel@disney.com',
    featuredRepo: 'test-kitchen/winrm-transport',
    description: 'Contributing to test-kitchen/winrm-transport.',
  },
  {
    name: 'Ivan Piesh',
    email: 'ipiesh@skysound.com',
    featuredRepo: 'burrowers/garble',
    description: 'Contributing to burrowers/garble.',
  },
  {
    name: 'Jeffrey Jackson',
    email: 'jeffrey.c.jackson@disney.com',
    featuredRepo: 'fluttercommunity/flutter_downloader',
    description: 'Contributing to fluttercommunity/flutter_downloader.',
  },
  {
    name: 'Joshua Minor',
    email: 'joshm@pixar.com',
    featuredRepo: 'googlevr/usd-unity-sdk',
    description: 'Contributing to googlevr/usd-unity-sdk.',
  },
  {
    name: 'Ken Figueiredo',
    email: 'kfigueiredo@skysound.com',
    featuredRepo: 'burrowers/garble',
    description: 'Contributing to burrowers/garble.',
  },
  {
    name: 'Lars R. Damerow',
    email: 'lars@pixar.com',
    featuredRepo: 'MATE desktop',
    description: 'Contributing to MATE desktop.',
  },
  {
    name: 'Rod Miles',
    email: 'rod.miles@disney.com',
    featuredRepo: 'jamiechong/revisionize',
    description: 'Contributing to jamiechong/revisionize.',
  },
  {
    name: 'Roman Romanenco',
    email: 'roman.romanenco@disney.com',
    featuredRepo: 'Automattic/wpscan-examples',
    description: 'Contributing to Automattic/wpscan-examples.',
  },
  {
    name: 'Ryan Frias',
    email: 'rfrias@skysound.com',
    featuredRepo: 'burrowers/garble',
    description: 'Contributing to burrowers/garble.',
  },
  {
    name: 'Stephan Steinbach',
    email: 'steinbach@pixar.com',
    featuredRepo: 'googlevr/usd-unity-sdk',
    description: 'Contributing to googlevr/usd-unity-sdk.',
  },
  {
    name: 'Steven Wagner',
    email: 'steven.wagner@disney.com',
    featuredRepo: 'rebuy-de/aws-nuke',
    description: 'Contributing to rebuy-de/aws-nuke.',
  },
  {
    name: 'Tim Hoff',
    email: 'tim.hoff@disneyanimation.com',
    featuredRepo: 'gifnksm/etc-passwd',
    description: 'Contributing to gifnksm/etc-passwd.',
  },
  {
    name: 'Adam Eivy',
    email: 'adam.eivy@disney.com',
    featuredRepo: 'atomantic/dotfiles',
    description: 'Contributing to atomantic/dotfiles.',
  },
  {
    name: 'Alexander C Chen',
    email: 'alexander.c.chen@disney.com',
    featuredRepo: 'kubernetes/kubernetes',
    description: 'Contributing to kubernetes/kubernetes.',
  },
  {
    name: 'Argishti Rostamian',
    email: 'argishti.rostamian@disney.com',
    featuredRepo: 'datahub-project/datahub',
    description: 'Contributing to datahub-project/datahub.',
  },
  {
    name: 'Austin Fonacier',
    email: 'austin.fonacier@disney.com',
    featuredRepo: 'QueueClassic/queue_classic',
    description: 'Contributing to QueueClassic/queue_classic.',
  },
  {
    name: 'Ayyaz Akhtar',
    email: 'ayyaz.akhtar@disney.com',
    featuredRepo: 'nginx/njs-examples',
    description: 'Contributing to nginx/njs-examples.',
  },
  {
    name: 'Billy Watson',
    email: 'billy.watson@disney.com',
    featuredRepo: 'apache/knox',
    description: 'Contributing to apache/knox.',
  },
  {
    name: 'Bradley S Fought',
    email: 'bradley.s.fought@disney.com',
    featuredRepo: 'sodadata/soda-sql',
    description: 'Contributing to sodadata/soda-sql.',
  },
  {
    name: 'Charles Durham',
    email: 'charles.durham@disney.com',
    featuredRepo: 'square/kotlinpoet',
    description: 'Contributing to square/kotlinpoet.',
  },
  {
    name: 'Charles V Pritchard',
    email: 'charles.v.pritchard@disney.com',
    featuredRepo: 'EverNewJoy/VictoryPlugin',
    description: 'Contributing to EverNewJoy/VictoryPlugin.',
  },
  {
    name: 'Chiragi X Danak',
    email: 'chiragi.x.danak.-nd@disney.com',
    featuredRepo: 'DataDog/puppet-datadog-agent',
    description: 'Contributing to DataDog/puppet-datadog-agent.',
  },
  {
    name: 'Chris L Nauroth',
    email: 'chris.l.nauroth@disney.com',
    featuredRepo: 'aws/aws-sdk-java',
    description: 'Contributing to aws/aws-sdk-java.',
  },
  {
    name: 'Cj Barker',
    email: 'cj.barker@disney.com',
    featuredRepo: 'DataDog/chef-datadog',
    description: 'Contributing to DataDog/chef-datadog.',
  },
  {
    name: 'Comand',
    email: 'comand@pixar.com',
    featuredRepo: 'lxde/qtermwidget',
    description: 'Contributing to lxde/qtermwidget.',
  },
  {
    name: 'Corey Hudson',
    email: 'corey.hudson@disney.com',
    featuredRepo: 'sandflow/ffmpeg-imf',
    description: 'Contributing to sandflow/ffmpeg-imf.',
  },
  {
    name: 'Dan Borthwick',
    email: 'dan.borthwick@disney.com',
    featuredRepo: 'jamiechong/revisionize',
    description: 'Contributing to jamiechong/revisionize.',
  },
  {
    name: 'Darren Robinson',
    email: 'darren.robinson@disney.com',
    featuredRepo: 'AcademySoftwareFoundation/openvdb',
    description: 'Contributing to AcademySoftwareFoundation/openvdb.',
  },
  {
    name: 'David Aguilar',
    email: 'david.aguilar@disney.com',
    featuredRepo: 'sideeffects/HoudiniEngineForMaya',
    description: 'Contributing to sideeffects/HoudiniEngineForMaya.',
  },
  {
    name: 'Drew H Kutilek',
    email: 'drew.h.kutilek@disney.com',
    featuredRepo: 'google/closure-library',
    description: 'Contributing to google/closure-library.',
  },
  {
    name: 'Eric Friedrich',
    email: 'eric.friedrich@disney.com',
    featuredRepo: 'apache/trafficcontrol',
    description: 'Contributing to apache/trafficcontrol.',
  },
  {
    name: 'Georgina M Biascoechea',
    email: 'georgina.m.biascoechea.-nd@disney.com',
    featuredRepo: 'PixarAnimationStudios/USD',
    description: 'Contributing to PixarAnimationStudios/USD.',
  },
  {
    name: 'Guido',
    email: 'guido@pixar.com',
    featuredRepo: 'PixarAnimationStudios/USD',
    description: 'Contributing to PixarAnimationStudios/USD.',
  },
  {
    name: 'Guy Molinari',
    email: 'guy.molinari@disney.com',
    featuredRepo: 'apache/beam',
    description: 'Contributing to apache/beam.',
  },
  {
    username: 'iancward',
    role: 'Staff Reliability Engineer',
    featuredRepo: 'DataDog/chef-datadog',
    description: 'Contributing to DataDog/chef-datadog.',
  },
  {
    name: 'James Tatum',
    email: 'james.tatum@disney.com',
    featuredRepo: 'terraform-providers/terraform-provider-aws',
    description: 'Contributing to terraform-providers/terraform-provider-aws.',
  },
  {
    name: 'Jason H Martin',
    email: 'jason.h.martin@disney.com',
    featuredRepo: 'chaos-mesh/chaos-mesh',
    description: 'Contributing to chaos-mesh/chaos-mesh.',
  },
  {
    name: 'Jason Weber',
    email: 'jason.weber@disneystreaming.com',
    description: 'Contributing to open source projects.',
  },
  {
    name: 'Jason Young',
    email: 'jason.young@disney.com',
    featuredRepo: 'yiisoft/yii2',
    description: 'Contributing to yiisoft/yii2.',
  },
  {
    name: 'Jeff Laplante',
    email: 'jeff.laplante@disney.com',
    featuredRepo: 'akamai/terraform-provider-akamai',
    description: 'Contributing to akamai/terraform-provider-akamai.',
  },
  {
    name: 'Jhamot',
    email: 'jhamot@lucasfilm.com',
    featuredRepo: 'AcademySoftwareFoundation/OpenRV',
    description: 'Contributing to AcademySoftwareFoundation/OpenRV.',
  },
  {
    name: 'Jloy',
    email: 'jloy@pixar.com',
    featuredRepo: 'boostorg/python',
    description: 'Contributing to boostorg/python.',
  },
  {
    name: 'Jorge A De Gouveia',
    email: 'jorge.a.de.gouveia@disney.com',
    featuredRepo: 'opencv/cvat',
    description: 'Contributing to opencv/cvat.',
  },
  {
    name: 'Joshua Tway',
    email: 'joshua.tway@disney.com',
    featuredRepo: 'Slash',
    description: 'Contributing to Slash.',
  },
  {
    name: 'Kathleen F Brown',
    email: 'kathleen.f.brown@disney.com',
    featuredRepo: 'snowplow-devops/terraform-aws-collector-kinesis-ec2',
    description: 'Contributing to snowplow-devops/terraform-aws-collector-kinesis-ec2.',
  },
  {
    name: 'Kevin P Gambrel',
    email: 'kevin.p.gambrel@disney.com',
    featuredRepo: 'rferrazz/pyqt4topyqt5',
    description: 'Contributing to rferrazz/pyqt4topyqt5.',
  },
  {
    name: 'Lucas Byerley',
    email: 'lucas.byerley@disney.com',
    featuredRepo: 'facebook/lexical',
    description: 'Contributing to facebook/lexical.',
  },
  {
    name: 'Markv',
    email: 'markv@pixar.com',
    featuredRepo: 'OpenImageIO/oiio',
    description: 'Contributing to OpenImageIO/oiio.',
  },
  {
    name: 'Matt Curcio',
    email: 'matt.curcio@disney.com',
    featuredRepo: 'IHMCQuadrupedRobotics',
    description: 'Contributing to IHMCQuadrupedRobotics.',
  },
  {
    name: 'Matthew Schnittker',
    email: 'matthew.schnittker@disneyanimation.com',
    featuredRepo: 'DataDog/puppet-datadog-agent',
    description: 'Contributing to DataDog/puppet-datadog-agent.',
  },
  {
    name: 'Michael A Hopkins',
    email: 'michael.a.hopkins@disney.com',
    featuredRepo: 'IHMCQuadrupedRobotics',
    description: 'Contributing to IHMCQuadrupedRobotics.',
  },
  {
    name: 'Michael Kidd',
    email: 'michael.kidd@disney.com',
    featuredRepo: 'sannies/mp4parser',
    description: 'Contributing to sannies/mp4parser.',
  },
  {
    name: 'Mike Dillon',
    email: 'mike.dillon@disney.com',
    featuredRepo: 'hashicorp/terraform-provider-aws',
    description: 'Contributing to hashicorp/terraform-provider-aws.',
  },
  {
    name: 'Mitchell L Cooper',
    email: 'mitchell.l.cooper@disney.com',
    featuredRepo: 'DataDog/chef-datadog',
    description: 'Contributing to DataDog/chef-datadog.',
  },
  {
    name: 'Muhammad Yahia',
    email: 'muhammad.yahia@disney.com',
    featuredRepo: 'kubernetes/kubernetes',
    description: 'Contributing to kubernetes/kubernetes.',
  },
  {
    name: 'Nigel Simpson',
    email: 'nigel.simpson@disney.com',
    featuredRepo: 'chef-cookbooks/yum',
    description: 'Contributing to chef-cookbooks/yum.',
  },
  {
    name: 'Nwaters',
    email: 'nwaters@pixar.com',
    featuredRepo: 'tommikaikkonen/redux-orm',
    description: 'Contributing to tommikaikkonen/redux-orm.',
  },
  {
    name: 'Olivier Melois',
    email: 'olivier.melois_delete@disneystreaming.com',
    featuredRepo: 'awslabs/smithy',
    description: 'Contributing to awslabs/smithy.',
  },
  {
    name: 'Robert Secco',
    email: 'robert.secco@disney.com',
    featuredRepo: 'codingfinest/neo4j-go-ogm',
    description: 'Contributing to codingfinest/neo4j-go-ogm.',
  },
  {
    name: 'Spencer Goad',
    email: 'spencer.goad@disney.com',
    featuredRepo: 'specklesystems/speckle-server',
    description: 'Contributing to specklesystems/speckle-server.',
  },
  {
    name: 'Steven Wojcik',
    email: 'steven.wojcik@disney.com',
    featuredRepo: 'varnishcache/varnish-cache',
    description: 'Contributing to varnishcache/varnish-cache.',
  },
  {
    name: 'Taylor J Dolezal',
    email: 'taylor.j.dolezal@disney.com',
    featuredRepo: 'Probator',
    description: 'Contributing to Probator.',
  },
  {
    name: 'Txomin Barturen',
    email: 'txomin.barturen@disney.com',
    featuredRepo: 'percona/percona-xtrabackup',
    description: 'Contributing to percona/percona-xtrabackup.',
  },
  {
    name: 'Vinod Badugu',
    email: 'vinod.badugu@disney.com',
    featuredRepo: 'confluentinc/confluent-kafka-dotnet',
    description: 'Contributing to confluentinc/confluent-kafka-dotnet.',
  },
  {
    name: 'Zach Bintliff',
    email: 'zach.bintliff@disney.com',
    featuredRepo: 'istio/istio',
    description: 'Contributing to istio/istio.',
  },
]
