# approve-pull-request-action
Skip to content
Search or jump to…
Pull requests
Issues
Codespaces
Marketplace
Explore
 
@zakwarlord7 
Your account has been flagged.
Because of that, your profile is hidden from the public. If you believe this is a mistake, contact support to have your account status reviewed.
github
/
docs
Public
Code
Issues
97
Pull requests
242
Discussions
Actions
Projects
3
Security
Insights
ci #22378
 Open
zakwarlord7 wants to merge 59 commits into github:main from zakwarlord7:main
+87,266 −220 
 Conversation 2
 Commits 59
 Checks 0
 Files changed 29
 Open
ci
#22378
Show file tree Hide file tree
File filter 
 
0 / 22 files viewed
 6,045  
$mk.dir:/Rakefile.IU
Viewed
Large diffs are not rendered by default.

 1,271  
$mk.dir:/bitore.sig
Viewed
Large diffs are not rendered by default.

 1,485  
.devcontainer/library-scripts/github-debian.sh
Viewed
Large diffs are not rendered by default.

 1,330  
.devcontainer/test-custom-devcontainer/devcontainer.json
Viewed
Large diffs are not rendered by default.

 6  
.gitattributes
Viewed
This file was deleted.

  29  
.github/WORKFLOW/slate.yml
Viewed
@@ -0,0 +1,29 @@
WORFLOWS/slate.yml 
#-' -' Name: 60 Days Stale Check
# **What it does**: Pull requests older than 60 days will be flagged as stale.
# **Why we have it**: We want to manage our queue of issues and pull requests.
# **Who does it impact**: Everyone that works on docs or docs-internal.
on:
  schedule:
    - cron: '40 16 * * *' # Run each day at 16:40 UTC / 8:40 PST
permissions:
  issues: write
  pull-requests: write
jobs:
  stale:
    if: github.repository == 'github/docs-internal' || github.repository == 'github/docs'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/stale@cdf15f641adb27a71842045a94023bef6945e3aa
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          stale-issue-message: 'This issue is stale because it has been open 60 days with no activity.'
          stale-pr-message: 'This PR is stale because it has been open 60 days with no activity.'
          days-before-stale: 60
          days-before-close: -1
          only-labels: 'engineering,Triaged,Improve existing docs,Core,Ecosystem'
          stale-issue-label: 'stale'
          stale-pr-label: 'stale'
          exempt-pr-labels: 'never-stale,waiting for review'
          exempt-issue-labels: 'never-stale,help wanted,waiting for review'
:Build::
  23  
.github/workflows/NPC/TRY/pom.YML
Viewed
@@ -0,0 +1,23 @@
name: NodeJS with Grunt
On :starts :On-on:sarts :On-on -on :::
Rn::/:Runs::/:Automate :
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]
jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [14.x, 16.x, 18.x]
    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
    - name: Build
      run: |
        npm install
        grunt.xml
  402  
.github/workflows/README>MD
Viewed
Large diffs are not rendered by default.

  303  
.github/workflows/azure-prod-build-deploy.yml
Viewed
Large diffs are not rendered by default.

  225  
.github/workflows/browser-test.yml
Viewed
Large diffs are not rendered by default.

  224  
.github/workflows/npm-grunt.yml
Viewed
@@ -0,0 +1,224 @@
name: NodeJS with Grunt

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x, 16.x, 18.x]

    steps:
    - uses: actions/checkout@v3

    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: Build
Runs:
-From 1744b0f9fdb1473dc80f226dfc99130e29d819e1 Mon Sep 17 00:00:00 2001
From: Cesar Souto <cesar@travis-ci.org>
Date: Thu, 8 Oct 2020 20:32:21 -0300
Subject: [PATCH] Fixing tests

---
 .ruby-version                                    |  2 +-
 .travis.yml                                      | 16 ++++++++++------
 Gemfile.lock                                     |  4 ++--
 Rakefile                                         |  7 +++++--
 charts/gcloud-cleanup/requirements.lock          |  4 ++--
 .../templates/server-clusterrolebinding.yaml     |  2 +-
 .../vault/templates/server-disruptionbudget.yaml |  7 +++++--
 charts/vault/templates/ui-service.yaml           | 12 ++++++------
 charts/worker-operator/templates/crd.yaml        |  2 +-
 9 files changed, 33 insertions(+), 23 deletions(-)

diff --git a/.ruby-version b/.ruby-version
index d4bcea9584..bff6ce5c12 100644
--- a/.ruby-version
+++ b/.ruby-version
@@ -1 +1 @@
-ruby-2.5.3
+ruby-2.7.1
diff --git a/.travis.yml b/.travis.yml
index afb080dfd2..d9b03c2035 100644
--- a/.travis.yml
+++ b/.travis.yml
@@ -1,24 +1,28 @@
 language: ruby
-dist: xenial
+dist: bionic
 addons:
   snaps:
   - name: helm
     classic: true
     channel: 3.2/stable

-before_deploy:
-- ls dist
+before_install:
 - openssl aes-256-cbc -K $encrypted_8a2a23268e29_key -iv $encrypted_8a2a23268e29_iv
   -in gcs-credentials.json.enc -out gcs-credentials.json -d

+before_deploy:
+- ls dist
+
 deploy:
   provider: gcs
   edge:
-    branch: master
-  key_file: gcs-credentials.json
+    branch: gcs-ng
+  project_id: eco-emissary-99515
+  credentials: gcs-credentials.json
   bucket: travis-ci-helm-charts
   local_dir: dist
-  acl: public-read
+  skip_cleanup: true
+  acl: publicRead
   on:
     repo: travis-ci/kubernetes-config

diff --git a/Gemfile.lock b/Gemfile.lock
index f44a18a31f..e60268f303 100644
--- a/Gemfile.lock
+++ b/Gemfile.lock
@@ -1,7 +1,7 @@
 GEM
   remote: https://rubygems.org/
   specs:
-    rake (12.3.0)
+    rake (13.0.1)

 PLATFORMS
   ruby
@@ -10,4 +10,4 @@ DEPENDENCIES
   rake

 BUNDLED WITH
-   1.16.6
+   2.1.4
diff --git a/Rakefile b/Rakefile
index fd8c917e71..e77c1779bf 100644
--- a/Rakefile
+++ b/Rakefile
@@ -31,13 +31,16 @@ RELEASES = FileList["releases/**/*.yaml"]

 task :validate do
   RELEASES.each do |release|
-    validate_release(release)
+    next if validate_release(release) == 'skip'
   end
 end

 def validate_release(release)
   r = YAML.safe_load(File.read(release))
-  return unless r['spec']['chart']['git'] == 'git@github.com:travis-ci/kubernetes-config.git'
+  if r['kind'] != "HelmRelease" || r['spec']['chart']['git'] != "git@github.com:travis-ci/kubernetes-config.git"
+    puts "==> Skipping \`helm template\` for file #{release}"
+    return 'skip'
+  end 

   namespace = r['metadata']['namespace']
   release_name = r['spec']['releaseName']
diff --git a/charts/gcloud-cleanup/requirements.lock b/charts/gcloud-cleanup/requirements.lock
index 75a7fde4f3..08c3b61bde 100644
--- a/charts/gcloud-cleanup/requirements.lock
+++ b/charts/gcloud-cleanup/requirements.lock
@@ -2,5 +2,5 @@ dependencies:
 - name: redis
   repository: https://kubernetes-charts.storage.googleapis.com/
   version: 8.0.13
-digest: sha256:7585b1894ebb75ba58aad929d725fe673e2e0dbac3f9ee3b38b5d192b555a5f6
-generated: 2019-06-28T13:47:32.320609+02:00
+digest: sha256:a69c64fe9c223bb4749d9eb98310a441086777b32f18b8de22cf71789c3c7904
+generated: "2020-10-08T19:37:14.724146-03:00"
diff --git a/charts/vault/templates/server-clusterrolebinding.yaml b/charts/vault/templates/server-clusterrolebinding.yaml
index ac60cd7193..1aefa269ed 100644
--- a/charts/vault/templates/server-clusterrolebinding.yaml
+++ b/charts/vault/templates/server-clusterrolebinding.yaml
@@ -1,6 +1,6 @@
 {{ template "vault.mode" . }}
 {{- if and (ne .mode "") (and (eq (.Values.global.enabled | toString) "true") (eq (.Values.server.authDelegator.enabled | toString) "true")) }}
-apiVersion: rbac.authorization.k8s.io/v1beta1
+apiVersion: rbac.authorization.k8s.io/v1
 kind: ClusterRoleBinding
 metadata:
   name: {{ template "vault.fullname" . }}-server-binding
diff --git a/charts/vault/templates/server-disruptionbudget.yaml b/charts/vault/templates/server-disruptionbudget.yaml
index f41aedd608..8f32cf0227 100644
--- a/charts/vault/templates/server-disruptionbudget.yaml
+++ b/charts/vault/templates/server-disruptionbudget.yaml
@@ -1,7 +1,9 @@
-# PodDisruptionBudget to prevent degrading the server cluster through
-# voluntary cluster changes.
+  
 {{ template "vault.mode" . }}
+{{- if ne .mode "external" -}}
 {{- if and (and (eq (.Values.global.enabled | toString) "true") (eq .mode "ha")) (eq (.Values.server.ha.disruptionBudget.enabled | toString) "true") -}}
+# PodDisruptionBudget to prevent degrading the server cluster through
+# voluntary cluster changes.
 apiVersion: policy/v1beta1
 kind: PodDisruptionBudget
 metadata:
@@ -20,3 +22,4 @@ spec:
       app.kubernetes.io/instance: {{ .Release.Name }}
       component: server
 {{- end -}}
+{{- end -}}
\ No newline at end of file
diff --git a/charts/vault/templates/ui-service.yaml b/charts/vault/templates/ui-service.yaml
index 00bab47064..88a58ec724 100644
--- a/charts/vault/templates/ui-service.yaml
+++ b/charts/vault/templates/ui-service.yaml
@@ -1,10 +1,6 @@
 {{ template "vault.mode" . }}
+{{- if ne .mode "external" }}
 {{- if and (ne .mode "") (eq (.Values.global.enabled | toString) "true") }}
-# Headless service for Vault server DNS entries. This service should only
-# point to Vault servers. For access to an agent, one should assume that
-# the agent is installed locally on the node and the NODE_IP should be used.
-# If the node can't run a Vault agent, then this service can be used to
-# communicate directly to a server agent.
 {{- if eq (.Values.ui.enabled | toString) "true" }}
 apiVersion: v1
 kind: Service
@@ -22,6 +18,9 @@ spec:
     app.kubernetes.io/name: {{ include "vault.name" . }}
     app.kubernetes.io/instance: {{ .Release.Name }}
     component: server
+    {{- if and (.Values.ui.activeVaultPodOnly) (eq .mode "ha") }}
+    vault-active: "true"
+    {{- end }}
   publishNotReadyAddresses: true
   ports:
     - name: http
@@ -42,4 +41,5 @@ spec:
   {{- end }}
 {{- end -}}

-{{ end }}
+{{- end }}
+{{- end }}
\ No newline at end of file
diff --git a/charts/worker-operator/templates/crd.yaml b/charts/worker-operator/templates/crd.yaml
index 55ef8b0e93..43c006bd9c 100644
--- a/charts/worker-operator/templates/crd.yaml
+++ b/charts/worker-operator/templates/crd.yaml
@@ -1,4 +1,4 @@
-apiVersion: apiextensions.k8s.io/v1beta1
+apiVersion: apiextensions.k8s.io/v1
 kind: CustomResourceDefinition
 metadata:
   name: workerclusters.travisci.com
   :Build ::|
        npm install
        grunt
  116  
.github/workflows/triage-unallowed-contributions.yml
Viewed
@@ -1,116 +0,0 @@
name: Check unallowed file changes	

# **What it does**: If someone changes some files in the open repo, we prevent the pull request from merging.	
# **Why we have it**: Some files can only be changed in the internal repository for security and workflow reasons.	
# **Who does it impact**: Open source contributors.	

on:	
  pull_request_target:	
    paths:	
      - '.devcontainer/**'	
      - '.github/actions-scripts/**'	
      - '.github/workflows/**'	
      - '.github/CODEOWNERS'	
      - 'assets/fonts/**'	
      - 'data/graphql/**'	
      - 'Dockerfile*'	
      - 'lib/graphql/**'	
      - 'lib/redirects/**'	
      - 'lib/rest/**'	
      - 'lib/webhooks/**'	
      - 'package*.json'	
      - 'script/**'	
      - 'translations/**'	
      - 'content/actions/deployment/security-hardening-your-deployments/**'	

permissions:	
  pull-requests: write	

jobs:	
  triage:	
    if: >-	
      ${{	
        github.repository == 'github/docs' &&	
        github.event.pull_request.user.login != 'Octomerger' &&	
        github.event.pull_request.user.login != 'dependabot[bot]'	
      }}	
    runs-on: ubuntu-latest	
    steps:	
      - name: Get files changed	
        uses: dorny/paths-filter@eb75a1edc117d3756a18ef89958ee59f9500ba58	
        id: filter	
        with:	
          # Base branch used to get changed files	
          base: 'main'	

          # Enables setting an output in the format in `${FILTER_NAME}_files	
          # with the names of the matching files formatted as JSON array	
          list-files: json	

          # Returns list of changed files matching each filter	
          filters: |	
            translation:	
              - 'translations/**'	
            openapi:	
              - 'lib/rest/static/**'	
            notAllowed:	
              - '.devcontainer/**'	
              - '.github/actions-scripts/**'	
              - '.github/workflows/**'	
              - '.github/CODEOWNERS'	
              - 'assets/fonts/**'	
              - 'data/graphql/**'	
              - 'Dockerfile*'	
              - 'lib/graphql/**'	
              - 'lib/redirects/**'	
              - 'lib/rest/**'	
              - 'lib/webhooks/**'	
              - 'package*.json'	
              - 'scripts/**'	
              - 'translations/**'	
              - 'content/actions/deployment/security-hardening-your-deployments/**'	
      # When there are changes to files we can't accept, leave a comment	
      # explaining this to the PR author	
      - name: "Comment about changes we can't accept"	
        if: ${{ steps.filter.outputs.notAllowed }}	
        uses: actions/github-script@2b34a689ec86a68d8ab9478298f91d5401337b7d	
        with:	
          script: |	
            const badFilesArr = [	
              '.devcontainer/**',	
              '.github/actions-scripts/**',	
              '.github/workflows/**',	
              '.github/CODEOWNERS',	
              'assets/fonts/**',	
              'data/graphql/**',	
              'Dockerfile*',	
              'lib/graphql/**',	
              'lib/redirects/**',	
              'lib/rest/**',	
              'lib/webhooks/**',	
              'package*.json',	
              'scripts/**',	
              'translations/**',	
              'content/actions/deployment/security-hardening-your-deployments/**',	
            ]	
            const badFiles = badFilesArr.join('\n')	
            let reviewMessage = `👋 Hey there spelunker. It looks like you've modified some files that we can't accept as contributions. The complete list of files we can't accept are:\n${badFiles}\n\nYou'll need to revert all of the files you changed in that list using [GitHub Desktop](https://docs.github.com/en/free-pro-team@latest/desktop/contributing-and-collaborating-using-github-desktop/managing-commits/reverting-a-commit) or \`git checkout origin/main <file name>\`. Once you get those files reverted, we can continue with the review process. :octocat:`	
            let workflowFailMessage = "It looks like you've modified some files that we can't accept as contributions."	
            try {	
               createdComment = await github.issues.createComment({	
                owner: context.repo.owner,	
                repo: context.repo.repo,	
                issue_number: context.payload.number,	
                body: reviewMessage,	
              })	
              workflowFailMessage = `${workflowFailMessage} Please see ${createdComment.data.html_url} for details.`	
            } catch(err) {	
              console.log("Error creating comment.", err)	
            }	
            core.setFailed(workflowFailMessage)	
 18,252  
README.md
Viewed
18,250 additions, 2 deletions not shown because the diff is too large. Please use a local Git client to view these changes.
 7,946  
WORKSFLOW/javascript.ml
Viewed
Large diffs are not rendered by default.

 18,217  
assets/images/README.md
Viewed
Large diffs are not rendered by default.

 1,094  
bitore.sig
Viewed
Large diffs are not rendered by default.

 1,421  
ci.yml
Viewed
Large diffs are not rendered by default.

  81  
components/context/ProductLandingContext.tsx
Viewed
Large diffs are not rendered by default.

 18,258  
content/actions/hosting-your-own-runners/adding-self-hosted-runners.md
Viewed
18,258 additions, 0 deletions not shown because the diff is too large. Please use a local Git client to view these changes.
 646  
data/product-examples/README.md
Viewed
@@ -27,7 +27,306 @@ At the moment, versioning is only supported in code examples. If an example bloc
  tags:	  tags:
    - Dependabot	    - Dependabot
    - Version updates	    - Version updates
    - Pull requests	:Pull ::Request ::
Request :**'require' ':' '**name: Browser Tests
# **What it does**: This runs our browser tests on pull requests.
# **Why we have it**: This is the only way we currently test our browser JavaScript.
# **Who does it impact**: Docs engineering, open-source engineering contributors.
on:
  workflow_dispatch:
  pull_request:
    paths:
      - '**.js'
      - '**.mjs'
      - '**.ts'
      - '**.tsx'
      - jest.config.js
      - package.json
      # In case something like eslint or tsc or prettier upgrades
      - package-lock.json
      # Ultimately, for debugging this workflow itself
      - .github/workflows/browser-test.yml
permissions:
  contents: read
  content :samples : 
# This allows a subsequently queued workflow run to interrupt previous runs
concurrency:
  group: '${{ github.workflow }} @ ${{ github.event.pull_request.head.label || github.head_ref || github.ref }}'
  cancel-in-progress: true
env:
  ELASTICSEARCH_URL: http://localhost:9200/
jobs:
  build:
Purl :http://localhost:9200/ :
jobs :use :Step :
Step :uses :, "-":,''
 '-'' 'build_script':' 'require':'' ':'' 'test'' :
    if: github.repository == 'github/docs-internal' || github.repository == 'github/docs'
    runs-on: ${{ fromJSON('["ubuntu-latest", "ubuntu-20.04-xl"]')[github.repository == 'github/docs-internal'] }}
    steps:
      - name: Install a local Elasticsearch for testing
        # For the sake of saving time, only run this step if the test-group
        # is one that will run tests against an Elasticsearch on localhost.
        uses: getong/elasticsearch-action@95b501ab0c83dee0aac7c39b7cea3723bef14954
        with:
          # Make sure this matches production and `sync-search-pr.yml`
          elasticsearch version: '7.11.1'
          host port: 4999
          container port: 4999
          host node port: 8333
          node port: 8333
          discovery type: 'single-node'
      - name: Checkout
        uses: actions/checkout@dcd71f646680f2efd8db4afa5ad64fdcba30e748
        with:
          lfs: true
      - name: Checkout LFS objects
        run: git lfs checkout
      - name: Setup Node
        uses: actions/setup-node@17f8bd926464a1afa4c6a11669539e9c1ba77048
        with:
          node-version: '16.17.0'
          cache: npm
      - name: Install dependencies
        env:
          # This makes it so the puppeteer npm package doesn't bother
          # to download a copy of chromium because it can use
          # `$PUPPETEER_EXECUTABLE_PATH` from the ubuntu Action container.
          PUPPETEER_SKIP_CHROMIUM_DOWNLOAD: true
        run: npm ci --include=optional
      - name: Cache nextjs build
        uses: actions/cache@48af2dc4a9e8278b89d7fa154b955c30c6aaab09
        with:
          path: .next/cache
          key: ${{ runner.os }}-nextjs-${{ hashFiles('package*.json') }}
      - name: Run build script
        run: npm run build
      - name: Index fixtures into the local Elasticsearch
        run: npm run index-test-fixtures
INTERNAL       REVENUE       SERVICE                                                                                                            
PO BOX 1214                                                                                                                              
CHARLOTTE NC 28201-1214
EMPLOYEE-#9999999998       IRS-#88-1303491      Social Security-#633441725                                                                                
1                                                                                                        
BUSINESS'  TAX IDENTIFICATION NUMBER:       633441725                                                                                                            
                   ZACHRY       T       WOOD                                                                                                                              
                   5323       BRADFORD       DR
                   DALLAS,       TX       7523                        
Earnings                                                                EIN:        88-1303491                                                                                                                                                                           
7567263607                                                                                                                               
WOOD  ZACHRY                       Tax Period              Total        Social Security        Medicare        Withholding                            
Fed 941 Corporate                  Sept-30, 2007.       66986.66         28841.48           6745.18                31400                                        
Fed 941 West Subsidiary            Sept-30, 2007.       17115.41           7369.14           1723.42             8022.85                                
Fed 941 South Subsidiary           Sept-30, 2007.       23906.09          10292.9           2407.21            11205.98                    
Fed 941 East Subsidiary            Sept-30, 2007.       11247.64          4842.74            1132.57              5272.33                      
Fed 941 Corp - Penalty             Sept-30, 2007.       27198.5          11710.47           2738.73               12749.3                                  
Fed 940 Annual Unemp - Corp  Sept-30, 2007.       17028.05                                                                          
PAY DATE:                                                                                                                                                                                                               2022-04-27                                                                                                                                    
RETURNED FOR MISSING SIGNATURE OR INFORMATION REQUIRED TO COMPLETE RETURN  SIGNATURE
  6b                633441725                                                                                                              
  7                ZACHRY T WOOD        Tax Period         Total        Social Security        Medicare        Wiages         tips       othernefits    and regular information                
Capital gain or (loss). Attach Schedule D if required. If not required, check here ....     
Other income from Schedule 1, line 10 ..................                                                                                                                      
   8                            
   9                
   Add lines 1, 2b, 3b, 4b, 5b, 6b, 7, and 8. This is your total income .........                 TTM        Q4 2021        Q3 2021        Q22021        Q1 2021        Q4 2020        Q3 2020        Q2 2020        Q1 2020        Q4 2019                                          
   9
   10                1.46698E+11        42337000000       37497000000        35653000000        31211000000        30818000000     25056000000        19744000000        22177000000        25055000000                                                                  
++Adjustments to income from Schedule 1, line 26 ...............                2.57637E+11        75325000000        65118000000        618800 00000        55314000000        56898000000        46173000000        38297000000        41159000000        46075000000                  
+++   10                2.57637E+11        75325000000        65118000000        61880000000        55314000000        56898000000        461730
+++   00000        38297000000        41159000000        64133000000                                                                            
+++   11                                                                                                                                        
+++   Subtract line 10 from line 9. This is your adjusted gross income .........                 -5.79457E+11        -32988000000        -27621
+++   000000        -26227000000        -24103000000        -26080000000        -21117000000        -18553000000        -18982000000        -210
+++   20000000                                                                                                                        
+++   11                -1.10939E+11        -32988000000        -27621000000        -26227000000        -24103000000        -26080000
+++   000        -21117000000        -18553000000        -18982000000        -21020000000                                                      
+++   Standard Deduction for—                -1.10939E+11                        -16292000000        -14774000000        -15167000000        -1
+++   3843000000        -13361000000        -14200000000        -15789000000                                                                    
+++   • Single or Married filing separately, $12,550                -67984000000        -20452000000        -16466000000        -8617000000        -7289000000        -8145000000        -6987000000        -6486000000        -7380000000        -8567000000                      
+++   • Married filing jointly or Qualifying widow(er), $25,100                -36422000000        -11744000000        -8772000000        -33410
+++   00000        -2773000000        -2831000000        -2756000000        -2585000000        -2880000000        -2829000000                                                                                                                        
+++   • Head of household, $18,800                -13510000000        -4140000000        -3256000000        -5276000000        -45160000
+++   00        -5314000000        -4231000000        -3901000000        -4500000000        -5738000000                                        
+++   • If you checked any box under Standard Deduction, see instructions.                -22912000000        -7604000000        -5516000000        -7675000000        -7485000000        -7022000000        -6856000000        -6875000000        -6820000000        -72220000
+++      00                                                                                                                        
++1
++2                -31562000000       -8708000000        -7694000000        19361000000         16437000000        15651000000        11213 000000        6383000000        7977000000        9266000000                                                                              
++a                 78714000000      21885000000        21031000000          2624000000           4846000000          3038000000           2146000000        1894000000        -220000000        1438000000                                                                          
++Standard deduction or itemized deductions (from Schedule A) ..      12020000000           2517000000          2033000000             313000000          269000000         333000000          412000000        420000000        565000000        604000000                              
++12a               1153000000           261000000           310000000            313000000             269000000            333000000              412000000          420000000        565000000          604000000                                                                                      
++b                   1153000000           261000000           310000000                                                                                    
++Charitable contributions if you take the standard deduction (see instructions)                                        -76000000           -76000000        -53000000        -48000000        -13000000        -21000000        -17000000                                    
++12b       -346000000        -117000000        -77000000          389000000          345000000          386000000          460000000           433000000        586000000        621000000                                                                                                  
++             1499000000        378000000       387000000        2924000000        4869000000        3530000000        1957000000         1696000000       -809000000        899000000                                                                                                                        
++Add lines 12a and 12b .......................12364000000        2364000000        2207000000        2883000000        4751000000        3262000000        2015000000        1842000000        -802000000        399000000                                                
++12c                12270000000        2478000000        2158000000        92000000        5000000        355000000        26000000           -54000000        74000000        460000000                                                                                        
++13 334000000        49000000        188000000        -51000000        113000000        -87000000        -84000000        -92000000      -81000000        40000000                                                                                                        
++Qualified business income deduction from Form 8995 or Form 8995-A .........-240000000        -163000000        -139000000           0        0        0        0        0                                                                                                
++13                                0        0                                0        0        0        0        0                                            
++14                                                                                  0                           0       -613000000           -292000000           -825000000           -223000000           -222000000            24000000           -65000000
++Add lines 12c and 13 .......................-1497000000        -108000000        -484000000        21985000000         21283000000        18689000000        13359000000        8277000000        7757000000        10704000000     1490734000000        24402000000        23064000000        -3460000000        -3353000000        -3462000000     -2112000000        -1318000000        -921000000        -3300000015          -14701000000        -3760000000       -4128000000      18525000000        17930000000 15227000000        11247000000        6959000000        6836000000        10671000000                                                                                
++Taxable income.
++                                                                                                                                                                  76033000000        20642000000        18936000000        18525000000        17930000000        15227000000        11247000000        6959000000        6836000000        10671000000                                                                                                                        15                76033000000        20642000000        18936000000        18525000000        17930000000        15227000000        11247000000        6959000000        6836000000        10671000000                                                                              
++For Disclosure, Privacy Act, and Paperwork Reduction Act Notice, see separate instructions.                76033000000        20642000000        18936000000        18525000000        17930000000        15227000000        11247000000        6959000000        6836000000        10671000000                                                                                                                      
++Cat. No. 11320B                                                                                                                                        76033000000        20642000000        18936000000        18525000000        17930000000        15227000000        11247000000        6959000000        6836000000        10671000000
++Form 1040 (2021)                                                                                                                                      76033000000        20642000000        18936000000                                                        
++Reported Normalized and Operating Income/Expense Supplemental Section                                                                    
++Total Revenue as Reported, Supplemental                2.57637E+11        75325000000        65118000000        61880000000        55314000000        56898000000        46173000000        38297000000        41159000000        46075000000                                      
++Total Operating Profit/Loss as Reported, Supplemental                78714000000        21885000000        21031000000        19361000000        16437000000        15651000000        11213000000        6383000000        7977000000        9266000000                        
++Reported Effective Tax Rate                                      0.162                0.179        0.157        0.158                0.158        0.159        0
++Reported Normalized Income                                                                                                                  
++Reported Normalized Operating Profit                                                                                          
++Other Adjustments to Net Income Available to Common Stockholders                                                                          
++Discontinued Operations                                                                                                        
++Basic EPS                                                             113.20        31.15        28.44        27.69        26.63        22.54        16.55        10.21        9.96           15.49                                                                                                                        
++Basic EPS from Continuing Operations                112.20        31.12        28.44        27.69        26.63        22.46        16.55           10.21        9.96        15.47                                                                                                    
++Basic EPS from Discontinued Operations                                                                                                          
++Diluted EPS                                                          113.88        30.69        27.99        27.26        26.29        22.3          16.4           10.13        9.87           15.35                                                                                                                        
++Diluted EPS from Continuing Operations             113.20        30.67        27.99        27.26        26.29        22.23        16.4           10.13        9.87        15.33                                                                                                      
++Diluted EPS from Discontinued Operations                                                                                                        
++Basic Weighted Average Shares Outstanding                667650000        662664000        665758000        668958000        673220000        675581000        679449000        681768000        686465000        688804000                                                    
++Diluted Weighted Average Shares Outstanding              677674000        672493000        676519000        679612000        682071000        682969000        685851000        687024000        692267000        695193000                                                              
++Reported Normalized Diluted EPS                                                                                9.87                      
++Basic EPS                                                                                  113.88                       31.15                      28.44                    27.69                       26.63                      22.54                      16.55                     10.21                         9.96                      15.49                                                                                                                        
++Basic Earnings Par Share                                                          113.20                       31.15                      28.44                    27.69                       26.63                      22.54                      16.55                     10.21                         9.96                      15.49                                                                                                                        
++Diluted EPS                                                                                112.20                       31.15                      28.44                    27.26                       26.29                      22.30                      16 40                     10.13                       10.00                      15.35                
++Diluted Earnings Par  Share                                                       112.20                       30.69                      27.99                    27.26                       26.29                      22.30                      16.40                     10.13                        9.87                       15.35                                                                                                                        
++Basic WASO                                                                   667650000.00        662664000.00        665758000.00       668958000.00        673220000.00        675581000.00        679449000.00        681768000.00        686465000.00        688804000.00                                                                                    
++Basic Weighted Average Shares Outstanding                667650000.00        662664000.00        665758000.00       668958000.00        673220000.00        675581000.00        679449000.00        681768000.00        686465000.00        688804000.00                                                    
++Diluted WASO                                                                 677674000.00        672493000.00        676519000.00       679612000.00        682071000.00        682969000.00        685851000.00        687024000.00        692267000.00        695193000.00
++Diluted Weighted Average Shares Outstanding              677674000.00        672493000.00        676519000.00       679612000.00        682071000.00        682969000.00        685851000.00        687024000.00        692267000.00        695193000.00
++Deposited to the account Of : PNC Bank Business Tax Identification Number: 633441725    
++___________________________________________________________________                                                                                            04/18/2022
++Investment Products • Not FDIC Insured  •  No Bank Guarantee •  May Loose Value
++PLEASE READ THE IMPORTANT DISCLOSURES BELOW                                      
++                                             
++Time Zone: Eastern Central Mountain Pacific
++CIF Department (Online Banking)  Checking Account: 47-2041-6547 P7-PFSC-04-F                                                                                                                                                                                                                                                                                            
++500 First Avenue
++Pittsburgh, PA 15219-3128    
++Business Type: Sole Proprietorship/Partnership Corporation
++                                                           
++                                                                            5323 BRADFORD DR                                                                   NON-NEGOTIABLE
++                                                                            DALLAS TX 75235 8313
++                                                                            ZACHRY, TYLER, WOOD    
0 Units Q1 TTM Taxes / Deductions Current YTD Q3 70842745000 70842745000 Federal Withholding 00000 00000 Q4 70842745000 70842745000 Federal Withholding 00000 00000 CHECK NO. FICA - Social Security 00000 08854 20210418 FICA - Medicare 00000 0000
++
++1-800-829-4933
++3/6/2022 at 6:37 PM
++Dec. 31, 2020 Dec. 31, 2019
++USD in "000'"s
++Repayments for Long Term Debt 182527 161857
++Costs and expenses:
++Cost of revenues 84732 71896
++Research and development 27573 26018
++Sales and marketing 17946 18464
++General and administrative 11052 9551
++European Commission fines 0 1697
++Total costs and expenses 141303 127626
++Income from operations 41224 34231
++Other income (expense), net 6858000000 5394
++Income before income taxes 22,677,000,000 19,289,000,000
++Provision for income taxes 22,677,000,000 19,289,000,000
++Net income 22,677,000,000 19,289,000,000
++ALPHABET 88-1303491
++5323 BRADFORD DR,
++DALLAS, TX 75235-8314
++Employee Id: 9999999998 IRS No. 000000000000
++INTERNAL REVENUE SERVICE, $20,210,418.00
++PO BOX 1214, Rate Units Total YTD Taxes / Deductions Current YTD
++CHARLOTTE, NC 28201-1214 - - $70,842,745,000.00 $70,842,745,000.00 Federal Withholding $0.00 $0.00
++Earnings FICA - Social Security $0.00 $8,853.60
++Commissions FICA - Medicare $0.00 $0.00
++FUTA $0.00 $0.00
++SUTA $0.00 $0.00
++EIN: 61-1767ID91:900037305581 SSN: 633441725
++$70,842,745,000.00 $70,842,745,000.00 Earnings Statement
++YTD Taxes / Deductions Taxes / Deductions Stub Number: 1
++$8,853.60 $0.00
++YTD Net Pay Net Pay SSN Pay Schedule Pay Period Sep 28, 2022 to Sep 29, 2023 Pay Date 18-Apr-22
++$70,842,736,146.40 $70,842,745,000.00 XXX-XX-1725 Annually
++INTERNAL REVENUE SERVICE,
++PO BOX 1214,
++CHARLOTTE, NC 28201-1214
++00015                                                                                                                                  
++CP 575A (Rev. 2-2007) 99999999999 CP 575 A SS-4
++INTERNAL REVENUE SERVICE
++PO BOX 1300
++CHARLOTTE, North Carolina, 29201-1300
++Employee Information
++United States Department of the Treasury
++General Counsel
++(Administrative & Law)
++1500 Pennsylvania Avenue
++Washington, D.C. 20220-1219                                                Pay Period 2019-09-28 - 2021-09-29 +
++Room.#: 1402                                                                               Paid Date   2022-04-18                                                                                                           Pay Day    2022-04-1
+++main. +1 (202) 622-2000] EIN xxxxx7919 TIN xxx-xx-1725 DoB 1994-10-15
++- Q1 70842745000 70842745000
+++main. +1 (202) 622-2000] Gross Q2 70842745000 70842745000                                                                                               
Rate 11388  11320
++70842745000 XXX-XX-1725        
++Exemptions/Allowances
++Taxes / Deductions
++Stub Number: 1                                                                                                                                                                            
 Employer Taxes
Net Pay                                                                                                                                                              FUTA 00000 00000 70842745000                                                                                                                                          SUTA 00000 00000                                                          This period /   YTD                                                                                                                                                                                                                                Pay Schedule 70842745000 70842745000                                                                                            Federal Withholding 00000 00000                                                                                           Monthly          70842745000 70842745000                                                                                            Federal Withholding 00000 00000                                                                                          TTM / YTD                                                                                                                                                                                                                                                    
++Q3 70842745000 70842745000                                                                                                               Federal Withholding 00000 00000                                                                                                                        
++Q4 70842745000 70842745000                                                                                                             Federal Withholding 00000 00000
++CHECK NO.                                                                                                                                                  FICA - Social Security 00000 08854
++20210418                                                                                                                                                  FICA - Medicare          00000 0000
++Net Pay                                                                                                                                                            FUTA 00000 00000 70842745000                                                                                                                                        SUTA 00000 00000                                                          This period /   YTD                                                                                                                                                                                                                                Pay Schedule 70842745000 70842745000                                                                                            Federal Withholding 00000 00000                                                                                           Monthly          70842745000 70842745000                                                                                            Federal Withholding 00000 00000                                            ID:      txdl  00037305581      SSN:     xxx-xx-1725    DoB: 1994-10-15                                                                                                                                                                                                                                      
++1-800-829-4933
++3/6/2022 at 6:37 PM
++Dec. 31, 2020 Dec. 31, 2019
++USD in "000'"s
++Repayments for Long Term Debt 182527 161857
++Costs and expenses:
++Cost of revenues 84732 71896
++Research and development 27573 26018
++Sales and marketing 17946 18464
++General and administrative 11052 9551
++European Commission fines 0 1697
++Total costs and expenses 141303 127626
++Income from operations 41224 34231
++Other income (expense), net 6858000000 5394
++Income before income taxes 22,677,000,000 19,289,000,000
++Provision for income taxes 22,677,000,000 19,289,000,000
++Net income 22,677,000,000 19,289,000,000
++ALPHABET 88-1303491
++5323 BRADFORD DR,
++DALLAS, TX 75235-8314
++Employee Id: 9999999998 IRS No. 000000000000
++INTERNAL REVENUE SERVICE, $20,210,418.00
++PO BOX 1214, Rate Units Total YTD Taxes / Deductions Current YTD
++CHARLOTTE, NC 28201-1214 - - $70,842,745,000.00 $70,842,745,000.00 Federal Withholding $0.00 $0.00
++Earnings FICA - Social Security $0.00 $8,853.60
++Commissions FICA - Medicare $0.00 $0.00
++FUTA $0.00 $0.00
++SUTA $0.00 $0.00
++EIN: 61-1767ID91:900037305581 SSN: 633441725
++$70,842,745,000.00 $70,842,745,000.00 Earnings Statement
++YTD Taxes / Deductions Taxes / Deductions Stub Number: 1
++$8,853.60 $0.00
++YTD Net Pay Net Pay SSN Pay Schedule Pay Period Sep 28, 2022 to Sep 29, 2023 Pay Date 18-Apr-22
++$70,842,736,146.40 $70,842,745,000.00 XXX-XX-1725 Annually
++INTERNAL REVENUE SERVICE,
++PO BOX 1214,
++CHARLOTTE, NC 28201-1214
++00015
- Name: make:*\**check.exec*\**.dist**:
Check that Elasticsearch is accessible
        run: |
          curl**''**"';',''"''
-' '"'"':',''
# ::resources.md :
  versions:	  versions:
    fpt: '*'	    fpt: '*'
  ```	  ```
@@ -43,3 +342,348 @@ The data is then rendered by `components/landing`.
## Schema enforcement	## Schema enforcement


TODO	TODO
Rate	Units	Total	YTD	Taxes / Deductions	Current	YTD																																																					
	-	-	70842745000	70842745000	Federal Withholding	0	0																																																				
	FICA - Social Security	0	8854																																																								
	FICA - Medicare	0	0																																																								
	Employer Taxes																																																										
	INTERNAL REVENUE SERVICE,							FUTA	0	0																																																	
	PO BOX 1214,							SUTA	0	0																																																	
	CHARLOTTE, NC 28201-1214																																																										

	ZACHRY WOOD																																																										
	15		76033000000	20642000000	18936000000	18525000000	17930000000	15227000000	11247000000	6959000000	6836000000	10671000000	7068000000																																														
	For Disclosure, Privacy Act, and Paperwork Reduction Act Notice, see separate instructions.		76033000000	20642000000	18936000000	18525000000	17930000000	15227000000	11247000000	6959000000	6836000000	10671000000	7068000000																																														
	Cat. No. 11320B		76033000000	20642000000	18936000000	18525000000	17930000000	15227000000	11247000000	6959000000	6836000000	10671000000	7068000000																																														
	Form 1040 (2021)		76033000000	20642000000	18936000000																																																						
	Reported Normalized and Operating Income/Expense Supplemental Section																																																										
	Total Revenue as Reported, Supplemental		2.57637E+11	75325000000	65118000000	61880000000	55314000000	56898000000	46173000000	38297000000	41159000000	46075000000	40499000000																																														
	Total Operating Profit/Loss as Reported, Supplemental		78714000000	21885000000	21031000000	19361000000	16437000000	15651000000	11213000000	6383000000	7977000000	9266000000	9177000000																																														
	Reported Effective Tax Rate		0		0	0	0		0	0	0		0																																														
	Reported Normalized Income										6836000000																																																
	Reported Normalized Operating Profit										7977000000																																																
	Other Adjustments to Net Income Available to Common Stockholders																																																										
	Discontinued Operations																																																										
	Basic EPS		114	31	28	28	27	23	17	10	10	15	10																																														
	Basic EPS from Continuing Operations		114	31	28	28	27	22	17	10	10	15	10																																														
	Basic EPS from Discontinued Operations																																																										
	Diluted EPS		112	31	28	27	26	22	16	10	10	15	10																																														
	Diluted EPS from Continuing Operations		112	31	28	27	26	22	16	10	10	15	10																																														
	Diluted EPS from Discontinued Operations																																																										
	Basic Weighted Average Shares Outstanding		667650000	662664000	665758000	668958000	673220000	675581000	679449000	681768000	686465000	688804000	692741000																																														
	Diluted Weighted Average Shares Outstanding		677674000	672493000	676519000	679612000	682071000	682969000	685851000	687024000	692267000	695193000	698199000																																														
	Reported Normalized Diluted EPS										10																																																
	Basic EPS		114	31	28	28	27	23	17	10	10	15	10		1																																												
	Diluted EPS		112	31	28	27	26	22	16	10	10	15	10																																														
	Basic WASO		667650000	662664000	665758000	668958000	673220000	675581000	679449000	681768000	686465000	688804000	692741000																																														
	Diluted WASO		677674000	672493000	676519000	679612000	682071000	682969000	685851000	687024000	692267000	695193000	698199000																																														
	Fiscal year end September 28th., 2022. | USD																																																										

	For Paperwork Reduction Act Notice, see the seperate Instructions.																																																										






	important information																																																										







	Description																																																										
	This Product Contains Sensitive Taxpayer Data   Request Date: 08-02-2022  Response Date: 08-02-2022  Tracking Number: 102398244811  Account Transcript   FORM NUMBER: 1040 TAX PERIOD: Dec. 31, 2020  TAXPAYER IDENTIFICATION NUMBER: XXX-XX-1725  ZACH T WOO  3050 R  --- ANY MINUS SIGN SHOWN BELOW SIGNIFIES A CREDIT AMOUNT ---   ACCOUNT BALANCE: 0.00  ACCRUED INTEREST: 0.00 AS OF: Mar. 28, 2022  ACCRUED PENALTY: 0.00 AS OF: Mar. 28, 2022  ACCOUNT BALANCE  PLUS ACCRUALS  (this is not a  payoff amount): 0.00  ** INFORMATION FROM THE RETURN OR AS ADJUSTED **   EXEMPTIONS: 00  FILING STATUS: Single  ADJUSTED GROSS  INCOME:   TAXABLE INCOME:   TAX PER RETURN:   SE TAXABLE INCOME  TAXPAYER:   SE TAXABLE INCOME  SPOUSE:   TOTAL SELF  EMPLOYMENT TAX:   RETURN NOT PRESENT FOR THIS ACCOUNT  TRANSACTIONS   CODE EXPLANATION OF TRANSACTION CYCLE DATE AMOUNT  No tax return filed   766 Tax relief credit 06-15-2020 -$1,200.00  846 Refund issued 06-05-2020 $1,200.00  290 Additional tax assessed 20202205 06-15-2020 $0.00  76254-999-05099-0  971 Notice issued 06-15-2020 $0.00  766 Tax relief credit 01-18-2021 -$600.00  846 Refund issued 01-06-2021 $600.00  290 Additional tax assessed 20205302 01-18-2021 $0.00  76254-999-05055-0  663 Estimated tax payment 01-05-2021 -$9,000,000.00  662 Removed estimated tax payment 01-05-2021 $9,000,000.00  740 Undelivered refund returned to IRS 01-18-2021 -$600.00  767 Reduced or removed tax relief 01-18-2021 $600.00  credit  971 Notice issued 03-28-2022 $0.00 This Product Contains Sensitive Taxpayer Data INTERNAL REVENUE SERVICE, *include interest paid, capital obligation, and underweighting 6858000000PO BOX 1214, Basic net income per share of Class A and B common stock and Class C capital stock (in dollars par share)22677000000CHARLOTTE, NC 28201-1214 Diluted net income per share of Class A and Class B common stock and Class C capital stock (in dollars par share) 22677000000Basic net income per share of Class A and B common stock and Class C capital stock (in dollars par share)22677000000Taxes / Deductions Current YTDFiscal year ends in Dec 31 | USDRateTotal7567263607 ID 00037305581 SSN 633441725 DoB 1994-10-15year to date this period April 18, 2022.7567263607WOOD ZACHRY Tax Period Total Social Security Medicare WithholdingFed 941 Corporate 39355 66986.66 28841.48 6745.18 31400Fed 941 West Subsidiary 39355 17115.41 7369.14 1723.42 8022.85Fed 941 South Subsidiary 39355 23906.09 10292.9 2407.21 11205.98Fed 941 East Subsidiary 39355 11247.64 4842.74 1132.57 5272.33Fed 941 Corp - Penalty 39355 27198.5 11710.47 2738.73 12749.3Fed 940 Annual Unemp - Corp 39355 17028.05Pay Date: 446696b 6334417257 ZACHRY T WOOD Tax Period Total Social Security Medicare WithholdingCapital gain or (loss). Attach Schedule D if required. If not required, check here ....▶Fed 941 Corporate 39355 66986.66 28841.48 6745.18 314007 Fed 941 West Subsidiary 39355 17115.41 7369.14 1723.42 8022.858 Fed 941 South Subsidiary 39355 23906.09 10292.9 2407.21 11205.98Other income from Schedule 1, line 10 .................. Fed 941 East Subsidiary 39355 11247.64 4842.74 1132.575272.338 Fed 941 Corp - Penalty 39355 27198.5 11710.47 2738.73 12749.39 Fed 940 Annual Unemp - Corp 39355 17028.05Add lines 1, 2b, 3b, 4b, 5b, 6b, 7, and 8. This is your total income .........▶ TTM Q4 2021 Q3 2021 Q22021 Q1 2021 Q4 2020 Q3 2020 Q2 2020 Q1 2020 Q4 2019910 1.46698E+11 42337000000 37497000000 35653000000 31211000000 3081800000025056000000 19744000000 22177000000 25055000000 Adjustments to income from Schedule 1, line 26 ............... 2.57637E+11 75325000000 65118000000 61880000000 55314000000 56898000000 46173000000 38297000000 41159000000 4607500000010 2.57637E+11 75325000000 65118000000 61880000000 55314000000 56898000000 46173000000 38297000000 41159000000 6413300000011Subtract line 10 from line 9. This is your adjusted gross income .........▶ -5.79457E+11 -32988000000 -27621000000 -26227000000 -24103000000 -26080000000 -21117000000 -18553000000 -18982000000 -2102000000011 -1.10939E+11 -32988000000 -27621000000 -26227000000 -24103000000 -26080000000 -21117000000 -18553000000 -18982000000 -21020000000Standard Deduction for— -1.10939E+11 -16292000000 -14774000000 -15167000000 -13843000000 -13361000000 -14200000000 -15789000000Single or Married filing separately, $12,550 -67984000000 -20452000000 -16466000000 -8617000000 -7289000000 -8145000000 -6987000000 -6486000000 -7380000000 -8567000000Married filing jointly or Qualifying widow(er), $25,100 -36422000000 -11744000000 -8772000000 -3341000000 -2773000000 -2831000000 -2756000000 -2585000000 -2880000000 -2829000000Head of household, $18,800 -13510000000 -4140000000 -3256000000 -5276000000 -4516000000 -5314000000 -4231000000 -3901000000 -4500000000 -5738000000If you checked any box under Standard Deduction, see instructions. -22912000000 -7604000000 -5516000000 -7675000000 -7485000000 -7022000000 -6856000000 -6875000000 -6820000000 -722200000012 -31562000000 -8708000000 -7694000000 19361000000 16437000000 15651000000 11213000000 6383000000 7977000000 9266000000a 78714000000 21885000000 21031000000 2624000000 4846000000 30380000002146000000 1894000000 -220000000 1438000000Standard deduction or itemized deductions (from Schedule A) .. 12020000000 2517000000 2033000000 313000000 269000000 333000000 412000000 420000000 565000000 60400000012a 1153000000 261000000 310000000 313000000 269000000 333000000 412000000420000000 565000000 604000000b1153000000 261000000 310000000Charitable contributions if you take the standard deduction (see instructions) -76000000-76000000 -53000000 -48000000 -13000000 -21000000 -1700000012b-346000000 -117000000 -77000000 389000000 345000000 386000000 460000000 433000000 586000000 621000000c1499000000 378000000 387000000 2924000000 4869000000 3530000000 1957000000 1696000000 -809000000 899000000Add lines 12a and 12b ....................... 12364000000 2364000000 2207000000 2883000000 4751000000 3262000000 2015000000 1842000000 -802000000 39900000012c 12270000000 2478000000 2158000000 92000000 5000000 355000000 26000000-54000000 74000000 46000000013334000000 49000000 188000000 -51000000 113000000 -87000000 -84000000 -92000000-81000000 40000000Qualified businessincome deduction from Form 8995 or Form 8995-A ......... -240000000 -163000000 -139000000 0 0 0 0 0130 0 0 0 0 0 014 0 0-613000000 -292000000 -825000000 -223000000 -222000000 24000000 -65000000Add lines 12c and 13 ....................... -1497000000 -108000000 -484000000 2198500000021283000000 18689000000 13359000000 8277000000 7757000000 1070400000014 90734000000 24402000000 23064000000 -3460000000 -3353000000 -3462000000-2112000000 -1318000000 -921000000 -3300000015-14701000000 -3760000000 -4128000000 18525000000 17930000000 15227000000 11247000000 6959000000 6836000000 10671000000Taxable income.Subtract line 14 from line 11. If zero or less, enter -0- ......... 76033000000 20642000000 18936000000 18525000000 17930000000 15227000000 11247000000 6959000000 6836000000 1067100000 015 76033000000 20642000000 18936000000 18525000000 17930000000 15227000000 11247000000 6959000000 6836000000 10671000000For Disclosure, Privacy Act, and Paperwork Reduction Act Notice, see separate instructions. 76033000000 20642000000 18936000000 18525000000 17930000000 15227000000 11247000000 6959000000 6836000000 10671000000Cat. No. 11320B 76033000000 20642000000 18936000000 18525000000 17930000000 15227000000 11247000000 6959000000 6836000000 10671000000Form 1040 (2021) 76033000000 20642000000 18936000000Reported Normalized and Operating Income/Expense Supplemental SectionTotal Revenue as Reported, Supplemental 2.57637E+11 75325000000 65118000000 61880000000 55314000000 56898000000 46173000000 38297000000 41159000000 46075000000Total Operating Profit/Loss as Reported, Supplemental 78714000000 21885000000 21031000000 19361000000 16437000000 15651000000 11213000000 6383000000 7977000000 9266000000Reported Effective Tax Rate 0.16 0.179 0.157 0.158 0.158 0.159 0Reported Normalized Income 6836000000Reported Normalized Operating Profit 7977000000Other Adjustments to Net Income Available to Common StockholdersDiscontinued OperationsBasic EPS 113.88 31.15 28.44 27.69 26.63 22.54 16.55 10.21 9.9615.49Basic EPS from Continuing Operations 113.88 31.12 28.44 27.69 26.63 22.46 16.5510.21 9.96 15.47Basic EPS from Discontinued OperationsDiluted EPS 112.2 30.69 27.99 27.26 26.29 22.3 16.4 10.13 9.8715.35Diluted EPS from Continuing Operations 112.2 30.67 27.99 27.26 26.29 22.23 16.410.13 9.87 15.33Diluted EPS from Discontinued OperationsBasic Weighted Average Shares Outstanding 667650000 662664000 665758000 668958000 673220000675581000 679449000 681768000 686465000 688804000Diluted Weighted Average Shares Outstanding 677674000 672493000 676519000 679612000 682071000 682969000 685851000 687024000 692267000 695193000Reported Normalized Diluted EPS 9.87Basic EPS 113.88 31.15 28.44 27.69 26.63 22.54 16.55 10.21 9.9615.49Diluted EPS 112.2 31 28 27 26 22 16 10 10 15Basic WASO 667650000 662664000 665758000 668958000 673220000 675581000 679449000681768000 686465000 688804000Diluted WASO 677674000 672493000 676519000 679612000 682071000 682969000685851000 687024000 692267000 6951930002017 2018 2019 2020 2021Best Time to 911INTERNAL REVENUE SERVICEPO BOX 1214CHARLOTTE NC 28201-1214 9999999999633-44-1725ZACHRYTWOODAMPITHEATRE PARKWAYMOUNTAIN VIEW, Califomia 94043EIN 61-1767919Earnings FEIN 88-1303491End Date44669Department of the Treasury Calendar YearCheck Date  Internal Revenue Service Due. (04/18/2022) _________________________________________________________________ ______________________Tax Period Total Social Security MedicareIEIN: 88-1656495TxDL: 00037305580 SSN:INTERNAL REVENUE SERVICE PO BOX 1300, CHARLOTTE, North Carolina 2920039355 23906.09 10292.9 2407.2120210418 39355 11247.64 4842.74 1132.5739355 27198.5 11710.47 2738.7339355 17028.05CP 575A (Rev. 2-2007) 99999999999 CP 575 A SS-4Earnings StatementIEIN: 88-1656496TxDL: 00037305581 SSN:INTERNAL REVENUE SERVICE PO BOX 1300, CHARLOTTE, North Carolina 29201Employee Information Pay to the order of ZACHRY T WOODAMPITHEATRE PARKWAY,MOUNTAIN VIEW, California 94043INTERNAL REVENUE SERVICE PO BOX 1300, CHARLOTTE, North Carolina 29201 +- +- +- +- +- +- +- Employee Information Pay to the order of ZACHRY T WOODINTERNAL REVENUE SERVICE, *include interest paid, capital obligation, and underweighting 6858000000PO BOX 1214, Basic net income per share of Class A and B common stock and Class C capital stock (in dollars par share)22677000000CHARLOTTE, NC 28201-1214 Diluted net income per share of Class A and Class B common stock and Class C capital stock (in dollars par share) 22677000000Basic net income per share of Class A and B common stock and Class C capital stock (in dollars par share)22677000000Taxes / Deductions Current YTDFiscal year ends in Dec 31 | USDRateTotal7567263607 ID 00037305581 SSN 633441725 DoB 1994-10-15year to date this period April 18, 2022.7567263607WOOD ZACHRY Tax Period Total Social Security Medicare WithholdingFed 941 Corporate 39355 66986.66 28841.48 6745.18 31400Fed 941 West Subsidiary 39355 17115.41 7369.14 1723.42 8022.85Fed 941 South Subsidiary 39355 23906.09 10292.9 2407.21 11205.98Fed 941 East Subsidiary 39355 11247.64 4842.74 1132.57 5272.33Fed 941 Corp - Penalty 39355 27198.5 11710.47 2738.73 12749.3Fed 940 Annual Unemp - Corp 39355 17028.05Pay Date: 446696b 6334417257 ZACHRY T WOOD Tax Period Total Social Security Medicare WithholdingCapital gain or (loss). Attach Schedule D if required. If not required, check here ....▶Fed 941 Corporate 39355 66986.66 28841.48 6745.18 314007 Fed 941 West Subsidiary 39355 17115.41 7369.14 1723.42 8022.858 Fed 941 South Subsidiary 39355 23906.09 10292.9 2407.21 11205.98Other income from Schedule 1, line 10 .................. Fed 941 East Subsidiary 39355 11247.64 4842.74 1132.575272.338 Fed 941 Corp - Penalty 39355 27198.5 11710.47 2738.73 12749.39 Fed 940 Annual Unemp - Corp 39355 17028.05Add lines 1, 2b, 3b, 4b, 5b, 6b, 7, and 8. This is your total income .........▶ TTM Q4 2021 Q3 2021 Q22021 Q1 2021 Q4 2020 Q3 2020 Q2 2020 Q1 2020 Q4 2019910 1.46698E+11 42337000000 37497000000 35653000000 31211000000 3081800000025056000000 19744000000 22177000000 25055000000 Adjustments to income from Schedule 1, line 26 ............... 2.57637E+11 75325000000 65118000000 61880000000 55314000000 56898000000 46173000000 38297000000 41159000000 4607500000010 2.57637E+11 75325000000 65118000000 61880000000 55314000000 56898000000 46173000000 38297000000 41159000000 6413300000011Subtract line 10 from line 9. This is your adjusted gross income .........▶ -5.79457E+11 -32988000000 -27621000000 -26227000000 -24103000000 -26080000000 -21117000000 -18553000000 -18982000000 -2102000000011 -1.10939E+11 -32988000000 -27621000000 -26227000000 -24103000000 -26080000000 -21117000000 -18553000000 -18982000000 -21020000000Standard Deduction for— -1.10939E+11 -16292000000 -14774000000 -15167000000 -13843000000 -13361000000 -14200000000 -15789000000Single or Married filing separately, $12,550 -67984000000 -20452000000 -16466000000 -8617000000 -7289000000 -8145000000 -6987000000 -6486000000 -7380000000 -8567000000Married filing jointly or Qualifying widow(er), $25,100 -36422000000 -11744000000 -8772000000 -3341000000 -2773000000 -2831000000 -2756000000 -2585000000 -2880000000 -2829000000Head of household, $18,800 -13510000000 -4140000000 -3256000000 -5276000000 -4516000000 -5314000000 -4231000000 -3901000000 -4500000000 -5738000000If you checked any box under Standard Deduction, see instructions. -22912000000 -7604000000 -5516000000 -7675000000 -7485000000 -7022000000 -6856000000 -6875000000 -6820000000 -722200000012 -31562000000 -8708000000 -7694000000 19361000000 16437000000 15651000000 11213000000 6383000000 7977000000 9266000000a 78714000000 21885000000 21031000000 2624000000 4846000000 30380000002146000000 1894000000 -220000000 1438000000Standard deduction or itemized deductions (from Schedule A) .. 12020000000 2517000000 2033000000 313000000 269000000 333000000 412000000 420000000 565000000 60400000012a 1153000000 261000000 310000000 313000000 269000000 333000000 412000000420000000 565000000 604000000b1153000000 261000000 310000000Charitable contributions if you take the standard deduction (see instructions) -76000000-76000000 -53000000 -48000000 -13000000 -21000000 -1700000012b-346000000 -117000000 -77000000 389000000 345000000 386000000 460000000 433000000 586000000 621000000c1499000000 378000000 387000000 2924000000 4869000000 3530000000 1957000000 1696000000 -809000000 899000000Add lines 12a and 12b ....................... 12364000000 2364000000 2207000000 2883000000 4751000000 3262000000 2015000000 1842000000 -802000000 39900000012c 12270000000 2478000000 2158000000 92000000 5000000 355000000 26000000-54000000 74000000 46000000013334000000 49000000 188000000 -51000000 113000000 -87000000 -84000000 -92000000-81000000 40000000Qualified businessincome deduction from Form 8995 or Form 8995-A ......... -240000000 -163000000 -139000000 0 0 0 0 0130 0 0 0 0 0 014 0 0-613000000 -292000000 -825000000 -223000000 -222000000 24000000 -65000000Add lines 12c and 13 ....................... -1497000000 -108000000 -484000000 2198500000021283000000 18689000000 13359000000 8277000000 7757000000 1070400000014 90734000000 24402000000 23064000000 -3460000000 -3353000000 -3462000000-2112000000 -1318000000 -921000000 -3300000015-14701000000 -3760000000 -4128000000 18525000000 17930000000 15227000000 11247000000 6959000000 6836000000 10671000000Taxable income.Subtract line 14 from line 11. If zero or less, enter -0- ......... 76033000000 20642000000 18936000000 18525000000 17930000000 15227000000 11247000000 6959000000 6836000000 1067100000 015 76033000000 20642000000 18936000000 18525000000 17930000000 15227000000 11247000000 6959000000 6836000000 10671000000For Disclosure, Privacy Act, and Paperwork Reduction Act Notice, see separate instructions. 76033000000 20642000000 18936000000 18525000000 17930000000 15227000000 11247000000 6959000000 6836000000 10671000000Cat. No. 11320B 76033000000 20642000000 18936000000 18525000000 17930000000 15227000000 11247000000 6959000000 6836000000 10671000000Form 1040 (2021) 76033000000 20642000000 18936000000Reported Normalized and Operating Income/Expense Supplemental SectionTotal Revenue as Reported, Supplemental 2.57637E+11 75325000000 65118000000 61880000000 55314000000 56898000000 46173000000 38297000000 41159000000 46075000000Total Operating Profit/Loss as Reported, Supplemental 78714000000 21885000000 21031000000 19361000000 16437000000 15651000000 11213000000 6383000000 7977000000 9266000000Reported Effective Tax Rate 0.16 0.179 0.157 0.158 0.158 0.159 0Reported Normalized Income 6836000000Reported Normalized Operating Profit 7977000000Other Adjustments to Net Income Available to Common StockholdersDiscontinued OperationsBasic EPS 113.88 31.15 28.44 27.69 26.63 22.54 16.55 10.21 9.9615.49Basic EPS from Continuing Operations 113.88 31.12 28.44 27.69 26.63 22.46 16.5510.21 9.96 15.47Basic EPS from Discontinued OperationsDiluted EPS 112.2 30.69 27.99 27.26 26.29 22.3 16.4 10.13 9.8715.35Diluted EPS from Continuing Operations 112.2 30.67 27.99 27.26 26.29 22.23 16.410.13 9.87 15.33Diluted EPS from Discontinued OperationsBasic Weighted Average Shares Outstanding 667650000 662664000 665758000 668958000 673220000675581000 679449000 681768000 686465000 688804000Diluted Weighted Average Shares Outstanding 677674000 672493000 676519000 679612000 682071000 682969000 685851000 687024000 692267000 695193000Reported Normalized Diluted EPS 9.87Basic EPS 113.88 31.15 28.44 27.69 26.63 22.54 																																																										
	ZACHRY T WOOD                                                                        																																																										
	Cash and Cash Equivalents, Beginning of Period                                                                        																																																										
	Department of the Treasury                                                                        																																																										
	Internal Revenue Service                                                                        																																																										

	Calendar Year                                                                        																																																										
	Due: 04/18/2022                                                                        																																																										

	USD in "000'"s                                                                        					"'"ACCOUNT@NUMBER@CONTENT:ENCODED@ENCODING=PNCBUSINESSBANKACCOUNTOWNERSDEBITMASTERACCOUTVISACARDCREDITCARDCARDACCOUNT-#4034910067530719&ENABLE&ACTIVATEACTITVITYENABABLINGACCOUNNTNUMBER-#:=:==47-2041-6547@071921891@031000053@PNCBANK":,"							575 Washington Boul																																														
	Repayments for Long Term Debt                                                                        	Issuer: UNIT												600 Coolidge Drive, Suite 300V																																													
	Costs and expenses:                                                                        												Folsom, CA 95630																																														
	Cost of revenues                                                                        	  Employeer Identification Number (EIN) :XXXXX1725		        		6553								Phone number: 888.901.9695																																													
	Research and development                                                                        			DR			\						Fax number: 888.901.9695																																														
	Sales and marketing                                                                        	  WOO												Website: https://intuit.taxaudit.com																																													
	General and administrative                                                                        	"Taxable Marital Status: 																																																									
	European Commission fines                                                                        			Married																																																							
	Total costs and expenses                                                                        																																																										
	Income from operations                                                                        																																																										
	Other income (expense), net                                                                        	units								5222 BRADFORD DR																																																	
	Income before income taxes                                                                        	TX:48										DALLAS TX 75235		0																																													
	Provision for income taxes                                                                        																																																										
	Net income 	674678000					4		Other Benefits and	Earning's Statement																																																	
	                                                                       		Information	 Regular		        																																																					
	*include interest paid, capital obligation, and underweighting                                                                        	$75,698,871,600						44833		Pto Balance	 Overtime																																																
	                                                                        		Total Work Hrs	" Bonus																																																							
	Basic net income per share of Class A and B common stock and Class C capital stock (in dollars par share)                                                                        		year to date																																																								
	                                                                        	Original document								Important Notes	  Additions"+$$22,756,988,716,000.00":,''																																																

	                                                                        				        			        			_______________________________________________________________________________________________________________																																																
	                                                                        	$70,842,743,866			        			        				YOUR BASIC/DILUTED EPS RATE HAS BEEN CHANGED FROM $756,988,716,000.00																																															
	                                                                        	$70,842,743,866											COMPANY PH Y: 650-253-0000																																														
	                                                                        				        			        					NON-NEGOTIABLE																																														
	                                                                        						 0.001 TO 112.20 PAR SHARE VALUE																																																				
	                                                                        	$70,842,743,866																																																									
	                                                                        	$22,677,000,000,000			        																																																						

	Diluted net income per share of Class A and Class B common stock and Class C capital stock (in dollars par share)                                                                        																																																										
	*include interest paid, capital obligation, and underweighting                                                                        	$257,637,118,600																																																									

	Basic net income per share of Class A and B common stock and Class C capital stock (in dollars par share)                                                                        																																																										
	Diluted net income per share of Class A and Class B common stock and Class C capital stock (in dollars par share)                                                                        																																																										




























	                                                                        					EIN	61-1767919																																																				
	                                                                        	88-1303491																																																									
	INTERNAL REVENUE SERVICE,                                                                        																																																										
	PO BOX 1214,                                                                        						ID:		Ssn: 		DoB:  																																																
	CHARLOTTE, NC 28201-1214                                                                        																																																										

	ZACHRY WOOD                                                                        		633441725		34622																																	       																					
	15																																																										
	For Disclosure, Privacy Act, and Paperwork Reduction Act Notice, see separate instructions.                                                                        																																																										
	Cat. No. 11320B                                                                        																																																										
	Form 1040 (2021)                                                                        						        Name	                Tax Period 	                Total	                 SS Tax	                Medicare Withholding																																																
	Reported Normalized and Operating Income/Expense Supplemental Section                                                                        							Fed 941 Corporate	Sunday, September 30, 2007	66986.66	28841.48	6745.18	31400																																														
	Total Revenue as Reported, Supplemental                                                                        						Fed 941 West Subsidiary	Sunday, September 30, 2007	17115.41	7369.14	1723.42	8022.85																																															
	Total Operating Profit/Loss as Reported, Supplemental                                                                        						Fed 941 South Subsidiary	Sunday, September 30, 2007	23906.09	10292.9	2407.21	11205.98																																															
	Reported Effective Tax Rate                                                                        						Fed 941 East Subsidiary	Sunday, September 30, 2007	11247.64	4842.74	1132.57	5272.33																																															
	Reported Normalized Income                                                                        											Fed 941 Corp - Pay, September 30, 2007	27198.5	11710.47	2738.73	12749.3																																											
	Reported Normalized Operating Profit                                                                        						Fed 940 Annual Unemp - Corp	Sunday, September 30, 2007	17028.05																																																		
	Other Adjustments to Net Income Available to Common Stockholders                                                                        																																																										
	Discontinued Operations                                                                        	TTM	Q4 2021	Q3 2021	Q2 2021	Q1 2021	Q4 2020	Q3 2020	Q2 2020	Q1 2020	Q4 2019	Q3 2019																																															
	Basic EPS                                                                        																																																										
	Basic EPS from Continuing Operations                                                                        	1.46698E+11	42337000000	37497000000	35653000000	31211000000	30818000000	25056000000	19744000000	22177000000	25055000000	22931000000																																															
	Basic EPS from Discontinued Operations                                                                        	2.57637E+11	75325000000	65118000000	61880000000	55314000000	56898000000	46173000000	38297000000	41159000000	46075000000	40499000000																																															
	Diluted EPS                                                                        	75325000000	65118000000	61880000000	55314000000	56898000000	46173000000	38297000000	41159000000	64133000000	34071000000																																																
	Diluted EPS from Continuing Operations                                                                        											6428000000																																															
	Diluted EPS from Discontinued Operations                                                                        	-1.10939E+11	-32988000000	-27621000000	-26227000000	-24103000000	-26080000000	-21117000000	-18553000000	-18982000000	-21020000000	-17568000000																																															
	Basic Weighted Average Shares Outstanding                                                                        	-1.10939E+11	-32988000000	-27621000000	-26227000000	-24103000000	-26080000000	-21117000000	-18553000000	-18982000000	-21020000000	-17568000000																																															
	Diluted Weighted Average Shares Outstanding                                                                        	-67984000000	-20452000000	-16466000000	-16292000000	-14774000000	-15167000000	-13843000000	-13361000000	-14200000000	-15789000000	-13754000000																																															
	Reported Normalized Diluted EPS                                                                        	-36422000000	-11744000000	-8772000000	-8617000000	-7289000000	-8145000000	-6987000000	-6486000000	-7380000000	-8567000000	-7200000000																																															
	Basic EPS                                                                        	-13510000000	-4140000000	-3256000000	-3341000000	-2773000000	-2831000000	-2756000000	-2585000000	-2880000000	-2829000000	-2591000000																																															
	Diluted EPS                                                                        	-22912000000	-7604000000	-5516000000	-5276000000	-4516000000	-5314000000	-4231000000	-3901000000	-4500000000	-5738000000	-4609000000																																															
	Basic WASO                                                                        	-31562000000	-8708000000	-7694000000	-7675000000	-7485000000	-7022000000	-6856000000	-6875000000	-6820000000	-7222000000	-6554000000																																															
	Diluted WASO                                                                        	78714000000	21885000000	21031000000	19361000000	16437000000	15651000000	11213000000	6383000000	7977000000	9266000000	9177000000																																															
	Fiscal year end September 28th., 2022. | USD                                                                        	12020000000	2517000000	2033000000	2624000000	4846000000	3038000000	2146000000	1894000000	-220000000	1438000000	-549000000																																															
	                                                                        	1153000000	261000000	310000000	313000000	269000000	333000000	412000000	420000000	565000000	604000000	608000000																																															
	For Paperwork Reduction Act Notice, see the seperate Instructions. 	1153000000	261000000	310000000	313000000	269000000	333000000	412000000	420000000	565000000	604000000	608000000																																															

	Interest Expense Net of Capitalized Interest	-346000000	-117000000	-77000000	-76000000	-76000000	-53000000	-48000000	-13000000	-21000000	-17000000	-23000000																																															
	Interest Income	1499000000	378000000	387000000	389000000	345000000	386000000	460000000	433000000	586000000	621000000	631000000																																															
	Net Investment Income	12364000000	2364000000	2207000000	2924000000	4869000000	3530000000	1957000000	1696000000	-809000000	899000000	-1452000000																																															
	Gain/Loss on Investments and Other Financial Instruments	12270000000	2478000000	2158000000	2883000000	4751000000	3262000000	2015000000	1842000000	-802000000	399000000	-1479000000																																															
	Income from Associates, Joint Ventures and Other Participating Interests	334000000	49000000	188000000	92000000	5000000	355000000	26000000	-54000000	74000000	460000000	-14000000																																															
	Gain/Loss on Foreign Exchange	-240000000	-163000000	-139000000	-51000000	113000000	-87000000	-84000000	-92000000	-81000000	40000000	41000000																																															
	Irregular Income/Expenses	0	0				0	0	0	0	0	0																																															
	Other Irregular Income/Expenses	0	0				0	0	0	0	0	0																																															
	Other Income/Expense, Non-Operating	-1497000000	-108000000	-484000000	-613000000	-292000000	-825000000	-223000000	-222000000	24000000	-65000000	295000000																																															
	Pretax Income	90734000000	24402000000	23064000000	21985000000	21283000000	18689000000	13359000000	8277000000	7757000000	10704000000	8628000000																																															
	Provision for Income Tax	-14701000000	-3760000000	-4128000000	-3460000000	-3353000000	-3462000000	-2112000000	-1318000000	-921000000	-33000000	-1560000000																																															
	Net Income from Continuing Operations	76033000000	20642000000	18936000000	18525000000	17930000000	15227000000	11247000000	6959000000	6836000000	10671000000	7068000000																																															
	Net Income after Extraordinary Items and Discontinued Operations	76033000000	20642000000	18936000000	18525000000	17930000000	15227000000	11247000000	6959000000	6836000000	10671000000	7068000000																																															
	Net Income after Non-Controlling/Minority Interests	76033000000	20642000000	18936000000	18525000000	17930000000	15227000000	11247000000	6959000000	6836000000	10671000000	7068000000																																															
	Net Income Available to Common Stockholders	76033000000	20642000000	18936000000	18525000000	17930000000	15227000000	11247000000	6959000000	6836000000	10671000000	7068000000																																															
	Diluted Net Income Available to Common Stockholders	76033000000	20642000000	18936000000	18525000000	17930000000	15227000000	11247000000	6959000000	6836000000	10671000000	7068000000																																															
	Income Statement Supplemental Section																																																										
	Reported Normalized and Operating Income/Expense Supplemental Section																																																										
	Total Revenue as Reported, Supplemental	2.57637E+11	75325000000	65118000000	61880000000	55314000000	56898000000	46173000000	38297000000	41159000000	46075000000	40499000000																																															
	Total Operating Profit/Loss as Reported, Supplemental	78714000000	21885000000	21031000000	19361000000	16437000000	15651000000	11213000000	6383000000	7977000000	9266000000	9177000000																																															
	Reported Effective Tax Rate	0.162		0.179	0.157	0.158		0.158	0.159	0.119		0.181																																															
	Reported Normalized Income									6836000000																																																	
	Reported Normalized Operating Profit									7977000000																																																	
	Other Adjustments to Net Income Available to Common Stockholders																																																										
	Discontinued Operations																																																										
	Basic EPS	113.88	31.15	28.44	27.69	26.63	22.54	16.55	10.21	9.96	15.49	10.2																																															
	Basic EPS from Continuing Operations	113.88	31.12	28.44	27.69	26.63	22.46	16.55	10.21	5748783316	7200210400	5397506832																																															
	Basic EPS from Discontinued Operations									5826744201	7264011080	5462632264																																															
	Diluted EPS	112.2	30.69	27.99	27.26	26.29	22.3	16.4	10.13	5904705086	7327811761	5527757696																																															
	Diluted EPS from Continuing Operations	112.2	30.67	27.99	27.26	26.29	22.23	16.4	10.13	5982665971	7391612442	5592883128																																															
	Diluted EPS from Discontinued Operations									6060626856	7455413122	5658008560																																															
	Basic Weighted Average Shares Outstanding	667650000	662664000	665758000	668958000	673220000	675581000	679449000	681768000	6138587741	7519213803	5723133992																																															
	Diluted Weighted Average Shares Outstanding	677674000	672493000	676519000	679612000	682071000	682969000	685851000	687024000	6216548625	7583014484	5788259424																																															
	Reported Normalized Diluted EPS									6294509510	7646815164	5853384856																																															
	Basic EPS	113.88	31.15	28.44	27.69	26.63	22.54	16.55	10.21	6372470395	7710615845	5918510288																																															
	Diluted EPS	112.2	30.69	27.99	27.26	26.29	22.3	16.4	10.13	6450431280	7774416525	5983635720																																															
	Basic WASO	667650000	662664000	665758000	668958000	673220000	675581000	679449000	681768000	6528392165	7838217206	6048761151																																															
	Diluted WASO	677674000	672493000	676519000	679612000	682071000	682969000	685851000	687024000	6606353050	7902017887	6113886583																																															
	Fiscal year end September 28th., 2022. | USD									6684313934	7965818567	6179012015																																															


	316221839								Print																																																		
	3/6/2022 at 6:37 PM																																																										
	Morningstar.com Intraday Fundamental Portfolio View Print Report																																																										
	Sihnificamce																																																										
	______________________________________________________________																																																										
	GOOGL_income-statement_Quarterly_As_Originally_Reported		Q4 2021																																																								
	Cash Flow from Operating Activities, Indirect		24934000000	Q3 2021	Q2 2021	Q1 2021	Q4 2020																																																				
	Net Cash Flow from Continuing Operating Activities, Indirect		24934000000	25539000000	37497000000	31211000000	30818000000																																																				
	Cash Generated from Operating Activities		24934000000	25539000000	21890000000	19289000000	22677000000																																																				
	Income/Loss before Non-Cash Adjustment		20642000000	25539000000	21890000000	19289000000	22677000000																																																				
	Total Adjustments for Non-Cash Items		6517000000	18936000000	18525000000	17930000000	15227000000																																																				
	Depreciation, Amortization and Depletion, Non-Cash Adjustment		3439000000	3797000000	4236000000	2592000000	5748000000																																																				
	Depreciation and Amortization, Non-Cash Adjustment		3439000000	3304000000	2945000000	2753000000	3725000000																																																				
	Depreciation, Non-Cash Adjustment		3215000000	3304000000	2945000000	2753000000	3725000000																																																				
	Amortization, Non-Cash Adjustment		224000000	3085000000	2730000000	2525000000	3539000000																																																				
	Stock-Based Compensation, Non-Cash Adjustment		3954000000	219000000	215000000	228000000	186000000																																																				
	Taxes, Non-Cash Adjustment		1616000000	3874000000	3803000000	3745000000	3223000000																																																				
	Investment Income/Loss, Non-Cash Adjustment		-2478000000	-1287000000	379000000	1100000000	1670000000																																																				
	Gain/Loss on Financial Instruments, Non-Cash Adjustment		-2478000000	-2158000000	-2883000000	-4751000000	-3262000000																																																				
	Other Non-Cash Items		-14000000	-2158000000	-2883000000	-4751000000	-3262000000																																																				
	Changes in Operating Capital		-2225000000	64000000	-8000000	-255000000	392000000																																																				
	Change in Trade and Other Receivables		-5819000000	2806000000	-871000000	-1233000000	1702000000																																																				
	Change in Trade/Accounts Receivable		-5819000000	-2409000000	-3661000000	2794000000	-5445000000																																																				
	Change in Other Current Assets		-399000000	-2409000000	-3661000000	2794000000	-5445000000																																																				
	Change in Payables and Accrued Expenses		6994000000	-1255000000	-199000000	7000000	-738000000																																																				
	Change in Trade and Other Payables		1157000000	3157000000	4074000000	-4956000000	6938000000																																																				
	Change in Trade/Accounts Payable		1157000000	238000000	-130000000	-982000000	963000000																																																				
	Change in Accrued Expenses		5837000000	238000000	-130000000	-982000000	963000000																																																				
	Change in Deferred Assets/Liabilities		368000000	2919000000	4204000000	-3974000000	5975000000																																																				
	Change in Other Operating Capital		-3369000000	272000000	-3000000	137000000	207000000																																																				
	Change in Prepayments and Deposits			3041000000	-1082000000	785000000	740000000																																																				
	Cash Flow from Investing Activities		-11016000000																																																								
	Cash Flow from Continuing Investing Activities		-11016000000	-10050000000	-9074000000	-5383000000	-7281000000																																																				
	Purchase/Sale and Disposal of Property, Plant and Equipment, Net		-6383000000	-10050000000	-9074000000	-5383000000	-7281000000																																																				
	Purchase of Property, Plant and Equipment		-6383000000	-6819000000	-5496000000	-5942000000	-5479000000																																																				
	Sale and Disposal of Property, Plant and Equipment			-6819000000	-5496000000	-5942000000	-5479000000																																																				
	Purchase/Sale of Business, Net		-385000000																																																								
	Purchase/Acquisition of Business		-385000000	-259000000	-308000000	-1666000000	-370000000																																																				
	Purchase/Sale of Investments, Net		-4348000000	-259000000	-308000000	-1666000000	-370000000																																																				
	Purchase of Investments		-40860000000	-3360000000	-3293000000	2195000000	-1375000000																																																				
	Sale of Investments		36512000000	-35153000000	-24949000000	-37072000000	-36955000000																																																				
	Other Investing Cash Flow		100000000	31793000000	21656000000	39267000000	35580000000																																																				
	Purchase/Sale of Other Non-Current Assets, Net			388000000	23000000	30000000	-57000000																																																				
	Sales of Other Non-Current Assets																																																										
	Cash Flow from Financing Activities		-16511000000	-15254000000																																																							
	Cash Flow from Continuing Financing Activities		-16511000000	-15254000000	-15991000000	-13606000000	-9270000000																																																				
	Issuance of/Payments for Common Stock, Net		-13473000000	-12610000000	-15991000000	-13606000000	-9270000000																																																				
	Payments for Common Stock		13473000000	-12610000000	-12796000000	-11395000000	-7904000000																																																				
	Proceeds from Issuance of Common Stock				-12796000000	-11395000000	-7904000000																																																				
	Issuance of/Repayments for Debt, Net		115000000	-42000000																																																							
	Issuance of/Repayments for Long Term Debt, Net		115000000	-42000000	-1042000000	-37000000	-57000000																																																				
	Proceeds from Issuance of Long Term Debt		6250000000	6350000000	-1042000000	-37000000	-57000000																																																				
	Repayments for Long Term Debt		6365000000	-6392000000	6699000000	900000000	0																																																				
	Proceeds from Issuance/Exercising of Stock Options/Warrants		2923000000	-2602000000	-7741000000	-937000000	-57000000																																																				
	-2453000000	-2184000000	-1647000000																																																								

	Other Financing Cash Flow																																																										
	Cash and Cash Equivalents, End of Period																																																										
	Change in Cash		0		300000000	10000000	3.38E+11																																																				
	Effect of Exchange Rate Changes		20945000000	23719000000	23630000000	26622000000	26465000000																																																				
	Cash and Cash Equivalents, Beginning of Period		25930000000	235000000000)	-3175000000	300000000	6126000000																																																				
	Cash Flow Supplemental Section		181000000000)	-1.46E+11	183000000	-143000000	210000000																																																				
	Change in Cash as Reported, Supplemental		23719000000000)	2.363E+13	2.6622E+13	2.6465E+13	2.0129E+13																																																				
	Income Tax Paid, Supplemental		2774000000	89000000	-2992000000	2.57637E+11	6336000000																																																				
	Cash and Cash Equivalents, Beginning of Period		13412000000	157000000		2.57637E+11	-4990000000																																																				
	PLEASE READ THE IMPORTANT DISCLOSURES BELOW																																																										
	12 Months Ended																																																										
	_________________________________________________________																																																										
	Q4 2020			Q4  2019																																																							
	Income Statement 																																																										
	USD in "000'"s																																																										
	Repayments for Long Term Debt			Dec. 31, 2020			Dec. 31, 2019																																																				
	Costs and expenses:																																																										
	Cost of revenues			182527			161857																																																				
	Research and development																																																										
	Sales and marketing			84732			71896																																																				
	General and administrative			27573			26018																																																				
	European Commission fines			17946			18464																																																				
	Total costs and expenses			11052			9551																																																				
	Income from operations			0			1697																																																				
	Other income (expense), net			141303			127626																																																				
	Income before income taxes			41224			34231																																																				
	Provision for income taxes			6858000000			5394																																																				
	Net income			2267700000000000)			1928900000000000)																																																				
	*include interest paid, capital obligation, and underweighting			2267700000000000)			1928900000000000)																																																				
					2267700000000000)			1928900000000000)																																																			
	Basic net income per share of Class A and B common stock and Class C capital stock (in dollars par share)																																																										
	Diluted net income per share of Class A and Class B common stock and Class C capital stock (in dollars par share)								"PLEASE READ THE IMPORTANT DISCLOSURES BELOW		Bank																											PNC Bank Business Tax I.D. Number: 633441725																					
	CIF Department (Online Banking)																													Checking Account: 47-2041-6547																													
	P7-PFSC-04-F																													Business Type: Sole Proprietorship/Partnership Corporation																													
	500 First Avenue																													ALPHABET																													
	Pittsburgh, PA 15219-3128																													5323 BRADFORD DR																													
	NON-NEGOTIABLE																													DALLAS TX 75235 8313																													
	ZACHRY, TYLER, WOOD																																																										
	4/18/2022			650-2530-000 469-697-4300				__________________________________________________  SIGNATURE		  											Time Zone: Eastern Central Mountain PacificInvestment Products  • Not FDIC Insured  • No Bank Guarantee  • May Lose Value |"																																						


	For Paperwork Reduction Act Notice, see the seperate Instructions.																																																										
	Bureau of the fiscal Service																																																										
	A/R Aging Summary																																																										
	As of July 28, 2022																																																										
		"ZACHRY T WOOD																																																									
	"																																																										
	31 - 60	61 - 90	91 and over	total																																																							
		"																																																									
	"	0					0																																																				
	134839	44591	0	0	0	134839																																																					
		 Alphabet Inc.  																																																									
							£134,839																																																				

		 US$ in millions 																																																									
		 Ann. Rev. Date 	£43,830	£43,465	£43,100	£42,735	£42,369																																																				
		 Revenues 	£161,857	£136,819	£110,855	£90,272	£74,989																																																				
		 Cost of revenues 	(£71,896)	(£59,549)	(£45,583)	(£35,138)	(£28,164)																																																				
		 Gross profit 	£89,961	£77,270	£65,272	£55,134	£46,825																																																				
		 Research and development 	(£26,018)	(£21,419)	(£16,625)	(£13,948)	(£12,282)																																																				
		 Sales and marketing 	(£18,464)	(£16,333)	(£12,893)	(£10,485)	(£9,047)																																																				
		 General and administrative 	(£9,551)	(£8,126)	(£6,872)	(£6,985)	(£6,136)																																																				
		 European Commission fines 	(£1,697)	(£5,071)	(£2,736)	 — 	 — 																																																				
		 Income from operations 	£34,231	£26,321	£26,146	£23,716	£19,360																																																				
		 Interest income 	£2,427	£1,878	£1,312	£1,220	£999																																																				
		 Interest expense 	(£100)	(£114)	(£109)	(£124)	(£104)																																																				
		 Foreign currency exchange gain  	£103	(£80)	(£121)	(£475)	(£422)																																																				
		 Gain (loss) on debt securities 	£149	£1,190	(£110)	(£53)	 — 																																																				
		 Gain (loss) on equity securities, 	£2,649	£5,460	£73	(£20)	 — 																																																				
		 Performance fees 	(£326)	 — 	 — 	 — 	 — 																																																				
		 Gain(loss)  	£390	(£120)	(£156)	(£202)	 — 																																																				
		 Other 	£102	£378	£158	£88	(£182)																																																				
		 Other income (expense), net 	£5,394	£8,592	£1,047	£434	£291																																																				
		 Income before income taxes 	£39,625	£34,913	£27,193	£24,150	£19,651																																																				
		 Provision for income taxes 	(£3,269)	(£2,880)	(£2,302)	(£1,922)	(£1,621)																																																				
		 Net income 	£36,355	(£32,669)	£25,611	£22,198	£18,030																																																				
		 Adjustment Payment to Class C 																																																									
		 Net. Ann. Rev. 	£36,355	£32,669	£25,611	£22,198	£18,030																																																				
	*Investments in unaffiliated securities, at value																																																										
	*realized  liabilities\gain as reported supplemental 																																																										

	fiscal year endings' in Septmenber 28th., 2021.																																																										
	PLEASE READ THE IMPORTANT DISCLOSURES BELOW																																																										
	| Investment Products  • Not FDIC Insured  • No Bank Guarantee  • May Lose Value |																																																										
	CIF Department (Online Banking)																																																										
	P7-PFSC-04-F																																																										
	500 First Avenue																																																										
	Pittsburgh, PA 15219-3128																																																										
	NON-NEGOTIABLE																																																										
 480  
devcontainers.json/mk.dir/akefile.IU
Viewed
@@ -0,0 +1,480 @@
￼        +                                              
  1                Earnings Statement                                                                
3/6/2022 at 6:37 PM        +                                                                                                                                

ALPHABET                                                                Period Beginning: 01-01-2009                                                                

GOOGL_income-statement_Quarterly_As_Originally_Reported        1600 AMPITHEATRE PARKWAY                                                                Period Ending:                                                                

Cash Flow from Operating Activities, IndirectNet Cash Flow from Continuing Operating Activities, IndirectCash Generated from Operating ActivitiesIncome/Loss before Non-Cash AdjustmentTotal Adjustments for Non-Cash ItemsDepreciation, 
Amortization and Depletion, Non-Cash AdjustmentDepreciation and Amortization, Non-Cash AdjustmentDepreciation, Non-Cash AdjustmentAmortization, Non-Cash AdjustmentStock-Based Compensation, Non-Cash AdjustmentTaxes, Non-Cash AdjustmentInvestment Income/Loss, Non-Cash AdjustmentGain/Loss on Financial Instruments, Non-Cash AdjustmentOther Non-Cash ItemsChanges in Operating CapitalChange in Trade and Other ReceivablesChange in Trade/Accounts ReceivableChange in Other Current AssetsChange in Payables and Accrued ExpensesChange in Trade and Other PayablesChange in Trade/Accounts PayableChange in Accrued ExpensesChange in Deferred Assets/LiabilitiesChange in Other Operating Capital        +MOUNTAIN VIEW, C.A., 94043                                                                Pay Date:                                                                

Change in Prepayments and Deposits
Cash Flow from Investing Activities
Cash Flow from Continuing Investing Activities        

Purchase/Sale and Disposal of Property, Plant and Equipment, NetPurchase of Property, Plant and EquipmentSale and Disposal of Property, Plant and EquipmentPurchase/Sale of Business, NetPurchase/Acquisition of BusinessPurchase/Sale of Investments, 
NetPurchase of Investments       
Taxable Marital Status ", 
Exemptions/Allowances.",                        Married                                        ZACHRY T.                                                                

Sale of InvestmentsOther Investing Cash FlowPurchase/Sale of Other Non-Current Assets, NetSales of Other Non-Current AssetsCash Flow from Financing ActivitiesCash Flow from Continuing Financing ActivitiesIssuance of/Payments for Common Stock, NetPayments for Common StockProceeds from Issuance of Common StockIssuance of/Repayments for Debt, NetIssuance of/Repayments for Long Term Debt, NetProceeds from Issuance of Long Term DebtRepayments for Long Term Debt        +                                                                5323                                                                

Proceeds from Issuance/Exercising of Stock Options/WarrantsOther Financing Cash FlowCash and Cash Equivalents, End of PeriodChange in CashEffect of Exchange Rate ChangesCash and Cash Equivalents, Beginning of PeriodCash Flow Supplemental SectionChange in Cash as Reported, SupplementalIncome Tax Paid, SupplementalZACHRY T WOODCash and Cash Equivalents, Beginning of PeriodDepartment of the TreasuryInternal Revenue Service        +Federal:                                                                                                                                

Calendar Year

Due: 04/18/2022        

DALLAS                                                                

USD in ""000'""sRepayments for Long Term DebtCosts and expenses:Cost of revenuesResearch and developmentSales and marketingGeneral and administrativeEuropean Commission finesTotal costs and expensesIncome from operationsOther income (expense), netIncome before income taxesProvision for income taxesNet income*include interest paid, capital obligation, and underweighting        +TX:                NO State Income Tax                                                                                                                

Basic net income per share of Class A and B common stock and Class C capital stock (in dollars par share)        
                        rate                     units                                            year to date        Benefits and Other Infotmation                                                                
        EPS        112        674,678,000                                        75698871600                                        Regular                               
                                                                      Pto Balance                                                       
                                                                        Total Work Hrs                                                                
        Gross Pay        75698871600                                                        Important Notes                                                                
                                                                        COMPANY PH Y: 650-253-0000                                                                
        Statutory                                                                BASIS OF PAY: BASIC/DILUTED EPS                                                                
        Federal Income Tax                                                                                                                                
        Social Security Tax                                                                                                                                
        +                                                                YOUR BASIC/DILUTED EPS RATE HAS BEEN CHANGED FROM 0.001 TO 112.20 PAR SHARE VALUE                                                                
Diluted net income per share of Class A and Class B common stock and Class C capital stock (in dollars par share)*include interest paid, capital obligation, and underweighting        +Medicare Tax                                                                                                                                
Basic net income per share of Class A and B common stock and Class C capital stock (in dollars par share)Diluted net income per share of Class A and Class B common stock and Class C capital stock (in dollars par share)        +                                                                                                                                

Net Pay                70842743866.0000                70842,743,866.0000                                                                                                
CHECKING                                                                                                                                

Net Check                70842743866                                                                                                                

                                                1                Earnings Statement                                                                        

ALPHABET                                                                Period Beginning:                                                                        
1600 AMPITHEATRE PARKWAY                                                                                                                                                                                          DR                                        Period Ending:                                                                        
MOUNTAIN VIEW, C.A., 94043                                                                Pay Date:                                                                        
"Taxable Marital Status:         +                                                                                                                                
Exemptions/Allowances"                        Married                                        ZACHRY T.                                                                        
                                                                5323                                                                        
Federal:                                                                                                                                        
                                                                DALLAS                                                                        
TX:                NO State Income Tax                                                                                                                        
        rate        units                                        year to date        Other Benefits and                                                                        
EPS        112        674,678,000                                        75698871600        Information                                                                        
                                                                Pto Balance                                                                        
                                                                Total Work Hrs                                                                        
Gross Pay        75698871600                                                        Important Notes                                                                        
                                                                COMPANY PH Y: 650-253-0000                                                        SIGNATURE                
Statutory                                                                BASIS OF PAY: BASIC/DILUTED EPS                                                                        
Federal Income Tax                                                                                                                                        
Social Security Tax                                                                                                                                        
                                                                YOUR BASIC/DILUTED EPS RATE HAS BEEN CHANGED FROM 0.001 TO 112.20 PAR SHARE VALUE                                                                        
Medicare Tax                                                                                                                                        

Net Pay                70,842,743,866                70,842,743,866                                                                                                        
CHECKING                                                                                                                                        
Net Check                70842743866                                                                                                                        
Your federal taxable wages this period are $                                                                Advice number:                                                                        
ALPHABET INCOME                                                                                                                                        
1600 AMPIHTHEATRE  PARKWAY MOUNTAIN VIEW CA 94043                                                                Pay date:                                                                        

Deposited to the account Of        xxxxxxxx6547                                                                                                                                
+"PLEASE READ THE IMPORTANT DISCLOSURES BELOW                                                                                                                                        
+                                                                                                                                        
+FEDERAL RESERVE MASTER SUPPLIER ACCOUNT                                        31000053-052101023                                                                                                
+                                        633-44-1725                                                                                                
+PNC Bank                                                                                                                                        
+CIF Department (Online Banking)                                                                                                                                        
+P7-PFSC-04-F                                                                                                                                        
+500 First Avenue                                                                                                                                        
+Pittsburgh, PA 15219-3128                                                                                                                                        
+NON-NEGOTIABLE                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                SIGNATURE                        
+Investment Products  • Not FDIC Insured  • No Bank Guarantee  • May Lose Value"                                                                                                                                        
+                                                                NON-NEGOTIABLE                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+Based on facts as set forth in.                        6550                                                                                                                
+The U.S. Internal Revenue Code of 1986, as amended, the Treasury Regulations promulgated thereunder, published pronouncements of the Internal Revenue Service, which may be cited or used as precedents, and case law, any of which may be changed at any time with retroactive effect.  No opinion is expressed on any matters other than those specifically referred to above.                                                                                                                                        
+                                                                                                                                        
+EMPLOYER IDENTIFICATION NUMBER:       61-1767919                        6551                                                                                                                
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        

ALPHABET                                                                                                                                        
ZACHRY T WOOD                                                                                                                                        
5323 BRADFORD DR                                                                                                                                        
DALLAS TX 75235-8314                                                                                                                                        
ORIGINAL REPORT                                                                                                                                        
Income, Rents, & Royalty                                                                                                                                        
INCOME STATEMENT        61-1767919                                                                                                                                
        88-1303491                                                                                                                                
GOOGL_income-statement_Quarterly_As_Originally_Reported        TTM        Q4 2021        Q3 2021        Q2 2021        Q1 2021        Q4 2020        Q3 2020        Q2 2020                                                                        

Gross Profit        1.46698E+11        42337000000        37497000000        35653000000        31211000000        30818000000        25056000000        19744000000                                                                        
Total Revenue as Reported, Supplemental        2.57637E+11        75325000000        65118000000        61880000000        55314000000        56898000000        46173000000        38297000000                                                                        
                                                                                   2.57637E+11        75325000000        65118000000        61880000000        55314000000        56898000000        46173000000        38297000000                                                                        
Other Revenue                                                        257637118600                                                                                
Cost of Revenue        -1.10939E+11        -32988000000        -27621000000        -26227000000        -24103000000        -26080000000        -21117000000        -18553000000                                                                        
Cost of Goods and Services        -1.10939E+11        -32988000000        -27621000000        -26227000000        -24103000000        -26080000000        -21117000000        -18553000000                                                                        
Operating Income/Expenses        -67984000000        -20452000000        -16466000000        -16292000000        -14774000000        -15167000000        -13843000000        -13361000000                                                                        
Selling, General and Administrative Expenses        -36422000000        -11744000000        -8772000000        -8617000000        -7289000000        -8145000000        -6987000000        -6486000000                                                                        
General and Administrative Expenses        -13510000000        -4140000000        -3256000000        -3341000000        -2773000000        -2831000000        -2756000000        -2585000000                                                                        
Selling and Marketing Expenses        -22912000000        -7604000000        -5516000000        -5276000000        -4516000000        -5314000000        -4231000000        -3901000000                                                                        
Research and Development Expenses        -31562000000        -8708000000        -7694000000        -7675000000        -7485000000        -7022000000        -6856000000        -6875000000                                                                        
Total Operating Profit/Loss        78714000000        21885000000        21031000000        19361000000        16437000000        15651000000        11213000000        6383000000                                                                        
Non-Operating Income/Expenses, Total        12020000000        2517000000        2033000000        2624000000        4846000000        3038000000        2146000000        1894000000                                                                        
Total Net Finance Income/Expense        1153000000        261000000        310000000        313000000        269000000        333000000        412000000        420000000                                                                        
Net Interest Income/Expense        1153000000        261000000        310000000        313000000        269000000        333000000        412000000        420000000                                                                        

Interest Expense Net of Capitalized Interest        -346000000        -117000000        -77000000        -76000000        -76000000        -53000000        -48000000        -13000000                                                                        
Interest Income        1499000000        378000000        387000000        389000000        345000000        386000000        460000000        433000000                                                                        
Net Investment Income        12364000000        2364000000        2207000000        2924000000        4869000000        3530000000        1957000000        1696000000                                                                        
Gain/Loss on Investments and Other Financial Instruments        12270000000        2478000000        2158000000        2883000000        4751000000        3262000000        2015000000        1842000000                                                                        
Income from Associates, Joint Ventures and Other Participating Interests        334000000        49000000        188000000        92000000        5000000        355000000        26000000        -54000000                                                                        
Gain/Loss on Foreign Exchange        -240000000        -163000000        -139000000        -51000000        113000000        -87000000        -84000000        -92000000                                                                        
Irregular Income/Expenses        0        0                                0        0        0                                                                        
Other Irregular Income/Expenses        0        0                                0        0        0                                                                        
Other Income/Expense, Non-Operating        -1497000000        -108000000        -484000000        -613000000        -292000000        -825000000        -223000000        -222000000                                                                        
Pretax Income        90734000000        24402000000        23064000000        21985000000        21283000000        18689000000        13359000000        8277000000                                                                        
Provision for Income Tax        -14701000000        -3760000000        -4128000000        -3460000000        -3353000000        -3462000000        -2112000000        -1318000000                                                                        
Net Income from Continuing Operations        76033000000        20642000000        18936000000        18525000000        17930000000        15227000000        11247000000        6959000000                                                                        
Net Income after Extraordinary Items and Discontinued Operations        76033000000        20642000000        18936000000        18525000000        17930000000        15227000000        11247000000        6959000000                                                                        
Net Income after Non-Controlling/Minority Interests        76033000000        20642000000        18936000000        18525000000        17930000000        15227000000        11247000000        6959000000                                                                        
Net Income Available to Common Stockholders        76033000000        20642000000        18936000000        18525000000        17930000000        15227000000        11247000000        6959000000                                                                        
Diluted Net Income Available to Common Stockholders        76033000000        20642000000        18936000000        18525000000        17930000000        15227000000        11247000000        6959000000                                                                        
Income Statement Supplemental Section                                                                                                                                        
Reported Normalized and Operating Income/Expense Supplemental Section                                                                                                                                        
Total Revenue as Reported, Supplemental        2.57637E+11        75325000000        65118000000        61880000000        55314000000        56898000000        46173000000        38297000000                                                                        
Total Operating Profit/Loss as Reported, Supplemental        78714000000        21885000000        21031000000        19361000000        16437000000        15651000000        11213000000        6383000000                                                                        
Reported Effective Tax Rate        0.162                0.179        0.157        0.158                0.158        0.159                                                                        
Reported Normalized Income                                                                                                                                        
Reported Normalized Operating Profit                                                                                                                                        
Other Adjustments to Net Income Available to Common Stockholders                                                                                                                                        
Discontinued Operations                                                                                                                                        
Basic EPS        113.88        31.15        28.44        27.69        26.63        22.54        16.55        10.21                                                                        
Basic EPS from Continuing Operations        113.88        31.12        28.44        27.69        26.63        22.46        16.55        10.21                                                                        
Basic EPS from Discontinued Operations                                                                                                                                        
Diluted EPS        112.2        30.69        27.99        27.26        26.29        22.3        16.4        10.13                                                                        
Diluted EPS from Continuing Operations        112.2        30.67        27.99        27.26        26.29        22.23        16.4        10.13                                                                        
Diluted EPS from Discontinued Operations                                                                                                                                        
Basic Weighted Average Shares Outstanding        667650000        662664000        665758000        668958000        673220000        675581000        679449000        681768000                                                                        
Diluted Weighted Average Shares Outstanding        677674000        672493000        676519000        679612000        682071000        682969000        685851000        687024000                                                                        
Reported Normalized Diluted EPS                                                                                                                                        
Basic EPS        113.88        31.15        28.44        27.69        26.63        22.54        16.55        10.21                                                                        
Diluted EPS        112.2        30.69        27.99        27.26        26.29        22.3        16.4        10.13                                                                        
Basic WASO        667650000        662664000        665758000        668958000        673220000        675581000        679449000        681768000                                                                        
Diluted WASO        677674000        672493000        676519000        679612000        682071000        682969000        685851000        687024000                                                                        
Fiscal year end September 28th., 2022. | USD                                                                                                                                        





2.3719E+13        2.363E+13        2.6622E+13        2.6465E+13        2.0129E+13                                                                                        
Income Tax Paid, Supplemental


2774000000        89000000        -2992000000                6336000000                                                                                        Cash and Cash Equivalents, Beginning of Period
13412000000        157000000                        -4990000000                                                                                                                                                                                                                                                                                                                                                                           


Costs and :                                                                                                                                        



84732                        71896                                                                                        
General and administrative                           

27573                        26018                                                                                        
European Commission fines                       

17946                        18464                                                                                        
Total costs and expenses                             

11052                        9551                                                                                        
Income from operations                               

 0                        1697                                                                                        
Other income (expense), net                        

141303                        127626                                                                                        
Income before income taxes       

 41224                        34231                                                                                        
Provision for income taxes

 subtotal
                                                              22677000000                        19289000000                                               
                                       total
                                                                                                22677000000                        19289000000

22677000000                        19289000000                                                                                        
Basic net income per share of Class A and B common stock and Class C capital stock (in dollars par share)                                                                                                                                        
Diluted net income per share of Class A and Class B common stock and Class C capital stock (in dollars par share)                    

Cash Flow from Operating Activities, Indirect                                                                                                                                        
Net Cash Flow from Continuing Operating Activities, Indirect                24934000000        25539000000        37497000000        31211000000        30818000000                                                                                        
Cash Generated from Operating Activities                24934000000        25539000000        21890000000        19289000000        22677000000                                                                                        
Income/Loss before Non-Cash Adjustment                24934000000        25539000000        21890000000        19289000000        22677000000                                                                                        
Total Adjustments for Non-Cash Items                20642000000        18936000000        18525000000        17930000000        15227000000                                                                                        
Depreciation, Amortization and Depletion, Non-Cash Adjustment                6517000000        3797000000        4236000000        2592000000        5748000000                                                                                        
Depreciation and Amortization, Non-Cash Adjustment                3439000000        3304000000        2945000000        2753000000        3725000000                                                                                        
Depreciation, Non-Cash Adjustment                3439000000        3304000000        2945000000        2753000000        3725000000                                                                                        
Amortization, Non-Cash Adjustment                3215000000        3085000000        2730000000        2525000000        3539000000                                                                                        
Stock-Based Compensation, Non-Cash Adjustment                224000000        219000000        215000000        228000000        186000000                                                                                        
Taxes, Non-Cash Adjustment                3954000000        3874000000        3803000000        3745000000        3223000000                                                                                        
Investment Income/Loss, Non-Cash Adjustment                1616000000        -1287000000        379000000        1100000000        1670000000                                                                                        
Gain/Loss on Financial Instruments, Non-Cash Adjustment                -2478000000        -2158000000        -2883000000        -4751000000        -3262000000                                                                                        
Other Non-Cash Items                -2478000000        -2158000000        -2883000000        -4751000000        -3262000000                                                                                        
Changes in Operating Capital                -14000000        64000000        -8000000        -255000000        392000000                                                                                        
Change in Trade and Other Receivables                -2225000000        2806000000        -871000000        -1233000000        1702000000                                                                                        
Change in Trade/Accounts Receivable                -5819000000        -2409000000        -3661000000        2794000000        -5445000000                                                                                        
Change in Other Current Assets                -5819000000        -2409000000        -3661000000        2794000000        -5445000000                                                                                        
Change in Payables and Accrued Expenses                -399000000        -1255000000        -199000000        7000000        -738000000                                                                                        
Change in Trade and Other Payables                6994000000        3157000000        4074000000        -4956000000        6938000000                                                                                        
Change in Trade/Accounts Payable                1157000000        238000000        -130000000        -982000000        963000000                                                                                        
Change in Accrued Expenses                1157000000        238000000        -130000000        -982000000        963000000                                                                                        
Change in Deferred Assets/Liabilities                5837000000        2919000000        4204000000        -3974000000        5975000000                                                                                        
Change in Other Operating Capital                368000000        272000000        -3000000        137000000        207000000                                                                                        
Change in Prepayments and Deposits                -3369000000        3041000000        -1082000000        785000000        740000000                                                                                        
Cash Flow from Investing Activities                                                                                                                                        
Cash Flow from Continuing Investing Activities                -11016000000                -9074000000        -5383000000        -7281000000                                                                                        
Purchase/Sale and Disposal of Property, Plant and Equipment, Net                -11016000000        -10050000000        -9074000000        -5383000000        -7281000000                                                                                        
Purchase of Property, Plant and Equipment                -6383000000        -10050000000        -5496000000        -5942000000        -5479000000                                                                                        
Sale and Disposal of Property, Plant and Equipment                -6383000000        -6819000000        -5496000000        -5942000000        -5479000000                                                                                        
Purchase/Sale of Business, Net                        -6819000000                                                                                                                
Purchase/Acquisition of Business                -385000000                -308000000        -1666000000        -370000000                                                                                        
Purchase/Sale of Investments, Net                -385000000        -259000000        -308000000        -1666000000        -370000000                                                                                        
Purchase of Investments                -4348000000        -259000000        -3293000000        2195000000        -1375000000                                                                                        
Sale of Investments                -40860000000        -3360000000        -24949000000        -37072000000        -36955000000                                                                                        
Other Investing Cash Flow                36512000000        -35153000000        21656000000        39267000000        35580000000                                                                                        
Purchase/Sale of Other Non-Current Assets, Net                100000000        31793000000        23000000        30000000        -57000000                                                                                        
Sales of Other Non-Current Assets                        388000000                                                                                                                
Cash Flow from Financing Activities                                                                                                                                        
Cash Flow from Continuing Financing Activities                -16511000000        -15254000000        -15991000000        -13606000000        -9270000000                                                                                        
Issuance of/Payments for Common Stock, Net                -16511000000        -15254000000        -15991000000        -13606000000        -9270000000                                                                                        
Payments for Common Stock                -13473000000        -12610000000        -12796000000        -11395000000        -7904000000                                                                                        
Proceeds from Issuance of Common Stock                13473000000        -12610000000        -12796000000        -11395000000        -7904000000                                                                                        
Issuance of/Repayments for Debt, Net                                                                                                                                        
Issuance of/Repayments for Long Term Debt, Net

115000000        -42000000        -1042000000        -37000000        -57000000                                                                                        
Proceeds from Issuance of Long Term Debt

1150000000        -42000000        -1042000000        -37000000        -57000000                                                                                        
Repayments for Long Term Debt 

6250000000        6350000000        6699000000        900000000        0                                                                                        
Proceeds from Issuance/Exercising of Stock Options/Warrants

6250000000        6365000000        -6392000000        -7741000000        -937000000        -57000000                                                                                                        
2923000000        -2602000000        -2453000000        -2184000000        -1647000000                                                                                                                                                                                                                                
Other Financing Cash Flow

Cash and Cash Equivalents, End of Period                                                                                                                                        

Change in Cash

                0                300000000        10000000        338000000000)                                                                                        
Effect of Exchange Rate Changes

                20945000000        23719000000        23630000000        26622000000        26465000000                                                                                        
Cash and Cash Equivalents, Beginning of Period

                25930000000        235000000000)        -3175000000        300000000        6126000000                                                                                        
Cash Flow Supplemental Section 

               181000000000)        -146000000000)        183000000        -143000000        210000000                                                                                        
Change in Cash as Reported, Supplemental

Stripe Services Agreement
Stripe Connected Account Agreement
Stripe Payments Company Terms
Acquirer Terms
Cross River Bank
PNC Bank
Wells Fargo Bank
Issuing Bank Terms
Payment Method Terms
User Bank Debit Authorizations
Restricted Businesses
Other Products and Programs
Stripe Terminal Device EULA
Stripe Terminal Purchase Terms
Stripe Terminal Reseller Terms
Stripe Atlas Agreement
Stripe Climate Contribution Terms
Stripe Apps
App Developer Agreement
App Marketplace Agreement
Privacy
Privacy Policy
Cookies Policy
Privacy Shield Policy
Service Providers List
Data Processing Agreement
Stripe Privacy Center
Intellectual Property
Intellectual Property Notice
Marks Usage
E-SIGN Disclosure
Licenses
PNC Bank Acquirer Terms
Last updated: August 22, 2022

These PNC Bank Acquirer Terms (“Member Bank Terms”) are additional terms applicable to the Stripe Payments Services for Visa and Mastercard products for which PNC Bank, N.A. (“Member Bank”) is a Payment Method Acquirer (“VM Payment Processing Services”). In these Member Bank Terms, Visa and Mastercard may be referred to individually as a “Network” and collectively as the “Networks”, and the rules issued by a Network are the “Network Rules.” Additionally, for purposes of these Member Bank Terms, if you are registered with a Network pursuant to applicable Network Rules, you are considered “Network Registered.” Any terms used but not defined in these Member Bank Terms will have the meaning provided in the Stripe Services Agreement (“Agreement”).

These Member Bank Terms constitute a legal agreement among you, Stripe, and Member Bank, a national bank, with offices at 300 Fifth Avenue, Pittsburgh, PA 15222. The legal agreement is formed by Member Bank’s and Stripe’s offer of these Member Bank Terms to you, your acceptance of these Member Bank Terms, and Member Bank’s and Stripe’s subsequent provision of VM Payment Processing Services to you.

These Member Bank Terms are offered to you, and the legal agreement established by these Member Bank Terms becomes effective as provided below.

For all users of the VM Payment Processing Services, except Network Registered users: These Member Bank Terms become effective only when you process more than $1 million in Transactions on a Network within any twelve-month period. Importantly, the $1 million threshold for effectiveness of these Member Bank Terms is set by each Network, and either Network may change its threshold for effectiveness of these Member Bank Terms at any time with no notice to you. Until you process more than $1 million in Transactions on a Network (or such other processing thresholds as may be established by either Network), these Member Bank Terms are not effective, and you do not have a direct legal agreement with Member Bank with respect to the VM Payment Processing Services.
For Network Registered users of the VM Payment Processing Services: These Member Bank Terms become effective when you process your first Transaction on a Network.
You understand and agree that Stripe or Member Bank may enforce any provisions of the Agreement that relate to Stripe or Member Bank’s provision of or your use of the VM Payment Processing Services, and you acknowledge that you are directly responsible to Member Bank under the Agreement for any liability to Member Bank caused by your breach of the Agreement. Stripe or Member Bank may also terminate these Member Bank Terms at any time, which may limit or terminate your ability to use the VM Payment Processing Services. Further, either Network may, at any time for any reason, terminate these Member Bank Terms with respect to Payment Processing Services for its products.

You must accept all of the terms and conditions of these Member Bank Terms to use the VM Payment Processing Services. If you do not accept them, you may not receive VM Payment Processing Services.

1. Network Compliance and Disclosure
Important Member Bank Disclosures: Member Bank discloses that (i) it is the only entity approved to extend acceptance of Visa and Mastercard products directly to you under these Member Bank Terms; (ii) it must be a principal party to these Member Bank Terms; (iii) it is responsible for educating you on the Network Rules with which you must comply, but this information may be provided to you by Stripe; and (iv) subject to Section 4 of these Member Bank Terms, with respect to Transactions processed through the VM Payment Processing Services, it is responsible for and must provide the Settlement Funds (as defined below) that it receives to Stripe (or Stripe’s designated financial services provider) for Stripe’s distribution to you; and (v) with respect to Transactions processed through the VM Payment Processing Services, Stripe is responsible for all funds that may be held in reserve that are derived from your Settlement Funds.

Your Responsibilities: In addition to any other responsibilities set forth in these Member Bank Terms, you agree that, at all times throughout the term of these Member Bank Terms, you will (i) comply with the PCI Standards in using and maintaining Payment Account Details; (ii) maintain fraud and Dispute rates acceptable under the Network Rules; (iii) review and understand the terms of these Member Bank Terms; (iv) comply with the Network Rules and Laws; and (v) comply with the Agreement.

Stripe is registered as a Payment Facilitator and an Independent Sales Organization (ISO) by Member Bank. You may contact Member Bank by writing to PNC Bank, N.A., 1600 Market Street, 8th Floor, Philadelphia, PA 19103.

2. Purpose of these Member Bank Terms
When you process more than $1 million within any twelve-month period in Visa or Mastercard Transactions through a particular Payment Method Acquirer, or, if you are Network Registered, when you process your first Visa or Mastercard Transaction through a particular Payment Method Acquirer, applicable Network Rules require you to enter into a direct contractual relationship with the Payment Method Acquirer. These Member Bank Terms constitute your direct contractual relationship with Member Bank, which is a member of the Networks, and a Payment Method Acquirer for Visa and Mastercard Transactions. In accordance with the requirements of the Network Rules, these Member Bank Terms are offered and effective, and your direct contractual relationship with Member Bank is established, as provided in the introductory paragraphs above.

As a Payment Method Acquirer, Member Bank authorizes you to accept payment from your Customers by Visa and Mastercard credit or debit card (“VM Payment Cards”). However, by using the VM Payment Processing Services and accepting VM Payment Cards, you are not establishing a depository or other account with Member Bank. As between Stripe and Member Bank, Stripe is responsible for underwriting and evaluating your eligibility to receive the VM Payment Processing Services, authorizing charges, settling funds to your User Bank Account(s) as provided in Section 4, and providing the VM Payment Processing Services pursuant to the terms of the Agreement.

Stripe, and not Member Bank, will provide customer service to you to resolve any issues you may have related to your use of the VM Payment Processing Services; however, you may contact Member Bank (using the contact information provided above) in the event you are unable to resolve any matters directly with Stripe. You are solely responsible for providing support to your Customers for all issues related to your products and services.

3. Compliance with Visa and Mastercard Rules
When you use the VM Payment Processing Services to accept charges from VM Payment Cards, you must comply with the Network Rules, including the acceptance guidelines, monitoring programs, and activity reporting (including excessive credits, Disputes, or deposits) set forth therein. Under the Network Rules, certain activity may subject you to Disputes, fees, fines, settlement delays, withholdings, audits of your processing activity, or termination of these Member Bank Terms and/or the Agreement. Without limiting the foregoing, you specifically agree to:

i. Only submit Transactions authorized by the cardholder;

ii. Only accept payment for the sale of products or services, and receipt of bona fide donations, conducted by you pursuant to your business as indicated in your Stripe Account and not for any products, services, or donations (i) prohibited by Laws or Network Rules, or (ii) that qualify as Restricted Businesses, unless you have received prior written approval from Stripe;

iii. Submit a Transaction for the full amount owed by the Customer for the Transaction except where you and the Customer agree on a partial shipment (such as receiving a portion of an order), or where the Transaction qualifies for delayed delivery or special order deposits (such as paying for a deposit on a custom-built product);

iv. Not establish minimum or maximum amounts (except as permitted by the Network Rules), or condition charges for use of VM Payment Cards, and not discourage the use of one VM Payment Card brand over another;

v. Not impose surcharges or taxes (except where permitted by Law and the Network Rules) and, where so done, you will only collect such amounts as part of the submitted charge;

vi. Not submit a Transaction that represents collection of a dishonored check;

vii. Only use the Network logos or marks in a manner permitted by the Network Rules;

viii. Prohibit use of Payment Cards for disbursement of cash (except as permitted by the Network Rules);

ix. Comply with the security obligations identified in the Agreement, including compliance with the PCI Standards and only use cardholder data as permitted, and certify such compliance upon request, and not permit or promote fraudulent use of VM Payment Cards or cardholder data;

x. Make clear to Customers that they are transacting with you prior to, during, and after the Transaction, including providing clear statement descriptors;

xi. Use all reasonable methods to resolve disputes with Customers, including those resulting in a Dispute, and not attempt to recharge a Customer for a Transaction that was previously Disputed and subsequently returned to you unless the recharge is expressly authorized by the Customer; and

xii. Provide clear refund and exchange language that is consistent with Laws and the Network Rules.

4. Authorization for Settlement and Disbursement of Funds
When Member Bank receives funds from the Networks for settlement of your Card Payments (“Settlement Funds”), Member Bank will provide the Settlement Funds to Stripe or Stripe Payments Company, which will accept the Settlement Funds on your behalf. You agree to designate Stripe and Stripe Payments Company as your agent for purposes of receiving Settlement Funds, and you authorize Stripe to instruct Member Bank on your behalf on how and when to make transfers of Settlement Funds to Stripe, including the initiation of holds, receipts, and disbursements of Settlement Funds. Settlement Funds will be held by Stripe in pooled merchant funds accounts pending disbursement to you (or any applicable third-party recipient you have instructed Stripe to make a disbursement to on your behalf) in accordance with the terms of the Agreement, including these Member Bank Terms.

You agree you are not entitled to access the Settlement Funds prior to the Settlement Funds being credited by Stripe to your User Bank Account (or the bank account of a third-party recipient to which you have instructed Stripe to make a disbursement on your behalf). You further agree that you have no right to direct Member Bank to distribute Settlement Funds, that you may not assign any interest in any Settlement Funds held by Member Bank, and that you are not entitled to any interest or other compensation associated with the Settlement Funds held by Member Bank. Any authorizations set forth in these Member Bank Terms will remain in full force and effect until your Stripe Account is closed or terminated.

You agree that Member Bank’s transfer of Settlement Funds to your designated agents, Stripe or Stripe Payments Company, satisfies Member Bank’s settlement obligation to you, and that, after Member Bank transfers Settlement Funds to Stripe or Stripe Payments Company, any dispute or claim you may have regarding the receipt or amount of Settlement Funds will be between you and Stripe or Stripe Payments Company. Further, if a cardholder disputes a Transaction, if a Transaction is Disputed for any reason, or if Member Bank reasonably believes a Transaction is unauthorized or otherwise unacceptable, the amount of such Transaction may be Disputed and debited from Settlement Funds held by Member Bank.

5. Sharing of Data
a. You authorize Stripe and Member Bank to provide Protected Data to each other to (i) provide the VM Payment Processing Services, (ii) comply with legal and regulatory obligations, and (iii) perform underwriting and risk review, including verification that you are legally permitted to transact and receive funds. This includes sharing information you provided to Stripe before these Member Bank Terms became effective and information about Member Bank and Stripe’s experience with you, such as termination of these Member Bank Terms by Member Bank and the reasons for such termination. Where required to comply with our obligations under Laws, the Network Rules, or any of Member Bank’s regulatory obligations, Member Bank may provide any data to law enforcement, the Networks, or other government regulators.

b. To help the government fight the funding of terrorism and money laundering activities, federal law requires each financial institution to obtain, verify, and record information that identifies each person who establishes a customer relationship with the financial institution. To comply with this requirement, you authorize and direct Stripe to provide to Member Bank any information required to verify your identity, including your name, address, and taxpayer identification number. If you are a legal entity, including a limited liability company or corporation, you authorize and direct Stripe to provide Member Bank with information on the identity of (1) all beneficial owners of 25% or more of the company; and (2) at least one individual with significant control over the company.

6. Term and Termination
These Member Bank Termsbecome effective as provided in the introductory paragraphs and shall continue in effect so long as you use the VM Payment Processing Services.These Member Bank Terms will terminate automatically upon termination of the Agreement, except for those terms which are intended to survive termination. In addition, the VM Payment Processing Services and/or these Member Bank Terms may be terminated by Member Bank, Stripe, or either Network as provided in the introductory paragraphs.

7. Representations and Warranties
In addition to the representations and warranties made in the Agreement, which are incorporated by reference to this Addendum in their entirety, you represent and warrant to Member Bank and Stripe as of each day on which you receive VM Payment Processing Services that:

a. You are legally able to enter into these Member Bank Terms;

b. You will not use the VM Payment Processing Services, directly or indirectly, for any fraudulent or illegal undertaking; and

c. You will only use the VM Payment Processing Services in a manner consistent with the Agreement, including these Member Bank Terms, the Documentation, and Network Rules.

8. Indemnification
Notwithstanding the foregoing or anything to the contrary in the Agreement, you agree to defend, indemnify, and hold harmless Member Bank, and its respective employees, directors, agents, subcontractors and affiliates (collectively the “Member Bank Entities”) from and against any claim, suit, demand, loss, liability, damage (including indirect or consequential damage), action, or proceeding arising out of or relating to (a) your breach of any provision of the Agreement or these Member Bank Terms; (b) your use of the VM Payment Processing Services; (c) your obligations to pay fees or fines to Stripe, your Customers, Payment Method Providers, or third parties; (d) your negligence or willful misconduct or the negligence or willful misconduct of your employees, contractors, or agents; and (e) all third-party indemnity obligations Member Bank incurs as a direct or indirect result of your acts or omissions (including indemnification of any Network, card issuer, or intermediary bank).

9. Disclaimer of Warranties
THE SERVICES DESCRIBED IN THESE MEMBER BANK TERMS ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS, WITHOUT ANY WARRANTIES, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WITHOUT LIMITATION ANY IMPLIED WARRANTIES OF TITLE, QUALITY, SUITABILTY, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. ALL DISCLAIMERS OF WARRANTIES PROVIDED IN THE AGREEMENT WILL APPLY EQUALLY TO THE MEMBER BANK ENTITIES AS THEY DO TO STRIPE. THE MEMBER BANK ENTITIES (A) ARE NOT RESPONSIBLE FOR YOUR OR STRIPE’S FAILURE TO PERFORM OBLIGATIONS UNDER THE AGREEMENT AND (B) DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY YOU, STRIPE, OR ANY THIRD PARTY.

10. Limitations on Liability
In no event will the Member Bank Entities be liable for any lost profits, lost revenue, lost business opportunity, loss of data, or any indirect, punitive, incidental, special, consequential, or exemplary damages arising out of, in connection with, or relating to the Agreement, these Member Bank Terms, or the VM Payment Processing Services described in either, including without limitation the use of, inability to use, or unavailability of services provided by Stripe. Under no circumstances will any of the Member Bank Entities be responsible for any damage, loss, or injury resulting from hacking, tampering, or other unauthorized access, or use of the VM Payment Processing Services, your Stripe Account, or Protected Data, or your failure to use or implement security, controls, or processes that are appropriate for your business.

The Member Bank Entities assume no liability or responsibility for any (a) personal injury or property damage, of any nature whatsoever, resulting from your access to or use of the VM Payment Processing Services; (b) any misuse of VM Payment Processing Services or Protected Data; (c) any interruption or cessation of transmission to or from the VM Payment Processing Services; (d) any software bugs, viruses, or other harmful code that may be transmitted to, through, or in connection with the VM Payment Processing Services; (e) any errors, inaccuracies, or omissions in the VM Payment Processing Services or data, or any loss or damage resulting therefrom, regardless of the manner of transmission; or (f) defamatory, offensive, or illegal conduct of any third party.

The Member Bank Entities’ cumulative liability to you is limited to direct damages and in all events will not exceed in the aggregate the amount of fees or compensation actually received by Member Bank from Stripe for the Transactions processed for you through the VM Payment Processing Services during the three (3) month period immediately preceding the event that gives rise to the claim for liability. The limitation of liability in the preceding sentence will not apply to claims by you against Member Bank for direct damages for failure to transfer Settlement Funds to Stripe in accordance with Section 4 of these Member Bank Terms, in which case Member Bank liability for such direct claim by you is limited to the amount of any Settlement Funds that Member Bank failed to transfer to Stripe in accordance with Section 4 of these Member Bank Terms.

Without limiting anything to the contrary above, you agree to provide Member Bank, via a communication with Stripe, with written notice of any alleged breach by Member Bank of these Member Bank Terms, which notice will specifically detail such alleged breach, within sixty (60) days of the date on which you discovered or reasonably should have discovered the alleged breach. Failure to provide notice shall be deemed an acceptance by you and a waiver of any and all rights to dispute such breach.

The foregoing will apply to the fullest extent permitted by law in the applicable jurisdiction and will apply regardless of the legal theory on which the claim is based, including without limitation contract, tort (including negligence), strict liability, or any other basis. The limitations apply even if Stripe or Member Bank have been advised of the possibility of such damage.

11. United States Only Services; No Illegal Activities
You may not use the VM Payment Processing Services or services of any kind offered by Member Bank from, or on behalf of persons or entities (a) in a country embargoed by the United States or (b) blocked or denied by the United States government. You further acknowledge and agree that you will not use your Stripe Account and/or the VM Payment Processing Services for illegal Transactions, for example, those prohibited by the Unlawful Internet Gambling Enforcement Act, 31 U.S.C. Section 5361 et seq., as may be amended from time to time, or those involving any Person listed on the U.S. Department of Treasury, Office of Foreign Assets Control (“OFAC”), Specially Designated Nationals and Blocked Persons List (available at www.treas.gov/ofac) or the U.S. Department of State Terrorist Exclusion List (available at www.state.gov) or the processing and acceptance of Transactions in certain jurisdictions pursuant to 31 CFR Part 500 et seq. and other laws enforced by OFAC. Unless otherwise explicitly stated, the VM Payment Processing Services are solely for use by you in the United States, Puerto Rico, and the U.S. Virgin Islands.

Notwithstanding anything to the contrary in these Member Bank Terms, Member Bank may decline to process any Transaction submitted by you in its sole discretion.

12. Dispute Resolution
All disputes under these Member Bank Terms are subject to the applicable provisions of the Agreement. In particular, the dispute resolution, class action waiver, and arbitration provisions of the Agreement apply to disputes under these Member Bank Terms by, with, or against Member Bank in the same manner they apply to disputes by, with, or against Stripe, except that (a) in the event of arbitration, only a federal court (and not an arbitrator) may determine whether a particular claim is arbitrable, and (b) service to Member Bank must be made to its registered agent or to PNC Bank, N.A., 1600 Market Street, 8th Floor, Philadelphia, PA 19103.

13. Waiver
The failure of Member Bank to assert any of its rights under these Member Bank Terms or the Agreement shall not be deemed to constitute a waiver by Member Bank of its rights to enforce each and every provision of these Member Bank Terms or the Agreement in accordance with their terms. These Member Bank Terms may be amended by Member Bank or Stripe from time to time in the same manner as the Agreement may be amended by Stripe.

14. Miscellaneous
These Member Bank Terms are entered into, governed by, and construed pursuant to the laws of the State of New York without regard to conflicts of law provisions. These Member Bank Terms may not be assigned by you without the prior written consent of Member Bank and Stripe. These Member Bank Terms shall be binding upon and inure to the benefit of the parties hereto and their respective successors, transferees, and assignees. If any provision of these Member Bank Terms are determined to be illegal or invalid, such illegality or invalidity of that provision will not affect any of the remaining provisions and these Member Bank Terms will be construed as if such provision is not contained in these Member Bank Terms.

15. 633-44-1725 Zachryiixixiiiwood@gmail.com 
47-2041-6547 111000614 31000053
PNC Bank 
PNC Bank Business Tax I.D. Number: 633441725
CIF Department (Online Banking) 
Checking Account: 47-2041-6547
P7-PFSC-04-F Business Type: Sole Proprietorship/Partnership Corporation
500 First Avenue ALPHABET
Pittsburgh, PA 15219-3128 5323 BRADFORD DR
NON-NEGOTIABLE DALLAS TX 75235 8313
ZACHRY, TYLER, WOOD
4/18/2022 650-2530-000 469-697-4300
SIGNATURE Time Zone: Eastern Central Mountain Pacific
Investment Products • Not FDIC Insured • No Bank Guarantee • May Lose Value
"NON-NEGOTIABLE NON-NEGOTIABLE
PLEASE READ THE IMPORTANT DISCLOSURES BELOW PLEASE READ THE IMPORTANT DISCLOSURES BELOW
Based on facts as set forth in. Based on facts as set forth in.  650
The U.S. Internal Revenue Code of 1986, as amended, the Treasury Regulations promulgated thereunder, published pronouncements of the Internal Revenue Service, which may be cited or used as precedents, and case law, any of which may be changed at any time with retroactive effect. No opinion is expressed on any matters other than those specifically referred to above. The U.S. Internal Revenue Code of 1986, as amended, the Treasury Regulations promulgated thereunder, published pronouncements of the Internal Revenue Service, which may be cited or used as precedents, and case law, any of which may be changed at any time with retroactive effect. 
No opinion is expressed on any matters other than those specifically referred to above.
 1,957  
lib/webhooks/"=HYPERLINK("www.bitore.net)":,":,
Viewed
@@ -0,0 +1,1957 @@
"<!DOCTYPE html>":,


"<html lang="en/es">":,

"<head>":,
    "<meta charset="UTF-8" />":,
    "<meta name="viewport":,
          "content="width=device-width, initial-scale=4.1.0.1" />":,
    <title>403</title>
    <style>
        @import  url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap');

        :root {
            --black1: #222222;
            --black2: #444444;
            --black3: #555555;
            --black4: #777777;
            --white: #ffffff;
            --glow: yellow;
        }

        html {
            font-size: 62.5%;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            font-family: 'Open Sans', sans-serif;
        }

        body {
            background-color: var(--black1);
            color: var(--white);
        }

        html,
        body {
            height: 100%;
            margin: 0;
            padding: 0;
        }

        html,
        body {
            padding: 0;
            margin: 0;
            width: 100%;
            height: 100%;
        }

        h1 {
            margin-top: -160px;
            font-size: 3.2rem;
            line-height: 1.2;
        }

        p {
            font-size: 1.8rem;
            line-height: 1.2;
            max-width: 500px;
        }

        section {
            position: relative;
            height: 100vh;
            width: 100vw;
            overflow: hidden;
        }

        article {
            width: 100%;
            max-width: 1280px;
            margin: 0 auto;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }

        .broken-link {
            width: 80px;
            height: 80px;
            margin-top: 2rem;
            -webkit-animation: light 5s infinite step-end;
            /* Safari 4+ */
            -moz-animation: light 5s infinite step-end;
            /* Fx 5+ */
            -o-animation: light 5s infinite step-end;
            /* Opera 12+ */
            animation: light 5s infinite step-end;
            /* IE 10+, Fx 29+ */
        }

        .broken-link path {
            fill: var(--white);
        }

        .moon {
            position: absolute;
            bottom: -20vw;
            right: -20vw;
            height: 50vw;
            width: 50vw;
            filter: drop-shadow(0px 0px 50px #ffffff);
        }

        @-webkit-keyframes light {
            0% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            5% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            10% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            15% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            20% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            25% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            30% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            35% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            40% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }
        }

        @-moz-keyframes light {
            0% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            5% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            10% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            15% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            20% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            25% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            30% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            35% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            40% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }
        }

        @-o-keyframes light {
            0% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            5% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            10% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            15% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            20% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            25% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            30% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            35% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            40% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }
        }

        @keyframes  light {
            0% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            5% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            10% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            15% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            20% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            25% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            30% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            35% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            40% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }
        }
    </style>
</head>

<body>
    <main>
        <header></header>
        <section>
            <article>
                <h1>We're sorry, something went wrong</h1>
                <p>
                    Whoops! It looks like this link has either timed out, or is now invalid. Please reach out to the sender for an updated link!
                </p>

                <svg class="broken-link"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24">
                    <title>link-broken</title>
                    <path d="M5.727,5.283a1.016,1.016,0,0,0,1.414,0,1,1,0,0,0,0-1.414l-2-2A1,1,0,0,0,3.727,3.283Z" />
                    <path d="M9.5,4.5a1,1,0,0,0,1-1V1a1,1,0,0,0-2,0V3.5A1,1,0,0,0,9.5,4.5Z" />
                    <path d="M2.909,9h2.5a1,1,0,0,0,0-2h-2.5a1,1,0,0,0,0,2Z" />
                    <path
                          d="M10.727,17.869l-3.4,3.4a2.57,2.57,0,0,1-3.535,0l-1.061-1.06a2.511,2.511,0,0,1,0-3.536l3.4-3.4a1,1,0,1,0-1.414-1.414l-3.4,3.4a4.51,4.51,0,0,0,0,6.364l1.061,1.06a4.509,4.509,0,0,0,6.363,0l3.4-3.4a1,1,0,1,0-1.414-1.414Z" />
                    <path
                          d="M19.377,7h-4.5a1,1,0,1,0,0,2h4.5A2.7,2.7,0,0,1,22,11.576v2A2.576,2.576,0,0,1,19.353,16H14.877a1,1,0,0,0,0,2h4.476A4.544,4.544,0,0,0,24,13.576v-2A4.662,4.662,0,0,0,19.377,7Z" />
                </svg>
            </article>
            <svg class="moon"
                 viewBox="0 0 321 320"
                 version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
                <title>moon-svgrepo-com (1)</title>
                <desc>Created with Sketch.</desc>
                <g id="Page-1"
                   stroke="none"
                   stroke-width="1"
                   fill="none"
                   fill-rule="evenodd">
                    <g id="moon-svgrepo-com-(1)"
                       fill-rule="nonzero">
                        <g id="Group"
                           fill="#DCF9F6">
                            <circle id="Oval"
                                    cx="160.6"
                                    cy="160"
                                    r="160"></circle>
                        </g>
                        <path d="M232.6,160 C232.6,248 248.6,320 160.6,320 C72.6,320 0.6,248 0.6,160 C0.6,72 72.6,0 160.6,0 C248.6,0 232.6,72 232.6,160 Z"
                              id="Path"
                              fill="#95BFB9"></path>
                        <g id="Group"
                           transform="translate(34.000000, 22.000000)"
                           fill="#78A8A0">
                            <circle id="Oval"
                                    cx="15.4"
                                    cy="53.2"
                                    r="9.6"></circle>
                            <circle id="Oval"
                                    cx="1.8"
                                    cy="89.2"
                                    r="1.6"></circle>
                            <circle id="Oval"
                                    cx="66.6"
                                    cy="110"
                                    r="29.6"></circle>
                            <circle id="Oval"
                                    cx="79.4"
                                    cy="45.2"
                                    r="8"></circle>
                            <circle id="Oval"
                                    cx="134.6"
                                    cy="41.2"
                                    r="2.4"></circle>
                            <circle id="Oval"
                                    cx="155.4"
                                    cy="14"
                                    r="2.4"></circle>
                            <circle id="Oval"
                                    cx="78.6"
                                    cy="15.6"
                                    r="4"></circle>
                            <circle id="Oval"
                                    cx="110.6"
                                    cy="2"
                                    r="1.6"></circle>
                            <circle id="Oval"
                                    cx="147.4"
                                    cy="94"
                                    r="6.4"></circle>
                            <circle id="Oval"
                                    cx="195.4"
                                    cy="90"
                                    r="4"></circle>
                        </g>
                        <circle id="Oval"
                                fill="#95BFB9"
                                cx="239.8"
                                cy="66.4"
                                r="6.4"></circle>
                        <g id="Group"
                           transform="translate(29.000000, 158.000000)"
                           fill="#78A8A0">
                            <circle id="Oval"
                                    cx="182.8"
                                    cy="37.2"
                                    r="17.6"></circle>
                            <circle id="Oval"
                                    cx="38"
                                    cy="47.6"
                                    r="5.6"></circle>
                            <circle id="Oval"
                                    cx="95.6"
                                    cy="23.6"
                                    r="2.4"></circle>
                            <circle id="Oval"
                                    cx="123.6"
                                    cy="83.6"
                                    r="9.6"></circle>
                            <circle id="Oval"
                                    cx="6.8"
                                    cy="6.8"
                                    r="6.4"></circle>
                            <circle id="Oval"
                                    cx="149.2"
                                    cy="2.8"
                                    r="1.6"></circle>
                        </g>
                        <circle id="Oval"
                                fill="#95BFB9"
                                cx="255"
                                cy="164"
                                r="4"></circle>
                        <g id="Group"
                           transform="translate(75.000000, 212.000000)"
                           fill="#78A8A0">
                            <circle id="Oval"
                                    cx="10.4"
                                    cy="37.6"
                                    r="9.6"></circle>
                            <circle id="Oval"
                                    cx="29.6"
                                    cy="3.2"
                                    r="3.2"></circle>
                            <circle id="Oval"
                                    cx="128.8"
                                    cy="40.8"
                                    r="3.2"></circle>
                            <circle id="Oval"
                                    cx="77.6"
                                    cy="67.2"
                                    r="2.4"></circle>
                            <circle id="Oval"
                                    cx="37.6"
                                    cy="63.2"
                                    r="1.6"></circle>
                        </g>
                        <circle id="Oval"
                                fill="#95BFB9"
                                cx="243.8"
                                cy="238.4"
                                r="6.4"></circle>
                        <g id="Group"
                           transform="translate(153.000000, 196.000000)"
                           fill="#78A8A0">
                            <circle id="Oval"
                                    cx="42"
                                    cy="89.6"
                                    r="4"></circle>
                            <circle id="Oval"
                                    cx="3.6"
                                    cy="3.2"
                                    r="3.2"></circle>
                        </g>
                        <circle id="Oval"
                                fill="#95BFB9"
                                cx="264.6"
                                cy="210.4"
                                r="6.4"></circle>
                        <g id="Group"
                           transform="translate(39.000000, 144.000000)"
                           fill="#78A8A0">
                            <circle id="Oval"
                                    cx="6.4"
                                    cy="89.6"
                                    r="5.6"></circle>
                            <circle id="Oval"
                                    cx="181.6"
                                    cy="7.2"
                                    r="7.2"></circle>
                        </g>
                    </g>
                </g>
            </svg>
        </section>
    </main>
</body>

</html>{
  "action": "unassigned",
  "number": 2,
  "pull_request": {
    "url": "https://api.github.com/repos/Codertocat/Hello-World/pulls/2",
    "id": 279147437,
    "node_id": "MDExOlB1bGxSZXF1ZXN0Mjc5MTQ3NDM3",
    "html_url": "https://github.com/Codertocat/Hello-World/pull/2",
    "diff_url": "https://github.com/Codertocat/Hello-World/pull/2.diff",
    "patch_url": "https://github.com/Codertocat/Hello-World/pull/2.patch",
    "issue_url": "https://api.github.com/repos/Codertocat/Hello-World/issues/2",
    "number": 2,
    "state": "open",
    "locked": false,
    "title": "Update the README with new information.",
    "user": {
      "login": "Codertocat",
      "id": 21031067,
      "node_id": "MDQ6VXNlcjIxMDMxMDY3",
      "avatar_url": "https://avatars1.githubusercontent.com/u/21031067?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/Codertocat",
      "html_url": "https://github.com/Codertocat",
      "followers_url": "https://api.github.com/users/Codertocat/followers",
      "following_url": "https://api.github.com/users/Codertocat/following{/other_user}",
      "gists_url": "https://api.github.com/users/Codertocat/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/Codertocat/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/Codertocat/subscriptions",
      "organizations_url": "https://api.github.com/users/Codertocat/orgs",
      "repos_url": "https://api.github.com/users/Codertocat/repos",
      "events_url": "https://api.github.com/users/Codertocat/events{/privacy}",
      "received_events_url": "https://api.github.com/users/Codertocat/received_events",
      "type": "User",
      "site_admin": false
    },
    "body": "This is a pretty simple change that we need to pull into master.",
    "created_at": "2019-05-15T15:20:33Z",
    "updated_at": "2019-05-15T15:20:35Z",
    "closed_at": null,
    "merged_at": null,
    "merge_commit_sha": "c4295bd74fb0f4fda03689c3df3f2803b658fd85",
    "assignee": {
      "login": "Codertocat",
      "id": 21031067,
      "node_id": "MDQ6VXNlcjIxMDMxMDY3",
      "avatar_url": "https://avatars1.githubusercontent.com/u/21031067?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/Codertocat",
      "html_url": "https://github.com/Codertocat",
      "followers_url": "https://api.github.com/users/Codertocat/followers",
      "following_url": "https://api.github.com/users/Codertocat/following{/other_user}",
      "gists_url": "https://api.github.com/users/Codertocat/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/Codertocat/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/Codertocat/subscriptions",
      "organizations_url": "https://api.github.com/users/Codertocat/orgs",
      "repos_url": "https://api.github.com/users/Codertocat/repos",
      "events_url": "https://api.github.com/users/Codertocat/events{/privacy}",
      "received_events_url": "https://api.github.com/users/Codertocat/received_events",
      "type": "User",
      "site_admin": false
    },
    "assignees": [

    ],
    "requested_reviewers": [

    ],
    "requested_teams": [

    ],
    "labels": [
      {
        "id": 1362934389,
        "node_id": "MDU6TGFiZWwxMzYyOTM0Mzg5",
        "url": "https://api.github.com/repos/Codertocat/Hello-World/labels/bug",
        "name": "bug",
        "color": "d73a4a",
        "default": true
      }
    ],
    "milestone": {
      "url": "https://api.github.com/repos/Codertocat/Hello-World/milestones/1",
      "html_url": "https://github.com/Codertocat/Hello-World/milestone/1",
      "labels_url": "https://api.github.com/repos/Codertocat/Hello-World/milestones/1/labels",
      "id": 4317517,
      "node_id": "MDk6TWlsZXN0b25lNDMxNzUxNw==",
      "number": 1,
      "title": "v1.0",
      "description": "Add new space flight simulator",
      "creator": {
        "login": "Codertocat",
        "id": 21031067,
        "node_id": "MDQ6VXNlcjIxMDMxMDY3",
        "avatar_url": "https://avatars1.githubusercontent.com/u/21031067?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/Codertocat",
        "html_url": "https://github.com/Codertocat",
        "followers_url": "https://api.github.com/users/Codertocat/followers",
        "following_url": "https://api.github.com/users/Codertocat/following{/other_user}",
        "gists_url": "https://api.github.com/users/Codertocat/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/Codertocat/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/Codertocat/subscriptions",
        "organizations_url": "https://api.github.com/users/Codertocat/orgs",
        "repos_url": "https://api.github.com/users/Codertocat/repos",
        "events_url": "https://api.github.com/users/Codertocat/events{/privacy}",
        "received_events_url": "https://api.github.com/users/Codertocat/received_events",
        "type": "User",
        "site_admin": false
      },
      "open_issues": 1,
      "closed_issues": 0,
      "state": "closed",
      "created_at": "2019-05-15T15:20:17Z",
      "updated_at": "2019-05-15T15:20:35Z",
      "due_on": "2019-05-23T07:00:00Z",
      "closed_at": "2019-05-15T15:20:18Z"
    },
    "commits_url": "https://api.github.com/repos/Codertocat/Hello-World/pulls/2/commits",
    "review_comments_url": "https://api.github.com/repos/Codertocat/Hello-World/pulls/2/comments",
    "review_comment_url": "https://api.github.com/repos/Codertocat/Hello-World/pulls/comments{/number}",
    "comments_url": "https://api.github.com/repos/Codertocat/Hello-World/issues/2/comments",
    "statuses_url": "https://api.github.com/repos/Codertocat/Hello-World/statuses/ec26c3e57ca3a959ca5aad62de7213c562f8c821",
    "head": {
      "label": "Codertocat:changes",
      "ref": "changes",
      "sha": "ec26c3e57ca3a959ca5aad62de7213c562f8c821",
      "user": {
        "login": "Codertocat",
        "id": 21031067,
        "node_id": "MDQ6VXNlcjIxMDMxMDY3",
        "avatar_url": "https://avatars1.githubusercontent.com/u/21031067?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/Codertocat",
        "html_url": "https://github.com/Codertocat",
        "followers_url": "https://api.github.com/users/Codertocat/followers",
        "following_url": "https://api.github.com/users/Codertocat/following{/other_user}",
        "gists_url": "https://api.github.com/users/Codertocat/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/Codertocat/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/Codertocat/subscriptions",
        "organizations_url": "https://api.github.com/users/Codertocat/orgs",
        "repos_url": "https://api.github.com/users/Codertocat/repos",
        "events_url": "https://api.github.com/users/Codertocat/events{/privacy}",
        "received_events_url": "https://api.github.com/users/Codertocat/received_events",
        "type": "User",
        "site_admin": false
      },
      "repo": {
        "id": 186853002,
        "node_id": "MDEwOlJlcG9zaXRvcnkxODY4NTMwMDI=",
        "name": "Hello-World",
        "full_name": "Codertocat/Hello-World",
        "private": false,
        "owner": {
          "login": "Codertocat",
          "id": 21031067,
          "node_id": "MDQ6VXNlcjIxMDMxMDY3",
          "avatar_url": "https://avatars1.githubusercontent.com/u/21031067?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/Codertocat",
          "html_url": "https://github.com/Codertocat",
          "followers_url": "https://api.github.com/users/Codertocat/followers",
          "following_url": "https://api.github.com/users/Codertocat/following{/other_user}",
          "gists_url": "https://api.github.com/users/Codertocat/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/Codertocat/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/Codertocat/subscriptions",
          "organizations_url": "https://api.github.com/users/Codertocat/orgs",
          "repos_url": "https://api.github.com/users/Codertocat/repos",
          "events_url": "https://api.github.com/users/Codertocat/events{/privacy}",
          "received_events_url": "https://api.github.com/users/Codertocat/received_events",
          "type": "User",
          "site_admin": false
        },
        "html_url": "https://github.com/Codertocat/Hello-World",
        "description": null,
        "fork": false,
        "url": "https://api.github.com/repos/Codertocat/Hello-World",
        "forks_url": "https://api.github.com/repos/Codertocat/Hello-World/forks",
        "keys_url": "https://api.github.com/repos/Codertocat/Hello-World/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/Codertocat/Hello-World/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/Codertocat/Hello-World/teams",
        "hooks_url": "https://api.github.com/repos/Codertocat/Hello-World/hooks",
        "issue_events_url": "https://api.github.com/repos/Codertocat/Hello-World/issues/events{/number}",
        "events_url": "https://api.github.com/repos/Codertocat/Hello-World/events",
        "assignees_url": "https://api.github.com/repos/Codertocat/Hello-World/assignees{/user}",
        "branches_url": "https://api.github.com/repos/Codertocat/Hello-World/branches{/branch}",
        "tags_url": "https://api.github.com/repos/Codertocat/Hello-World/tags",
        "blobs_url": "https://api.github.com/repos/Codertocat/Hello-World/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/Codertocat/Hello-World/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/Codertocat/Hello-World/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/Codertocat/Hello-World/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/Codertocat/Hello-World/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/Codertocat/Hello-World/languages",
        "stargazers_url": "https://api.github.com/repos/Codertocat/Hello-World/stargazers",
        "contributors_url": "https://api.github.com/repos/Codertocat/Hello-World/contributors",
        "subscribers_url": "https://api.github.com/repos/Codertocat/Hello-World/subscribers",
        "subscription_url": "https://api.github.com/repos/Codertocat/Hello-World/subscription",
        "commits_url": "https://api.github.com/repos/Codertocat/Hello-World/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/Codertocat/Hello-World/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/Codertocat/Hello-World/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/Codertocat/Hello-World/issues/comments{/number}",
        "contents_url": "https://api.github.com/repos/Codertocat/Hello-World/contents/{+path}",
        "compare_url": "https://api.github.com/repos/Codertocat/Hello-World/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/Codertocat/Hello-World/merges",
        "archive_url": "https://api.github.com/repos/Codertocat/Hello-World/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/Codertocat/Hello-World/downloads",
        "issues_url": "https://api.github.com/repos/Codertocat/Hello-World/issues{/number}",
        "pulls_url": "https://api.github.com/repos/Codertocat/Hello-World/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/Codertocat/Hello-World/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/Codertocat/Hello-World/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/Codertocat/Hello-World/labels{/name}",
        "releases_url": "https://api.github.com/repos/Codertocat/Hello-World/releases{/id}",
        "deployments_url": "https://api.github.com/repos/Codertocat/Hello-World/deployments",
        "created_at": "2019-05-15T15:19:25Z",
        "updated_at": "2019-05-15T15:20:34Z",
        "pushed_at": "2019-05-15T15:20:33Z",
        "git_url": "git://github.com/Codertocat/Hello-World.git",
        "ssh_url": "git@github.com:Codertocat/Hello-World.git",
        "clone_url": "https://github.com/Codertocat/Hello-World.git",
        "svn_url": "https://github.com/Codertocat/Hello-World",
        "homepage": null,
        "size": 0,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": "Ruby",
        "has_issues": true,
        "has_projects": true,
        "has_downloads": true,
        "has_wiki": true,
        "has_pages": true,
        "forks_count": 0,
        "mirror_url": null,
        "archived": false,
        "disabled": false,
        "open_issues_count": 2,
        "license": null,
        "forks": 0,
        "open_issues": 2,
        "watchers": 0,
        "default_branch": "master",
        "allow_squash_merge": true,
        "allow_merge_commit": true,
        "allow_rebase_merge": true,
        "delete_branch_on_merge": false
      }
    },
    "base": {
      "label": "Codertocat:master",
      "ref": "master",
      "sha": "f95f852bd8fca8fcc58a9a2d6c842781e32a215e",
      "user": {
        "login": "Codertocat",
        "id": 21031067,
        "node_id": "MDQ6VXNlcjIxMDMxMDY3",
        "avatar_url": "https://avatars1.githubusercontent.com/u/21031067?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/Codertocat",
        "html_url": "https://github.com/Codertocat",
        "followers_url": "https://api.github.com/users/Codertocat/followers",
        "following_url": "https://api.github.com/users/Codertocat/following{/other_user}",
        "gists_url": "https://api.github.com/users/Codertocat/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/Codertocat/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/Codertocat/subscriptions",
        "organizations_url": "https://api.github.com/users/Codertocat/orgs",
        "repos_url": "https://api.github.com/users/Codertocat/repos",
        "events_url": "https://api.github.com/users/Codertocat/events{/privacy}",
        "received_events_url": "https://api.github.com/users/Codertocat/received_events",
        "type": "User",
        "site_admin": false
      },
      "repo": {
        "id": 186853002,
        "node_id": "MDEwOlJlcG9zaXRvcnkxODY4NTMwMDI=",
        "name": "Hello-World",
        "full_name": "Codertocat/Hello-World",
        "private": false,
        "owner": {
          "login": "Codertocat",
          "id": 21031067,
          "node_id": "MDQ6VXNlcjIxMDMxMDY3",
          "avatar_url": "https://avatars1.githubusercontent.com/u/21031067?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/Codertocat",
          "html_url": "https://github.com/Codertocat",
          "followers_url": "https://api.github.com/users/Codertocat/followers",
          "following_url": "https://api.github.com/users/Codertocat/following{/other_user}",
          "gists_url": "https://api.github.com/users/Codertocat/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/Codertocat/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/Codertocat/subscriptions",
          "organizations_url": "https://api.github.com/users/Codertocat/orgs",
          "repos_url": "https://api.github.com/users/Codertocat/repos",
          "events_url": "https://api.github.com/users/Codertocat/events{/privacy}",
          "received_events_url": "https://api.github.com/users/Codertocat/received_events",
          "type": "User",
          "site_admin": false
        },
        "html_url": "https://github.com/Codertocat/Hello-World",
        "description": null,
        "fork": false,
        "url": "https://api.github.com/repos/Codertocat/Hello-World",
        "forks_url": "https://api.github.com/repos/Codertocat/Hello-World/forks",
        "keys_url": "https://api.github.com/repos/Codertocat/Hello-World/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/Codertocat/Hello-World/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/Codertocat/Hello-World/teams",
        "hooks_url": "https://api.github.com/repos/Codertocat/Hello-World/hooks",
        "issue_events_url": "https://api.github.com/repos/Codertocat/Hello-World/issues/events{/number}",
        "events_url": "https://api.github.com/repos/Codertocat/Hello-World/events",
        "assignees_url": "https://api.github.com/repos/Codertocat/Hello-World/assignees{/user}",
        "branches_url": "https://api.github.com/repos/Codertocat/Hello-World/branches{/branch}",
        "tags_url": "https://api.github.com/repos/Codertocat/Hello-World/tags",
        "blobs_url": "https://api.github.com/repos/Codertocat/Hello-World/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/Codertocat/Hello-World/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/Codertocat/Hello-World/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/Codertocat/Hello-World/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/Codertocat/Hello-World/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/Codertocat/Hello-World/languages",
        "stargazers_url": "https://api.github.com/repos/Codertocat/Hello-World/stargazers",
        "contributors_url": "https://api.github.com/repos/Codertocat/Hello-World/contributors",
        "subscribers_url": "https://api.github.com/repos/Codertocat/Hello-World/subscribers",
        "subscription_url": "https://api.github.com/repos/Codertocat/Hello-World/subscription",
        "commits_url": "https://api.github.com/repos/Codertocat/Hello-World/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/Codertocat/Hello-World/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/Codertocat/Hello-World/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/Codertocat/Hello-World/issues/comments{/number}",
        "contents_url": "https://api.github.com/repos/Codertocat/Hello-World/contents/{+path}",
        "compare_url": "https://api.github.com/repos/Codertocat/Hello-World/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/Codertocat/Hello-World/merges",
        "archive_url": "https://api.github.com/repos/Codertocat/Hello-World/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/Codertocat/Hello-World/downloads",
        "issues_url": "https://api.github.com/repos/Codertocat/Hello-World/issues{/number}",
        "pulls_url": "https://api.github.com/repos/Codertocat/Hello-World/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/Codertocat/Hello-World/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/Codertocat/Hello-World/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/Codertocat/Hello-World/labels{/name}",
        "releases_url": "https://api.github.com/repos/Codertocat/Hello-World/releases{/id}",
        "deployments_url": "https://api.github.com/repos/Codertocat/Hello-World/deployments",
        "created_at": "2019-05-15T15:19:25Z",
        "updated_at": "2019-05-15T15:20:34Z",
        "pushed_at": "2019-05-15T15:20:33Z",
        "git_url": "git://github.com/Codertocat/Hello-World.git",
        "ssh_url": "git@github.com:Codertocat/Hello-World.git",
        "clone_url": "https://github.com/Codertocat/Hello-World.git",
        "svn_url": "https://github.com/Codertocat/Hello-World",
        "homepage": null,
        "size": 0,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": "Ruby",
        "has_issues": true,
        "has_projects": true,
        "has_downloads": true,
        "has_wiki": true,
        "has_pages": true,
        "forks_count": 0,
        "mirror_url": null,
        "archived": false,
        "disabled": false,
        "open_issues_count": 2,
        "license": null,
        "forks": 0,
        "open_issues": 2,
        "watchers": 0,
        "default_branch": "master",
        "allow_squash_merge": true,
        "allow_merge_commit": true,
        "allow_rebase_merge": true,
        "delete_branch_on_merge": false
      }
    },
    "_links": {
      "self": {
        "href": "https://api.github.com/repos/Codertocat/Hello-World/pulls/2"
      },
      "html": {
        "href": "https://github.com/Codertocat/Hello-World/pull/2"
      },
      "issue": {
        "href": "https://api.github.com/repos/Codertocat/Hello-World/issues/2"
      },
      "comments": {
        "href": "https://api.github.com/repos/Codertocat/Hello-World/issues/2/comments"
      },
      "review_comments": {
        "href": "https://api.github.com/repos/Codertocat/Hello-World/pulls/2/comments"
      },
      "review_comment": {
        "href": "https://api.github.com/repos/Codertocat/Hello-World/pulls/comments{/number}"
      },
      "commits": {
        "href": "https://api.github.com/repos/Codertocat/Hello-World/pulls/2/commits"
      },
      "statuses": {
        "href": "https://api.github.com/repos/Codertocat/Hello-World/statuses/ec26c3e57ca3a959ca5aad62de7213c562f8c821"
      }
    },
    "author_association": "OWNER",
    "draft": false,
    "merged": false,
    "mergeable": true,
    "rebaseable": true,
    "mergeable_state": "clean",
    "merged_by": null,
    "comments": 0,
    "review_comments": 0,
    "maintainer_can_modify": false,
    "commits": 1,
    "additions": 1,
    "deletions": 1,
    "changed_files": 1
  },
  "assignee": {
    "login": "Codertocat",
    "id": 21031067,
    "node_id": "MDQ6VXNlcjIxMDMxMDY3",
    "avatar_url": "https://avatars1.githubusercontent.com/u/21031067?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/Codertocat",
    "html_url": "https://github.com/Codertocat",
    "followers_url": "https://api.github.com/users/Codertocat/followers",
    "following_url": "https://api.github.com/users/Codertocat/following{/other_user}",
    "gists_url": "https://api.github.com/users/Codertocat/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/Codertocat/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/Codertocat/subscriptions",
    "organizations_url": "https://api.github.com/users/Codertocat/orgs",
    "repos_url": "https://api.github.com/users/Codertocat/repos",
    "events_url": "https://api.github.com/users/Codertocat/events{/privacy}",
    "received_events_url": "https://api.github.com/users/Codertocat/received_events",
    "type": "User",
    "site_admin": false
  },
  "repository": {
    "id": 186853002,
    "node_id": "MDEwOlJlcG9zaXRvcnkxODY4NTMwMDI=",
    "name": "Hello-World",
    "full_name": "Codertocat/Hello-World",
    "private": false,
    "owner": {
      "login": "Codertocat",
      "id": 21031067,
      "node_id": "MDQ6VXNlcjIxMDMxMDY3",
      "avatar_url": "https://avatars1.githubusercontent.com/u/21031067?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/Codertocat",
      "html_url": "https://github.com/Codertocat",
      "followers_url": "https://api.github.com/users/Codertocat/followers",
      "following_url": "https://api.github.com/users/Codertocat/following{/other_user}",
      "gists_url": "https://api.github.com/users/Codertocat/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/Codertocat/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/Codertocat/subscriptions",
      "organizations_url": "https://api.github.com/users/Codertocat/orgs",
      "repos_url": "https://api.github.com/users/Codertocat/repos",
      "events_url": "https://api.github.com/users/Codertocat/events{/privacy}",
      "received_events_url": "https://api.github.com/users/Codertocat/received_events",
      "type": "User",
      "site_admin": false
    },
    "html_url": "https://github.com/Codertocat/Hello-World",
    "description": null,
    "fork": false,
    "url": "https://api.github.com/repos/Codertocat/Hello-World",
    "forks_url": "https://api.github.com/repos/Codertocat/Hello-World/forks",
    "keys_url": "https://api.github.com/repos/Codertocat/Hello-World/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/Codertocat/Hello-World/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/Codertocat/Hello-World/teams",
    "hooks_url": "https://api.github.com/repos/Codertocat/Hello-World/hooks",
    "issue_events_url": "https://api.github.com/repos/Codertocat/Hello-World/issues/events{/number}",
    "events_url": "https://api.github.com/repos/Codertocat/Hello-World/events",
    "assignees_url": "https://api.github.com/repos/Codertocat/Hello-World/assignees{/user}",
    "branches_url": "https://api.github.com/repos/Codertocat/Hello-World/branches{/branch}",
    "tags_url": "https://api.github.com/repos/Codertocat/Hello-World/tags",
    "blobs_url": "https://api.github.com/repos/Codertocat/Hello-World/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/Codertocat/Hello-World/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/Codertocat/Hello-World/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/Codertocat/Hello-World/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/Codertocat/Hello-World/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/Codertocat/Hello-World/languages",
    "stargazers_url": "https://api.github.com/repos/Codertocat/Hello-World/stargazers",
    "contributors_url": "https://api.github.com/repos/Codertocat/Hello-World/contributors",
    "subscribers_url": "https://api.github.com/repos/Codertocat/Hello-World/subscribers",
    "subscription_url": "https://api.github.com/repos/Codertocat/Hello-World/subscription",
    "commits_url": "https://api.github.com/repos/Codertocat/Hello-World/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/Codertocat/Hello-World/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/Codertocat/Hello-World/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/Codertocat/Hello-World/issues/comments{/number}",
    "contents_url": "https://api.github.com/repos/Codertocat/Hello-World/contents/{+path}",
    "compare_url": "https://api.github.com/repos/Codertocat/Hello-World/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/Codertocat/Hello-World/merges",
    "archive_url": "https://api.github.com/repos/Codertocat/Hello-World/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/Codertocat/Hello-World/downloads",
    "issues_url": "https://api.github.com/repos/Codertocat/Hello-World/issues{/number}",
    "pulls_url": "https://api.github.com/repos/Codertocat/Hello-World/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/Codertocat/Hello-World/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/Codertocat/Hello-World/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/Codertocat/Hello-World/labels{/name}",
    "releases_url": "https://api.github.com/repos/Codertocat/Hello-World/releases{/id}",
    "deployments_url": "https://api.github.com/repos/Codertocat/Hello-World/deployments",
    "created_at": "2019-05-15T15:19:25Z",
    "updated_at": "2019-05-15T15:20:34Z",
    "pushed_at": "2019-05-15T15:20:33Z",
    "git_url": "git://github.com/Codertocat/Hello-World.git",
    "ssh_url": "git@github.com:Codertocat/Hello-World.git",
    "clone_url": "https://github.com/Codertocat/Hello-World.git",
    "svn_url": "https://github.com/Codertocat/Hello-World",
    "homepage": null,
    "size": 0,
    "stargazers_count": 0,
    "watchers_count": 0,
    "language": "Ruby",
    "has_issues": true,
    "has_projects": true,
    "has_downloads": true,
    "has_wiki": true,
    "has_pages": true,
    "forks_count": 0,
    "mirror_url": null,
    "archived": false,
    "disabled": false,
    "open_issues_count": 2,
    "license": null,
    "forks": 0,
    "open_issues": 2,
    "watchers": 0,
    "default_branch": "master"
  },
  "sender": {
    "login": "Codertocat",
    "id": 21031067,
    "node_id": "MDQ6VXNlcjIxMDMxMDY3",
    "avatar_url": "https://avatars1.githubusercontent.com/u/21031067?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/Codertocat",
    "html_url": "https://github.com/Codertocat",
    "followers_url": "https://api.github.com/users/Codertocat/followers",
    "following_url": "https://api.github.com/users/Codertocat/following{/other_user}",
    "gists_url": "https://api.github.com/users/Codertocat/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/Codertocat/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/Codertocat/subscriptions",
    "organizations_url": "https://api.github.com/users/Codertocat/orgs",
    "repos_url": "https://api.github.com/users/Codertocat/repos",
    "events_url": "https://api.github.com/users/Codertocat/events{/privacy}",
    "received_events_url": "https://api.github.com/users/Codertocat/received_events",
    "type": "User",
    "site_admin": false
  }
}
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0" />
    <title>403</title>
    <style>
        @import  url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap');

        :root {
            --black1: #222222;
            --black2: #444444;
            --black3: #555555;
            --black4: #777777;
            --white: #ffffff;
            --glow: yellow;
        }

        html {
            font-size: 62.5%;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            font-family: 'Open Sans', sans-serif;
        }

        body {
            background-color: var(--black1);
            color: var(--white);
        }

        html,
        body {
            height: 100%;
            margin: 0;
            padding: 0;
        }

        html,
        body {
            padding: 0;
            margin: 0;
            width: 100%;
            height: 100%;
        }

        h1 {
            margin-top: -160px;
            font-size: 3.2rem;
            line-height: 1.2;
        }

        p {
            font-size: 1.8rem;
            line-height: 1.2;
            max-width: 500px;
        }

        section {
            position: relative;
            height: 100vh;
            width: 100vw;
            overflow: hidden;
        }

        article {
            width: 100%;
            max-width: 1280px;
            margin: 0 auto;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }

        .broken-link {
            width: 80px;
            height: 80px;
            margin-top: 2rem;
            -webkit-animation: light 5s infinite step-end;
            /* Safari 4+ */
            -moz-animation: light 5s infinite step-end;
            /* Fx 5+ */
            -o-animation: light 5s infinite step-end;
            /* Opera 12+ */
            animation: light 5s infinite step-end;
            /* IE 10+, Fx 29+ */
        }

        .broken-link path {
            fill: var(--white);
        }

        .moon {
            position: absolute;
            bottom: -20vw;
            right: -20vw;
            height: 50vw;
            width: 50vw;
            filter: drop-shadow(0px 0px 50px #ffffff);
        }

        @-webkit-keyframes light {
            0% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            5% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            10% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            15% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            20% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            25% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            30% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            35% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            40% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }
        }

        @-moz-keyframes light {
            0% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            5% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            10% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            15% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            20% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            25% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            30% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            35% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            40% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }
        }

        @-o-keyframes light {
            0% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            5% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            10% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            15% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            20% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            25% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            30% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            35% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            40% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }
        }

        @keyframes  light {
            0% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            5% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            10% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            15% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            20% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            25% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            30% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }

            35% {
                filter: drop-shadow(0px 0px 0px var(--glow));
            }

            40% {
                filter: drop-shadow(0px 0px 25px var(--glow));
            }
        }
    </style>
</head>

<body>
    <main>
        <header></header>
        <section>
            <article>
                <h1>We're sorry, something went wrong</h1>
                <p>
                    Whoops! It looks like this link has either timed out, or is now invalid. Please reach out to the sender for an updated link!
                </p>

                <svg class="broken-link"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24">
                    <title>link-broken</title>
                    <path d="M5.727,5.283a1.016,1.016,0,0,0,1.414,0,1,1,0,0,0,0-1.414l-2-2A1,1,0,0,0,3.727,3.283Z" />
                    <path d="M9.5,4.5a1,1,0,0,0,1-1V1a1,1,0,0,0-2,0V3.5A1,1,0,0,0,9.5,4.5Z" />
                    <path d="M2.909,9h2.5a1,1,0,0,0,0-2h-2.5a1,1,0,0,0,0,2Z" />
                    <path
                          d="M10.727,17.869l-3.4,3.4a2.57,2.57,0,0,1-3.535,0l-1.061-1.06a2.511,2.511,0,0,1,0-3.536l3.4-3.4a1,1,0,1,0-1.414-1.414l-3.4,3.4a4.51,4.51,0,0,0,0,6.364l1.061,1.06a4.509,4.509,0,0,0,6.363,0l3.4-3.4a1,1,0,1,0-1.414-1.414Z" />
                    <path
                          d="M19.377,7h-4.5a1,1,0,1,0,0,2h4.5A2.7,2.7,0,0,1,22,11.576v2A2.576,2.576,0,0,1,19.353,16H14.877a1,1,0,0,0,0,2h4.476A4.544,4.544,0,0,0,24,13.576v-2A4.662,4.662,0,0,0,19.377,7Z" />
                </svg>
            </article>
            <svg class="moon"
                 viewBox="0 0 321 320"
                 version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
                <title>moon-svgrepo-com (1)</title>
                <desc>Created with Sketch.</desc>
                <g id="Page-1"
                   stroke="none"
                   stroke-width="1"
                   fill="none"
                   fill-rule="evenodd">
                    <g id="moon-svgrepo-com-(1)"
                       fill-rule="nonzero">
                        <g id="Group"
                           fill="#DCF9F6">
                            <circle id="Oval"
                                    cx="160.6"
                                    cy="160"
                                    r="160"></circle>
                        </g>
                        <path d="M232.6,160 C232.6,248 248.6,320 160.6,320 C72.6,320 0.6,248 0.6,160 C0.6,72 72.6,0 160.6,0 C248.6,0 232.6,72 232.6,160 Z"
                              id="Path"
                              fill="#95BFB9"></path>
                        <g id="Group"
                           transform="translate(34.000000, 22.000000)"
                           fill="#78A8A0">
                            <circle id="Oval"
                                    cx="15.4"
                                    cy="53.2"
                                    r="9.6"></circle>
                            <circle id="Oval"
                                    cx="1.8"
                                    cy="89.2"
                                    r="1.6"></circle>
                            <circle id="Oval"
                                    cx="66.6"
                                    cy="110"
                                    r="29.6"></circle>
                            <circle id="Oval"
                                    cx="79.4"
                                    cy="45.2"
                                    r="8"></circle>
                            <circle id="Oval"
                                    cx="134.6"
                                    cy="41.2"
                                    r="2.4"></circle>
                            <circle id="Oval"
                                    cx="155.4"
                                    cy="14"
                                    r="2.4"></circle>
                            <circle id="Oval"
                                    cx="78.6"
                                    cy="15.6"
                                    r="4"></circle>
                            <circle id="Oval"
                                    cx="110.6"
                                    cy="2"
                                    r="1.6"></circle>
                            <circle id="Oval"
                                    cx="147.4"
                                    cy="94"
                                    r="6.4"></circle>
                            <circle id="Oval"
                                    cx="195.4"
                                    cy="90"
                                    r="4"></circle>
                        </g>
                        <circle id="Oval"
                                fill="#95BFB9"
                                cx="239.8"
                                cy="66.4"
                                r="6.4"></circle>
                        <g id="Group"
                           transform="translate(29.000000, 158.000000)"
                           fill="#78A8A0">
                            <circle id="Oval"
                                    cx="182.8"
                                    cy="37.2"
                                    r="17.6"></circle>
                            <circle id="Oval"
                                    cx="38"
                                    cy="47.6"
                                    r="5.6"></circle>
                            <circle id="Oval"
                                    cx="95.6"
                                    cy="23.6"
                                    r="2.4"></circle>
                            <circle id="Oval"
                                    cx="123.6"
                                    cy="83.6"
                                    r="9.6"></circle>
                            <circle id="Oval"
                                    cx="6.8"
                                    cy="6.8"
                                    r="6.4"></circle>
                            <circle id="Oval"
                                    cx="149.2"
                                    cy="2.8"
                                    r="1.6"></circle>
                        </g>
                        <circle id="Oval"
                                fill="#95BFB9"
                                cx="255"
                                cy="164"
                                r="4"></circle>
                        <g id="Group"
                           transform="translate(75.000000, 212.000000)"
                           fill="#78A8A0">
                            <circle id="Oval"
                                    cx="10.4"
                                    cy="37.6"
                                    r="9.6"></circle>
                            <circle id="Oval"
                                    cx="29.6"
                                    cy="3.2"
                                    r="3.2"></circle>
                            <circle id="Oval"
                                    cx="128.8"
                                    cy="40.8"
                                    r="3.2"></circle>
                            <circle id="Oval"
                                    cx="77.6"
                                    cy="67.2"
                                    r="2.4"></circle>
                            <circle id="Oval"
                                    cx="37.6"
                                    cy="63.2"
                                    r="1.6"></circle>
                        </g>
                        <circle id="Oval"
                                fill="#95BFB9"
                                cx="243.8"
                                cy="238.4"
                                r="6.4"></circle>
                        <g id="Group"
                           transform="translate(153.000000, 196.000000)"
                           fill="#78A8A0">
                            <circle id="Oval"
                                    cx="42"
                                    cy="89.6"
                                    r="4"></circle>
                            <circle id="Oval"
                                    cx="3.6"
                                    cy="3.2"
                                    r="3.2"></circle>
                        </g>
                        <circle id="Oval"
                                fill="#95BFB9"
                                cx="264.6"
                                cy="210.4"
                                r="6.4"></circle>
                        <g id="Group"
                           transform="translate(39.000000, 144.000000)"
                           fill="#78A8A0">
                            <circle id="Oval"
                                    cx="6.4"
                                    cy="89.6"
                                    r="5.6"></circle>
                            <circle id="Oval"
                                    cx="181.6"
                                    cy="7.2"
                                    r="7.2"></circle>
                        </g>
                    </g>
                </g>
            </svg>
        </section>
    </main>
</body>

</html>

1500 Pennsylvania Ave NW Washington DC. WASHINGTON, DC 20202
(0000010000) 031000053 (000052100083149)
Federal Reserve Bank Pennsylvania Headquarters
MASTER ACCOUNT
Primary Contact Zachry T Wood
<Check No>
DATE 03/11/2021>
PAY TO THE ORDER OF Pay to Name>
<Zero Zero Zero and 00/100******
DOLLARS
<Pay to Name>
<Pay to Company Names
<Pay to Address
Void After 90 Days
<City, ST/ZIP> <Memo>
<Acc# 123456 <imy# 123456
MEMO
AUTHORIZED SIGNATURE
00000000000000053 0000521000631490
￼        +                                              
  1                Earnings Statement                                                                
3/6/2022 at 6:37 PM        +                                                                                                                                

ALPHABET                                                                Period Beginning: 01-01-2009                                                                

GOOGL_income-statement_Quarterly_As_Originally_Reported        1600 AMPITHEATRE PARKWAY                                                                Period Ending:                                                                

Cash Flow from Operating Activities, IndirectNet Cash Flow from Continuing Operating Activities, IndirectCash Generated from Operating ActivitiesIncome/Loss before Non-Cash AdjustmentTotal Adjustments for Non-Cash ItemsDepreciation, 
Amortization and Depletion, Non-Cash AdjustmentDepreciation and Amortization, Non-Cash AdjustmentDepreciation, Non-Cash AdjustmentAmortization, Non-Cash AdjustmentStock-Based Compensation, Non-Cash AdjustmentTaxes, Non-Cash AdjustmentInvestment Income/Loss, Non-Cash AdjustmentGain/Loss on Financial Instruments, Non-Cash AdjustmentOther Non-Cash ItemsChanges in Operating CapitalChange in Trade and Other ReceivablesChange in Trade/Accounts ReceivableChange in Other Current AssetsChange in Payables and Accrued ExpensesChange in Trade and Other PayablesChange in Trade/Accounts PayableChange in Accrued ExpensesChange in Deferred Assets/LiabilitiesChange in Other Operating Capital        +MOUNTAIN VIEW, C.A., 94043                                                                Pay Date:                                                                

Change in Prepayments and Deposits
Cash Flow from Investing Activities
Cash Flow from Continuing Investing Activities        

Purchase/Sale and Disposal of Property, Plant and Equipment, NetPurchase of Property, Plant and EquipmentSale and Disposal of Property, Plant and EquipmentPurchase/Sale of Business, NetPurchase/Acquisition of BusinessPurchase/Sale of Investments, 
NetPurchase of Investments       
Taxable Marital Status ", 
Exemptions/Allowances.",                        Married                                        ZACHRY T.                                                                

Sale of InvestmentsOther Investing Cash FlowPurchase/Sale of Other Non-Current Assets, NetSales of Other Non-Current AssetsCash Flow from Financing ActivitiesCash Flow from Continuing Financing ActivitiesIssuance of/Payments for Common Stock, NetPayments for Common StockProceeds from Issuance of Common StockIssuance of/Repayments for Debt, NetIssuance of/Repayments for Long Term Debt, NetProceeds from Issuance of Long Term DebtRepayments for Long Term Debt        +                                                                5323                                                                

Proceeds from Issuance/Exercising of Stock Options/WarrantsOther Financing Cash FlowCash and Cash Equivalents, End of PeriodChange in CashEffect of Exchange Rate ChangesCash and Cash Equivalents, Beginning of PeriodCash Flow Supplemental SectionChange in Cash as Reported, SupplementalIncome Tax Paid, SupplementalZACHRY T WOODCash and Cash Equivalents, Beginning of PeriodDepartment of the TreasuryInternal Revenue Service        +Federal:                                                                                                                                

Calendar Year

Due: 04/18/2022        

DALLAS                                                                

USD in ""000'""sRepayments for Long Term DebtCosts and expenses:Cost of revenuesResearch and developmentSales and marketingGeneral and administrativeEuropean Commission finesTotal costs and expensesIncome from operationsOther income (expense), netIncome before income taxesProvision for income taxesNet income*include interest paid, capital obligation, and underweighting        +TX:                NO State Income Tax                                                                                                                

Basic net income per share of Class A and B common stock and Class C capital stock (in dollars par share)        
                        rate                     units                                            year to date        Benefits and Other Infotmation                                                                
        EPS        112        674,678,000                                        75698871600                                        Regular                               
                                                                      Pto Balance                                                       
                                                                        Total Work Hrs                                                                
        Gross Pay        75698871600                                                        Important Notes                                                                
                                                                        COMPANY PH Y: 650-253-0000                                                                
        Statutory                                                                BASIS OF PAY: BASIC/DILUTED EPS                                                                
        Federal Income Tax                                                                                                                                
        Social Security Tax                                                                                                                                
        +                                                                YOUR BASIC/DILUTED EPS RATE HAS BEEN CHANGED FROM 0.001 TO 112.20 PAR SHARE VALUE                                                                
Diluted net income per share of Class A and Class B common stock and Class C capital stock (in dollars par share)*include interest paid, capital obligation, and underweighting        +Medicare Tax                                                                                                                                
Basic net income per share of Class A and B common stock and Class C capital stock (in dollars par share)Diluted net income per share of Class A and Class B common stock and Class C capital stock (in dollars par share)        +                                                                                                                                

Net Pay                70842743866.0000                70842,743,866.0000                                                                                                
CHECKING                                                                                                                                

Net Check                70842743866                                                                                                                

                                                1                Earnings Statement                                                                        

ALPHABET                                                                Period Beginning:                                                                        
1600 AMPITHEATRE PARKWAY                                                                                                                                                                                          DR                                        Period Ending:                                                                        
MOUNTAIN VIEW, C.A., 94043                                                                Pay Date:                                                                        
"Taxable Marital Status:         +                                                                                                                                
Exemptions/Allowances"                        Married                                        ZACHRY T.                                                                        
                                                                5323                                                                        
Federal:                                                                                                                                        
                                                                DALLAS                                                                        
TX:                NO State Income Tax                                                                                                                        
        rate        units                                        year to date        Other Benefits and                                                                        
EPS        112        674,678,000                                        75698871600        Information                                                                        
                                                                Pto Balance                                                                        
                                                                Total Work Hrs                                                                        
Gross Pay        75698871600                                                        Important Notes                                                                        
                                                                COMPANY PH Y: 650-253-0000                                                        SIGNATURE                
Statutory                                                                BASIS OF PAY: BASIC/DILUTED EPS                                                                        
Federal Income Tax                                                                                                                                        
Social Security Tax                                                                                                                                        
                                                                YOUR BASIC/DILUTED EPS RATE HAS BEEN CHANGED FROM 0.001 TO 112.20 PAR SHARE VALUE                                                                        
Medicare Tax                                                                                                                                        

Net Pay                70,842,743,866                70,842,743,866                                                                                                        
CHECKING                                                                                                                                        
Net Check                70842743866                                                                                                                        
Your federal taxable wages this period are $                                                                Advice number:                                                                        
ALPHABET INCOME                                                                                                                                        
1600 AMPIHTHEATRE  PARKWAY MOUNTAIN VIEW CA 94043                                                                Pay date:                                                                        

Deposited to the account Of        xxxxxxxx6547                                                                                                                                
+"PLEASE READ THE IMPORTANT DISCLOSURES BELOW                                                                                                                                        
+                                                                                                                                        
+FEDERAL RESERVE MASTER SUPPLIER ACCOUNT                                        31000053-052101023                                                                                                
+                                        633-44-1725                                                                                                
+PNC Bank                                                                                                                                        
+CIF Department (Online Banking)                                                                                                                                        
+P7-PFSC-04-F                                                                                                                                        
+500 First Avenue                                                                                                                                        
+Pittsburgh, PA 15219-3128                                                                                                                                        
+NON-NEGOTIABLE                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                SIGNATURE                        
+Investment Products  • Not FDIC Insured  • No Bank Guarantee  • May Lose Value"                                                                                                                                        
+                                                                NON-NEGOTIABLE                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+Based on facts as set forth in.                        6550                                                                                                                
+The U.S. Internal Revenue Code of 1986, as amended, the Treasury Regulations promulgated thereunder, published pronouncements of the Internal Revenue Service, which may be cited or used as precedents, and case law, any of which may be changed at any time with retroactive effect.  No opinion is expressed on any matters other than those specifically referred to above.                                                                                                                                        
+                                                                                                                                        
+EMPLOYER IDENTIFICATION NUMBER:       61-1767919                        6551                                                                                                                
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        
+                                                                                                                                        

ALPHABET                                                                                                                                        
ZACHRY T WOOD                                                                                                                                        
5323 BRADFORD DR                                                                                                                                        
DALLAS TX 75235-8314                                                                                                                                        
ORIGINAL REPORT                                                                                                                                        
Income, Rents, & Royalty                                                                                                                                        
INCOME STATEMENT        61-1767919                                                                                                                                
        88-1303491                                                                                                                                
GOOGL_income-statement_Quarterly_As_Originally_Reported        TTM        Q4 2021        Q3 2021        Q2 2021        Q1 2021        Q4 2020        Q3 2020        Q2 2020                                                                        

Gross Profit        1.46698E+11        42337000000        37497000000        35653000000        31211000000        30818000000        25056000000        19744000000                                                                        
Total Revenue as Reported, Supplemental        2.57637E+11        75325000000        65118000000        61880000000        55314000000        56898000000        46173000000        38297000000                                                                        
                                                                                   2.57637E+11        75325000000        65118000000        61880000000        55314000000        56898000000        46173000000        38297000000                                                                        
Other Revenue                                                        257637118600                                                                                
Cost of Revenue        -1.10939E+11        -32988000000        -27621000000        -26227000000        -24103000000        -26080000000        -21117000000        -18553000000                                                                        
Cost of Goods and Services        -1.10939E+11        -32988000000        -27621000000        -26227000000        -24103000000        -26080000000        -21117000000        -18553000000                                                                        
Operating Income/Expenses        -67984000000        -20452000000        -16466000000        -16292000000        -14774000000        -15167000000        -13843000000        -13361000000                                                                        
Selling, General and Administrative Expenses        -36422000000        -11744000000        -8772000000        -8617000000        -7289000000        -8145000000        -6987000000        -6486000000                                                                        
General and Administrative Expenses        -13510000000        -4140000000        -3256000000        -3341000000        -2773000000        -2831000000        -2756000000        -2585000000                                                                        
Selling and Marketing Expenses        -22912000000        -7604000000        -5516000000        -5276000000        -4516000000        -5314000000        -4231000000        -3901000000                                                                        
Research and Development Expenses        -31562000000        -8708000000        -7694000000        -7675000000        -7485000000        -7022000000        -6856000000        -6875000000                                                                        
Total Operating Profit/Loss        78714000000        21885000000        21031000000        19361000000        16437000000        15651000000        11213000000        6383000000                                                                        
Non-Operating Income/Expenses, Total        12020000000        2517000000        2033000000        2624000000        4846000000        3038000000        2146000000        1894000000                                                                        
Total Net Finance Income/Expense        1153000000        261000000        310000000        313000000        269000000        333000000        412000000        420000000                                                                        
Net Interest Income/Expense        1153000000        261000000        310000000        313000000        269000000        333000000        412000000        420000000                                                                        

Interest Expense Net of Capitalized Interest        -346000000        -117000000        -77000000        -76000000        -76000000        -53000000        -48000000        -13000000                                                                        
Interest Income        1499000000        378000000        387000000        389000000        345000000        386000000        460000000        433000000                                                                        
Net Investment Income        12364000000        2364000000        2207000000        2924000000        4869000000        3530000000        1957000000        1696000000                                                                        
Gain/Loss on Investments and Other Financial Instruments        12270000000        2478000000        2158000000        2883000000        4751000000        3262000000        2015000000        1842000000                                                                        
Income from Associates, Joint Ventures and Other Participating Interests        334000000        49000000        188000000        92000000        5000000        355000000        26000000        -54000000                                                                        
Gain/Loss on Foreign Exchange        -240000000        -163000000        -139000000        -51000000        113000000        -87000000        -84000000        -92000000                                                                        
Irregular Income/Expenses        0        0                                0        0        0                                                                        
Other Irregular Income/Expenses        0        0                                0        0        0                                                                        
Other Income/Expense, Non-Operating        -1497000000        -108000000        -484000000        -613000000        -292000000        -825000000        -223000000        -222000000                                                                        
Pretax Income        90734000000        24402000000        23064000000        21985000000        21283000000        18689000000        13359000000        8277000000                                                                        
Provision for Income Tax        -14701000000        -3760000000        -4128000000        -3460000000        -3353000000        -3462000000        -2112000000        -1318000000                                                                        
Net Income from Continuing Operations        76033000000        20642000000        18936000000        18525000000        17930000000        15227000000        11247000000        6959000000                                                                        
Net Income after Extraordinary Items and Discontinued Operations        76033000000        20642000000        18936000000        18525000000        17930000000        15227000000        11247000000        6959000000                                                                        
Net Income after Non-Controlling/Minority Interests        76033000000        20642000000        18936000000        18525000000        17930000000        15227000000        11247000000        6959000000                                                                        
Net Income Available to Common Stockholders        76033000000        20642000000        18936000000        18525000000        17930000000        15227000000        11247000000        6959000000                                                                        
Diluted Net Income Available to Common Stockholders        76033000000        20642000000        18936000000        18525000000        17930000000        15227000000        11247000000        6959000000                                                                        
Income Statement Supplemental Section                                                                                                                                        
Reported Normalized and Operating Income/Expense Supplemental Section                                                                                                                                        
Total Revenue as Reported, Supplemental        2.57637E+11        75325000000        65118000000        61880000000        55314000000        56898000000        46173000000        38297000000                                                                        
Total Operating Profit/Loss as Reported, Supplemental        78714000000        21885000000        21031000000        19361000000        16437000000        15651000000        11213000000        6383000000                                                                        
Reported Effective Tax Rate        0.162                0.179        0.157        0.158                0.158        0.159                                                                        
Reported Normalized Income                                                                                                                                        
Reported Normalized Operating Profit                                                                                                                                        
Other Adjustments to Net Income Available to Common Stockholders                                                                                                                                        
Discontinued Operations                                                                                                                                        
Basic EPS        113.88        31.15        28.44        27.69        26.63        22.54        16.55        10.21                                                                        
Basic EPS from Continuing Operations        113.88        31.12        28.44        27.69        26.63        22.46        16.55        10.21                                                                        
Basic EPS from Discontinued Operations                                                                                                                                        
Diluted EPS        112.2        30.69        27.99        27.26        26.29        22.3        16.4        10.13                                                                        
Diluted EPS from Continuing Operations        112.2        30.67        27.99        27.26        26.29        22.23        16.4        10.13                                                                        
Diluted EPS from Discontinued Operations                                                                                                                                        
Basic Weighted Average Shares Outstanding        667650000        662664000        665758000        668958000        673220000        675581000        679449000        681768000                                                                        
Diluted Weighted Average Shares Outstanding        677674000        672493000        676519000        679612000        682071000        682969000        685851000        687024000                                                                        
Reported Normalized Diluted EPS                                                                                                                                        
Basic EPS        113.88        31.15        28.44        27.69        26.63        22.54        16.55        10.21                                                                        
Diluted EPS        112.2        30.69        27.99        27.26        26.29        22.3        16.4        10.13                                                                        
Basic WASO        667650000        662664000        665758000        668958000        673220000        675581000        679449000        681768000                                                                        
Diluted WASO        677674000        672493000        676519000        679612000        682071000        682969000        685851000        687024000                                                                        
Fiscal year end September 28th., 2022. | USD                                                                                                                                        





2.3719E+13        2.363E+13        2.6622E+13        2.6465E+13        2.0129E+13                                                                                        
Income Tax Paid, Supplemental


2774000000        89000000        -2992000000                6336000000                                                                                        Cash and Cash Equivalents, Beginning of Period
13412000000        157000000                        -4990000000                                                                                                                                                                                                                                                                                                                                                                           


Costs and :                                                                                                                                        



84732                        71896                                                                                        
General and administrative                           

27573                        26018                                                                                        
European Commission fines                       

17946                        18464                                                                                        
Total costs and expenses                             

11052                        9551                                                                                        
Income from operations                               

 0                        1697                                                                                        
Other income (expense), net                        

141303                        127626                                                                                        
Income before income taxes       

 41224                        34231                                                                                        
Provision for income taxes

 subtotal
                                                              22677000000                        19289000000                                               
                                       total
                                                                                                22677000000                        19289000000

22677000000                        19289000000                                                                                        
Basic net income per share of Class A and B common stock and Class C capital stock (in dollars par share)                                                                                                                                        
Diluted net income per share of Class A and Class B common stock and Class C capital stock (in dollars par share)                    

Cash Flow from Operating Activities, Indirect                                                                                                                                        
Net Cash Flow from Continuing Operating Activities, Indirect                24934000000        25539000000        37497000000        31211000000        30818000000                                                                                        
Cash Generated from Operating Activities                24934000000        25539000000        21890000000        19289000000        22677000000                                                                                        
Income/Loss before Non-Cash Adjustment                24934000000        25539000000        21890000000        19289000000        22677000000                                                                                        
Total Adjustments for Non-Cash Items                20642000000        18936000000        18525000000        17930000000        15227000000                                                                                        
Depreciation, Amortization and Depletion, Non-Cash Adjustment                6517000000        3797000000        4236000000        2592000000        5748000000                                                                                        
Depreciation and Amortization, Non-Cash Adjustment                3439000000        3304000000        2945000000        2753000000        3725000000                                                                                        
Depreciation, Non-Cash Adjustment                3439000000        3304000000        2945000000        2753000000        3725000000                                                                                        
Amortization, Non-Cash Adjustment                3215000000        3085000000        2730000000        2525000000        3539000000                                                                                        
Stock-Based Compensation, Non-Cash Adjustment                224000000        219000000        215000000        228000000        186000000                                                                                        
Taxes, Non-Cash Adjustment                3954000000        3874000000        3803000000        3745000000        3223000000                                                                                        
Investment Income/Loss, Non-Cash Adjustment                1616000000        -1287000000        379000000        1100000000        1670000000                                                                                        
Gain/Loss on Financial Instruments, Non-Cash Adjustment                -2478000000        -2158000000        -2883000000        -4751000000        -3262000000                                                                                        
Other Non-Cash Items                -2478000000        -2158000000        -2883000000        -4751000000        -3262000000                                                                                        
Changes in Operating Capital                -14000000        64000000        -8000000        -255000000        392000000                                                                                        
Change in Trade and Other Receivables                -2225000000        2806000000        -871000000        -1233000000        1702000000                                                                                        
Change in Trade/Accounts Receivable                -5819000000        -2409000000        -3661000000        2794000000        -5445000000                                                                                        
Change in Other Current Assets                -5819000000        -2409000000        -3661000000        2794000000        -5445000000                                                                                        
Change in Payables and Accrued Expenses                -399000000        -1255000000        -199000000        7000000        -738000000                                                                                        
Change in Trade and Other Payables                6994000000        3157000000        4074000000        -4956000000        6938000000                                                                                        
Change in Trade/Accounts Payable                1157000000        238000000        -130000000        -982000000        963000000                                                                                        
Change in Accrued Expenses                1157000000        238000000        -130000000        -982000000        963000000                                                                                        
Change in Deferred Assets/Liabilities                5837000000        2919000000        4204000000        -3974000000        5975000000                                                                                        
Change in Other Operating Capital                368000000        272000000        -3000000        137000000        207000000                                                                                        
Change in Prepayments and Deposits                -3369000000        3041000000        -1082000000        785000000        740000000                                                                                        
Cash Flow from Investing Activities                                                                                                                                        
Cash Flow from Continuing Investing Activities                -11016000000                -9074000000        -5383000000        -7281000000                                                                                        
Purchase/Sale and Disposal of Property, Plant and Equipment, Net                -11016000000        -10050000000        -9074000000        -5383000000        -7281000000                                                                                        
Purchase of Property, Plant and Equipment                -6383000000        -10050000000        -5496000000        -5942000000        -5479000000                                                                                        
Sale and Disposal of Property, Plant and Equipment                -6383000000        -6819000000        -5496000000        -5942000000        -5479000000                                                                                        
Purchase/Sale of Business, Net                        -6819000000                                                                                                                
Purchase/Acquisition of Business                -385000000                -308000000        -1666000000        -370000000                                                                                        
Purchase/Sale of Investments, Net                -385000000        -259000000        -308000000        -1666000000        -370000000                                                                                        
Purchase of Investments                -4348000000        -259000000        -3293000000        2195000000        -1375000000                                                                                        
Sale of Investments                -40860000000        -3360000000        -24949000000        -37072000000        -36955000000                                                                                        
Other Investing Cash Flow                36512000000        -35153000000        21656000000        39267000000        35580000000                                                                                        
Purchase/Sale of Other Non-Current Assets, Net                100000000        31793000000        23000000        30000000        -57000000                                                                                        
Sales of Other Non-Current Assets                        388000000                                                                                                                
Cash Flow from Financing Activities                                                                                                                                        
Cash Flow from Continuing Financing Activities                -16511000000        -15254000000        -15991000000        -13606000000        -9270000000                                                                                        
Issuance of/Payments for Common Stock, Net                -16511000000        -15254000000        -15991000000        -13606000000        -9270000000                                                                                        
Payments for Common Stock                -13473000000        -12610000000        -12796000000        -11395000000        -7904000000                                                                                        
Proceeds from Issuance of Common Stock                13473000000        -12610000000        -12796000000        -11395000000        -7904000000                                                                                        
Issuance of/Repayments for Debt, Net                                                                                                                                        
Issuance of/Repayments for Long Term Debt, Net

115000000        -42000000        -1042000000        -37000000        -57000000                                                                                        
Proceeds from Issuance of Long Term Debt

1150000000        -42000000        -1042000000        -37000000        -57000000                                                                                        
Repayments for Long Term Debt 

6250000000        6350000000        6699000000        900000000        0                                                                                        
Proceeds from Issuance/Exercising of Stock Options/Warrants

6250000000        6365000000        -6392000000        -7741000000        -937000000        -57000000                                                                                                        
2923000000        -2602000000        -2453000000        -2184000000        -1647000000                                                                                                                                                                                                                                
Other Financing Cash Flow

Cash and Cash Equivalents, End of Period                                                                                                                                        

Change in Cash

                0                300000000        10000000        338000000000)                                                                                        
Effect of Exchange Rate Changes

                20945000000        23719000000        23630000000        26622000000        26465000000                                                                                        
Cash and Cash Equivalents, Beginning of Period

                25930000000        235000000000)        -3175000000        300000000        6126000000                                                                                        
Cash Flow Supplemental Section 

               181000000000)        -146000000000)        183000000        -143000000        210000000                                                                                        
Change in Cash as Reported, Supplemental

Stripe Services Agreement
Stripe Connected Account Agreement
Stripe Payments Company Terms
Acquirer Terms
Cross River Bank
PNC Bank
Wells Fargo Bank
Issuing Bank Terms
Payment Method Terms
User Bank Debit Authorizations
Restricted Businesses
Other Products and Programs
Stripe Terminal Device EULA
Stripe Terminal Purchase Terms
Stripe Terminal Reseller Terms
Stripe Atlas Agreement
Stripe Climate Contribution Terms
Stripe Apps
App Developer Agreement
App Marketplace Agreement
Privacy
Privacy Policy
Cookies Policy
Privacy Shield Policy
Service Providers List
Data Processing Agreement
Stripe Privacy Center
Intellectual Property
Intellectual Property Notice
Marks Usage
E-SIGN Disclosure
Licenses
PNC Bank Acquirer Terms
Last updated: August 22, 2022

These PNC Bank Acquirer Terms (“Member Bank Terms”) are additional terms applicable to the Stripe Payments Services for Visa and Mastercard products for which PNC Bank, N.A. (“Member Bank”) is a Payment Method Acquirer (“VM Payment Processing Services”). In these Member Bank Terms, Visa and Mastercard may be referred to individually as a “Network” and collectively as the “Networks”, and the rules issued by a Network are the “Network Rules.” Additionally, for purposes of these Member Bank Terms, if you are registered with a Network pursuant to applicable Network Rules, you are considered “Network Registered.” Any terms used but not defined in these Member Bank Terms will have the meaning provided in the Stripe Services Agreement (“Agreement”).

These Member Bank Terms constitute a legal agreement among you, Stripe, and Member Bank, a national bank, with offices at 300 Fifth Avenue, Pittsburgh, PA 15222. The legal agreement is formed by Member Bank’s and Stripe’s offer of these Member Bank Terms to you, your acceptance of these Member Bank Terms, and Member Bank’s and Stripe’s subsequent provision of VM Payment Processing Services to you.

These Member Bank Terms are offered to you, and the legal agreement established by these Member Bank Terms becomes effective as provided below.

For all users of the VM Payment Processing Services, except Network Registered users: These Member Bank Terms become effective only when you process more than $1 million in Transactions on a Network within any twelve-month period. Importantly, the $1 million threshold for effectiveness of these Member Bank Terms is set by each Network, and either Network may change its threshold for effectiveness of these Member Bank Terms at any time with no notice to you. Until you process more than $1 million in Transactions on a Network (or such other processing thresholds as may be established by either Network), these Member Bank Terms are not effective, and you do not have a direct legal agreement with Member Bank with respect to the VM Payment Processing Services.
For Network Registered users of the VM Payment Processing Services: These Member Bank Terms become effective when you process your first Transaction on a Network.
You understand and agree that Stripe or Member Bank may enforce any provisions of the Agreement that relate to Stripe or Member Bank’s provision of or your use of the VM Payment Processing Services, and you acknowledge that you are directly responsible to Member Bank under the Agreement for any liability to Member Bank caused by your breach of the Agreement. Stripe or Member Bank may also terminate these Member Bank Terms at any time, which may limit or terminate your ability to use the VM Payment Processing Services. Further, either Network may, at any time for any reason, terminate these Member Bank Terms with respect to Payment Processing Services for its products.

You must accept all of the terms and conditions of these Member Bank Terms to use the VM Payment Processing Services. If you do not accept them, you may not receive VM Payment Processing Services.

1. Network Compliance and Disclosure
Important Member Bank Disclosures: Member Bank discloses that (i) it is the only entity approved to extend acceptance of Visa and Mastercard products directly to you under these Member Bank Terms; (ii) it must be a principal party to these Member Bank Terms; (iii) it is responsible for educating you on the Network Rules with which you must comply, but this information may be provided to you by Stripe; and (iv) subject to Section 4 of these Member Bank Terms, with respect to Transactions processed through the VM Payment Processing Services, it is responsible for and must provide the Settlement Funds (as defined below) that it receives to Stripe (or Stripe’s designated financial services provider) for Stripe’s distribution to you; and (v) with respect to Transactions processed through the VM Payment Processing Services, Stripe is responsible for all funds that may be held in reserve that are derived from your Settlement Funds.

Your Responsibilities: In addition to any other responsibilities set forth in these Member Bank Terms, you agree that, at all times throughout the term of these Member Bank Terms, you will (i) comply with the PCI Standards in using and maintaining Payment Account Details; (ii) maintain fraud and Dispute rates acceptable under the Network Rules; (iii) review and understand the terms of these Member Bank Terms; (iv) comply with the Network Rules and Laws; and (v) comply with the Agreement.

Stripe is registered as a Payment Facilitator and an Independent Sales Organization (ISO) by Member Bank. You may contact Member Bank by writing to PNC Bank, N.A., 1600 Market Street, 8th Floor, Philadelphia, PA 19103.

2. Purpose of these Member Bank Terms
When you process more than $1 million within any twelve-month period in Visa or Mastercard Transactions through a particular Payment Method Acquirer, or, if you are Network Registered, when you process your first Visa or Mastercard Transaction through a particular Payment Method Acquirer, applicable Network Rules require you to enter into a direct contractual relationship with the Payment Method Acquirer. These Member Bank Terms constitute your direct contractual relationship with Member Bank, which is a member of the Networks, and a Payment Method Acquirer for Visa and Mastercard Transactions. In accordance with the requirements of the Network Rules, these Member Bank Terms are offered and effective, and your direct contractual relationship with Member Bank is established, as provided in the introductory paragraphs above.

As a Payment Method Acquirer, Member Bank authorizes you to accept payment from your Customers by Visa and Mastercard credit or debit card (“VM Payment Cards”). However, by using the VM Payment Processing Services and accepting VM Payment Cards, you are not establishing a depository or other account with Member Bank. As between Stripe and Member Bank, Stripe is responsible for underwriting and evaluating your eligibility to receive the VM Payment Processing Services, authorizing charges, settling funds to your User Bank Account(s) as provided in Section 4, and providing the VM Payment Processing Services pursuant to the terms of the Agreement.

Stripe, and not Member Bank, will provide customer service to you to resolve any issues you may have related to your use of the VM Payment Processing Services; however, you may contact Member Bank (using the contact information provided above) in the event you are unable to resolve any matters directly with Stripe. You are solely responsible for providing support to your Customers for all issues related to your products and services.

3. Compliance with Visa and Mastercard Rules
When you use the VM Payment Processing Services to accept charges from VM Payment Cards, you must comply with the Network Rules, including the acceptance guidelines, monitoring programs, and activity reporting (including excessive credits, Disputes, or deposits) set forth therein. Under the Network Rules, certain activity may subject you to Disputes, fees, fines, settlement delays, withholdings, audits of your processing activity, or termination of these Member Bank Terms and/or the Agreement. Without limiting the foregoing, you specifically agree to:

i. Only submit Transactions authorized by the cardholder;

ii. Only accept payment for the sale of products or services, and receipt of bona fide donations, conducted by you pursuant to your business as indicated in your Stripe Account and not for any products, services, or donations (i) prohibited by Laws or Network Rules, or (ii) that qualify as Restricted Businesses, unless you have received prior written approval from Stripe;

iii. Submit a Transaction for the full amount owed by the Customer for the Transaction except where you and the Customer agree on a partial shipment (such as receiving a portion of an order), or where the Transaction qualifies for delayed delivery or special order deposits (such as paying for a deposit on a custom-built product);

iv. Not establish minimum or maximum amounts (except as permitted by the Network Rules), or condition charges for use of VM Payment Cards, and not discourage the use of one VM Payment Card brand over another;

v. Not impose surcharges or taxes (except where permitted by Law and the Network Rules) and, where so done, you will only collect such amounts as part of the submitted charge;

vi. Not submit a Transaction that represents collection of a dishonored check;

vii. Only use the Network logos or marks in a manner permitted by the Network Rules;

viii. Prohibit use of Payment Cards for disbursement of cash (except as permitted by the Network Rules);

ix. Comply with the security obligations identified in the Agreement, including compliance with the PCI Standards and only use cardholder data as permitted, and certify such compliance upon request, and not permit or promote fraudulent use of VM Payment Cards or cardholder data;

x. Make clear to Customers that they are transacting with you prior to, during, and after the Transaction, including providing clear statement descriptors;

xi. Use all reasonable methods to resolve disputes with Customers, including those resulting in a Dispute, and not attempt to recharge a Customer for a Transaction that was previously Disputed and subsequently returned to you unless the recharge is expressly authorized by the Customer; and

xii. Provide clear refund and exchange language that is consistent with Laws and the Network Rules.

4. Authorization for Settlement and Disbursement of Funds
When Member Bank receives funds from the Networks for settlement of your Card Payments (“Settlement Funds”), Member Bank will provide the Settlement Funds to Stripe or Stripe Payments Company, which will accept the Settlement Funds on your behalf. You agree to designate Stripe and Stripe Payments Company as your agent for purposes of receiving Settlement Funds, and you authorize Stripe to instruct Member Bank on your behalf on how and when to make transfers of Settlement Funds to Stripe, including the initiation of holds, receipts, and disbursements of Settlement Funds. Settlement Funds will be held by Stripe in pooled merchant funds accounts pending disbursement to you (or any applicable third-party recipient you have instructed Stripe to make a disbursement to on your behalf) in accordance with the terms of the Agreement, including these Member Bank Terms.

You agree you are not entitled to access the Settlement Funds prior to the Settlement Funds being credited by Stripe to your User Bank Account (or the bank account of a third-party recipient to which you have instructed Stripe to make a disbursement on your behalf). You further agree that you have no right to direct Member Bank to distribute Settlement Funds, that you may not assign any interest in any Settlement Funds held by Member Bank, and that you are not entitled to any interest or other compensation associated with the Settlement Funds held by Member Bank. Any authorizations set forth in these Member Bank Terms will remain in full force and effect until your Stripe Account is closed or terminated.

You agree that Member Bank’s transfer of Settlement Funds to your designated agents, Stripe or Stripe Payments Company, satisfies Member Bank’s settlement obligation to you, and that, after Member Bank transfers Settlement Funds to Stripe or Stripe Payments Company, any dispute or claim you may have regarding the receipt or amount of Settlement Funds will be between you and Stripe or Stripe Payments Company. Further, if a cardholder disputes a Transaction, if a Transaction is Disputed for any reason, or if Member Bank reasonably believes a Transaction is unauthorized or otherwise unacceptable, the amount of such Transaction may be Disputed and debited from Settlement Funds held by Member Bank.

5. Sharing of Data
a. You authorize Stripe and Member Bank to provide Protected Data to each other to (i) provide the VM Payment Processing Services, (ii) comply with legal and regulatory obligations, and (iii) perform underwriting and risk review, including verification that you are legally permitted to transact and receive funds. This includes sharing information you provided to Stripe before these Member Bank Terms became effective and information about Member Bank and Stripe’s experience with you, such as termination of these Member Bank Terms by Member Bank and the reasons for such termination. Where required to comply with our obligations under Laws, the Network Rules, or any of Member Bank’s regulatory obligations, Member Bank may provide any data to law enforcement, the Networks, or other government regulators.

b. To help the government fight the funding of terrorism and money laundering activities, federal law requires each financial institution to obtain, verify, and record information that identifies each person who establishes a customer relationship with the financial institution. To comply with this requirement, you authorize and direct Stripe to provide to Member Bank any information required to verify your identity, including your name, address, and taxpayer identification number. If you are a legal entity, including a limited liability company or corporation, you authorize and direct Stripe to provide Member Bank with information on the identity of (1) all beneficial owners of 25% or more of the company; and (2) at least one individual with significant control over the company.

6. Term and Termination
These Member Bank Termsbecome effective as provided in the introductory paragraphs and shall continue in effect so long as you use the VM Payment Processing Services.These Member Bank Terms will terminate automatically upon termination of the Agreement, except for those terms which are intended to survive termination. In addition, the VM Payment Processing Services and/or these Member Bank Terms may be terminated by Member Bank, Stripe, or either Network as provided in the introductory paragraphs.

7. Representations and Warranties
In addition to the representations and warranties made in the Agreement, which are incorporated by reference to this Addendum in their entirety, you represent and warrant to Member Bank and Stripe as of each day on which you receive VM Payment Processing Services that:

a. You are legally able to enter into these Member Bank Terms;

b. You will not use the VM Payment Processing Services, directly or indirectly, for any fraudulent or illegal undertaking; and

c. You will only use the VM Payment Processing Services in a manner consistent with the Agreement, including these Member Bank Terms, the Documentation, and Network Rules.

8. Indemnification
Notwithstanding the foregoing or anything to the contrary in the Agreement, you agree to defend, indemnify, and hold harmless Member Bank, and its respective employees, directors, agents, subcontractors and affiliates (collectively the “Member Bank Entities”) from and against any claim, suit, demand, loss, liability, damage (including indirect or consequential damage), action, or proceeding arising out of or relating to (a) your breach of any provision of the Agreement or these Member Bank Terms; (b) your use of the VM Payment Processing Services; (c) your obligations to pay fees or fines to Stripe, your Customers, Payment Method Providers, or third parties; (d) your negligence or willful misconduct or the negligence or willful misconduct of your employees, contractors, or agents; and (e) all third-party indemnity obligations Member Bank incurs as a direct or indirect result of your acts or omissions (including indemnification of any Network, card issuer, or intermediary bank).

9. Disclaimer of Warranties
THE SERVICES DESCRIBED IN THESE MEMBER BANK TERMS ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS, WITHOUT ANY WARRANTIES, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WITHOUT LIMITATION ANY IMPLIED WARRANTIES OF TITLE, QUALITY, SUITABILTY, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. ALL DISCLAIMERS OF WARRANTIES PROVIDED IN THE AGREEMENT WILL APPLY EQUALLY TO THE MEMBER BANK ENTITIES AS THEY DO TO STRIPE. THE MEMBER BANK ENTITIES (A) ARE NOT RESPONSIBLE FOR YOUR OR STRIPE’S FAILURE TO PERFORM OBLIGATIONS UNDER THE AGREEMENT AND (B) DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY YOU, STRIPE, OR ANY THIRD PARTY.

10. Limitations on Liability
In no event will the Member Bank Entities be liable for any lost profits, lost revenue, lost business opportunity, loss of data, or any indirect, punitive, incidental, special, consequential, or exemplary damages arising out of, in connection with, or relating to the Agreement, these Member Bank Terms, or the VM Payment Processing Services described in either, including without limitation the use of, inability to use, or unavailability of services provided by Stripe. Under no circumstances will any of the Member Bank Entities be responsible for any damage, loss, or injury resulting from hacking, tampering, or other unauthorized access, or use of the VM Payment Processing Services, your Stripe Account, or Protected Data, or your failure to use or implement security, controls, or processes that are appropriate for your business.

The Member Bank Entities assume no liability or responsibility for any (a) personal injury or property damage, of any nature whatsoever, resulting from your access to or use of the VM Payment Processing Services; (b) any misuse of VM Payment Processing Services or Protected Data; (c) any interruption or cessation of transmission to or from the VM Payment Processing Services; (d) any software bugs, viruses, or other harmful code that may be transmitted to, through, or in connection with the VM Payment Processing Services; (e) any errors, inaccuracies, or omissions in the VM Payment Processing Services or data, or any loss or damage resulting therefrom, regardless of the manner of transmission; or (f) defamatory, offensive, or illegal conduct of any third party.

The Member Bank Entities’ cumulative liability to you is limited to direct damages and in all events will not exceed in the aggregate the amount of fees or compensation actually received by Member Bank from Stripe for the Transactions processed for you through the VM Payment Processing Services during the three (3) month period immediately preceding the event that gives rise to the claim for liability. The limitation of liability in the preceding sentence will not apply to claims by you against Member Bank for direct damages for failure to transfer Settlement Funds to Stripe in accordance with Section 4 of these Member Bank Terms, in which case Member Bank liability for such direct claim by you is limited to the amount of any Settlement Funds that Member Bank failed to transfer to Stripe in accordance with Section 4 of these Member Bank Terms.

Without limiting anything to the contrary above, you agree to provide Member Bank, via a communication with Stripe, with written notice of any alleged breach by Member Bank of these Member Bank Terms, which notice will specifically detail such alleged breach, within sixty (60) days of the date on which you discovered or reasonably should have discovered the alleged breach. Failure to provide notice shall be deemed an acceptance by you and a waiver of any and all rights to dispute such breach.

The foregoing will apply to the fullest extent permitted by law in the applicable jurisdiction and will apply regardless of the legal theory on which the claim is based, including without limitation contract, tort (including negligence), strict liability, or any other basis. The limitations apply even if Stripe or Member Bank have been advised of the possibility of such damage.

11. United States Only Services; No Illegal Activities
You may not use the VM Payment Processing Services or services of any kind offered by Member Bank from, or on behalf of persons or entities (a) in a country embargoed by the United States or (b) blocked or denied by the United States government. You further acknowledge and agree that you will not use your Stripe Account and/or the VM Payment Processing Services for illegal Transactions, for example, those prohibited by the Unlawful Internet Gambling Enforcement Act, 31 U.S.C. Section 5361 et seq., as may be amended from time to time, or those involving any Person listed on the U.S. Department of Treasury, Office of Foreign Assets Control (“OFAC”), Specially Designated Nationals and Blocked Persons List (available at www.treas.gov/ofac) or the U.S. Department of State Terrorist Exclusion List (available at www.state.gov) or the processing and acceptance of Transactions in certain jurisdictions pursuant to 31 CFR Part 500 et seq. and other laws enforced by OFAC. Unless otherwise explicitly stated, the VM Payment Processing Services are solely for use by you in the United States, Puerto Rico, and the U.S. Virgin Islands.

Notwithstanding anything to the contrary in these Member Bank Terms, Member Bank may decline to process any Transaction submitted by you in its sole discretion.

12. Dispute Resolution
All disputes under these Member Bank Terms are subject to the applicable provisions of the Agreement. In particular, the dispute resolution, class action waiver, and arbitration provisions of the Agreement apply to disputes under these Member Bank Terms by, with, or against Member Bank in the same manner they apply to disputes by, with, or against Stripe, except that (a) in the event of arbitration, only a federal court (and not an arbitrator) may determine whether a particular claim is arbitrable, and (b) service to Member Bank must be made to its registered agent or to PNC Bank, N.A., 1600 Market Street, 8th Floor, Philadelphia, PA 19103.

13. Waiver
The failure of Member Bank to assert any of its rights under these Member Bank Terms or the Agreement shall not be deemed to constitute a waiver by Member Bank of its rights to enforce each and every provision of these Member Bank Terms or the Agreement in accordance with their terms. These Member Bank Terms may be amended by Member Bank or Stripe from time to time in the same manner as the Agreement may be amended by Stripe.

14. Miscellaneous
These Member Bank Terms are entered into, governed by, and construed pursuant to the laws of the State of New York without regard to conflicts of law provisions. These Member Bank Terms may not be assigned by you without the prior written consent of Member Bank and Stripe. These Member Bank Terms shall be binding upon and inure to the benefit of the parties hereto and their respective successors, transferees, and assignees. If any provision of these Member Bank Terms are determined to be illegal or invalid, such illegality or invalidity of that provision will not affect any of the remaining provisions and these Member Bank Terms will be construed as if such provision is not contained in these Member Bank Terms.

15. 633-44-1725 Zachryiixixiiiwood@gmail.com 
47-2041-6547 111000614 31000053
PNC Bank 
PNC Bank Business Tax I.D. Number: 633441725
CIF Department (Online Banking) 
Checking Account: 47-2041-6547
P7-PFSC-04-F Business Type: Sole Proprietorship/Partnership Corporation
500 First Avenue ALPHABET
Pittsburgh, PA 15219-3128 5323 BRADFORD DR
NON-NEGOTIABLE DALLAS TX 75235 8313
ZACHRY, TYLER, WOOD
4/18/2022 650-2530-000 469-697-4300
SIGNATURE Time Zone: Eastern Central Mountain Pacific
Investment Products • Not FDIC Insured • No Bank Guarantee • May Lose Value
"NON-NEGOTIABLE NON-NEGOTIABLE
PLEASE READ THE IMPORTANT DISCLOSURES BELOW PLEASE READ THE IMPORTANT DISCLOSURES BELOW
Based on facts as set forth in. Based on facts as set forth in.  650
The U.S. Internal Revenue Code of 1986, as amended, the Treasury Regulations promulgated thereunder, published pronouncements of the Internal Revenue Service, which may be cited or used as precedents, and case law, any of which may be changed at any time with retroactive effect. No opinion is expressed on any matters other than those specifically referred to above. The U.S. Internal Revenue Code of 1986, as amended, the Treasury Regulations promulgated thereunder, published pronouncements of the Internal Revenue Service, which may be cited or used as precedents, and case law, any of which may be changed at any time with retroactive effect. 
No opinion is expressed on any matters other than those specifically referred to above.
Footer
© 2022 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
ci by zakwarlord7 · Pull Request #22378 · github/docs 
A GitHub Action for approving pull requests.

## Usage

```yaml
steps:
  - name: Approve Pull Request
    uses: juliangruber/approve-pull-request-action@v2.0.0
    with:
      github-token: ${{ secrets.GITHUB_TOKEN }}
      number: 1
      repo: juliangruber/approve-pull-request-action # optional
```

## Related

- [find-pull-request-action](https://github.com/juliangruber/find-pull-request-action) &mdash; Find a Pull Request
- [merge-pull-request-action](https://github.com/juliangruber/merge-pull-request-action) &mdash; Merge a Pull Request
- [octokit-action](https://github.com/juliangruber/octokit-action) &mdash; Generic Octokit.js Action

## License

MIT
