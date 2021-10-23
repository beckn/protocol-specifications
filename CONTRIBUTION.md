# Contributing to the Specification


## Draft 01


# Authors

1. Ravi Prakash - ravi@becknfoundation.org


# Latest Version

Draft 01


# Previous Versions

None


# Scope

This document intends to establish transparent and open processes and guidelines to contribute to the beckn protocol specification. It contains design principles and guidelines and considerations that should be adopted by anyone wishing to propose changes to the specification.

This document is intended for the following audience.



1. Any person or organization who wants to propose a change in the specification


# Prerequisites



1. Readers must have knowledge and hands-on experience in **git** and **GitHub**. 
2. Readers must have knowledge of beckn protocol specification


# Context

Beckn protocol specification exists as a set of public repositories on Github at https://github.com/beckn. Like all version controlled open-source repositories, there are guidelines that must be followed; design principles to be considered in order to propose changes to the files present in these repositories. These pull requests will then be reviewed by the maintainers of the repository and subsequently merged with the main / master branch of that repository. The governing body and repository maintainer of the beckn protocol specification is the **Core Working Group**. The members of the CWG can be found [here](https://github.com/orgs/beckn/teams/core-working-group).


# Abstract 

The evolution of beckn protocol specification should be use-case driven. The working group can specify support for hypothetical use cases as they see fit, but specifications should be backed by realistic scenarios. Management of an open-source specification like beckn protocol should be governed by well defined policies and processes. Proposing any change to an open-source repository starts by raising an Issue against a repository. After an Issue is raised, a Pull Request must be created and linked to that issue. These pull requests must be reviewed and merged by the relevant working groups and repository maintainers via a standard governance model.


# Terminology



1. **Git:** A decentralized version control software
2. **Github:** An online platform for managing shared repositories via git
3. **Pull Request:** A request to merge a change to an existing version of the repository
4. **Core Working Group:** Current maintainer and governing authority of the specification


# Expected Outcomes After Reading This Document

After reading this document, the reader should be able to understand how to contribute to the specification. 


# Introduction

The current process for evolution of beckn protocol specification is described in the **Contribution Guidelines** section of the document. Development of the next version of the specification is guided by the **Core Working Group (CWG)**. This working group contains members that bring their API expertise, industry knowledge, incorporate feedback from the community, and expand the group of committers as and when appropriate. All development activity on the future specification will be performed as features on a draft branch and merged into this branch. Upon release of the future specification, this branch will be merged to master.

The CWG holds weekly web conferences to review open pull requests and discuss open issues related to the evolving specification. Participation in weekly calls and scheduled working sessions is open to the community.

The beckn protocol governance principles encourage participation from individuals and companies alike. 


# Contribution Guidelines

Contributing to the specification involves active participation by the contributor in the beckn open community. The following guidelines ensure a higher chance of a proposal being accepted by the community.



1. Knowledge of the specification
2. Initiating healthy discussions on Github and Slack
3. Helping other community members with Issues
4. Providing sufficient documentation and in-depth analysis
5. Following a code of conduct in the discussion forums

Not all feedback can be accommodated as a change and there may be solid arguments for or against a change being appropriate for the specification.


# Contribution Process


![Flow](http://13.235.139.60/dev-docs-images/PR%20Flowchart.png)



## 1. Review the specification

All contributors are expected to review the specification before submitting a proposal. If there is anything that a contributor does not understand, they are free to pose questions to the beckn open community of developers. 


## 2. Join the Beckn Open Community on Slack

Joining the open community on Slack is a simple process. Click [here](https://join.slack.com/t/beckn/shared_invite/zt-ucfhmyow-5XuHdRpFrqO2sh4gzcnuQw) to join the developer community on Slack. This is useful to have quick real-time interactions with the developers in the community. 


## 3. Initiate / participate in discussion threads on Github

Before proposing a change to the specification, visit the discussion threads on Github [here](https://github.com/beckn/protocol-specifications/discussions) 


## 4. Subscribe to existing Issues or Pull Requests

Check the [issues](https://github.com/beckn/protocol-specifications/issues) and [pull requests](https://github.com/beckn/protocol-specifications/pulls) to see if someone has already documented your idea or feedback on the specification. If you find something relevant to your proposal, subscribe to the discussions around Issues and PRs. 


## 5. Raise an Issue (Feature Requests or Enhancements)

Create an issue to describe a new concern. If possible, propose a solution. 


## 6. Create a Pull Request

Submit a Pull Request against that Issue. 


# Specification Change Criteria

The specification will evolve over time. Changes may be made when any of the following criteria are met:



1. **Clarity**. The current "way" something is done doesn't make sense, is complicated, or not clear.
2. **Consistency**. A portion of the specification is not consistent with the rest, or with the industry standard terminology.
3. **Necessary functionality**. We are missing functionality because of a certain design of the specification.
4. **Forward-looking** **Designs**. As usage of APIs evolves to new protocols, formats, and patterns, we should always consider what the next important functionality should be.
5. **Impact**. A change will provide an impact on a large number of use cases. We should not be forced to accommodate every use case. Maintainers should strive to make the common and important use cases both well supported and common in the definition of the OAI Spec. Evolution cannot be edge-case driven.


# Considerations before Proposing a Change

For each change in the specification we should always consider the following:



1. **Migration Impact : **Is this a construct that has a smooth implementation path from the latest specification? If so, how complicated is it to migrate implementations to the proposed change? Secondly, how large of a cohort is affected due to this change
2. **Tooling**: Contributors should strive to support code generation, software interfaces, spec generation techniques, as well as other utilities. Some features may be impossible to support in different frameworks/languages. These should be documented and considered during the change approval process.
3. **Visualization**: Can the specification change be graphically visualized somehow in a UI or other interface [Needs Edit]

**Note:** Spec change proposals will be approved by the CWG. Approval will be given via a comment on the issue itself, for example, "_Approved by @cwg-admin_". No change will be approved until there is documentation for it, supplied in an accompanying PR.


# Change Tracking and Management on GitHub

**GitHub** is the medium of record for all spec designs, use cases, and so on.

All the specification related repositories are present on the official beckn protocol Github account [here](https://github.com/beckn).


## Sources of Truth



1. The **protocol-specifications** repository is the source of truth for the core transaction API specification. 
2. The **registry** repository is the source of truth for implementing the registry infrastructure
3. The **specification-files** repository is the source of truth for all human readable specification files


## Branch Structure

At any given time, there would be _at most_ 4 working branches. The branches would exist if work has started on them. For example, assume a current version of **0.9.2** in the protocol-specifications repository. 



1. **master** - Current stable version. No PRs would be accepted directly to modify the specification. PRs against supporting files can be accepted.
2. **core-0.9.3-draft** - The next PATCH version of the specification. This would include non-breaking changes such as typo fixes, document fixes, wording clarifications.
3. **core-0.10.0-draft** - The next MINOR version of the specification. This would include backward compatible changes to the specification like attributes to existing schema. 
4. **core-1.0.0-draft** - The next MAJOR version of the specification. 

The master branch shall remain the current, released beckn protocol specification. The will describe and link the working branch(es) on the default README.md on main.

Examples of how something is described _currently_ vs. the proposed solution should accompany any change proposal.

New features should be done in feature branches/forks which, upon approval, will be merged into the proper work branch.


## Raising an Issue in the Specification

Any change to the specification must begin with the creation of a Github Issue. The process for raising an issue on GitHub is detailed [here](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue). 


## Creating a Pull Request

All PRs to a specific version of the specification must be made to the **draft** branch of the next upcoming version. For example, All patch changes to version **0.9.2** must be made to the** 0.9.3-draft **branch.


# Adding Features to the Core Schema

Wherever and whenever suitable, new features will be introduced inside the core protocol schema in accordance with the beckn protocol design principles. New features should be _namespaced_ by standard prefixes to indicate their deviation from the standard schema. This namespacing approach enables new features to be designed, documented and then implemented by platforms that are interested in the feature, without putting the burden of implementation on all platforms. If the feature is successfully implemented by a majority of platforms and there is demonstrable value added by the feature, it will become a candidate for inclusion inside the Core Schema in a future release of the specification, at which point all implementations will be expected to support the feature.


## Feature evolution stages

All new features have a life cycle starting from a proposal to a required standard. All new features to the specification must start with a status as “proposed”. Upon review, the CWG will decide to move forward with a discussion on the change and then move it to a “draft” status. If the feature is considered to become part of the specification, it will be moved to the “recommended” status. And if the feature is widely accepted and adopted by the ecosystem, then it will be moved to a “required” status after which it will become part of the core specification.


![Feature Stages](http://13.235.139.60/dev-docs-images/Feature%20Stages.drawio.png)

## Namespacing Non-Standard Properties

The name of any new property in the core schema must be namespaced using the below format indicating that it is a **Non-Standard Property **of a schema.


`"./{namespace-id}.{feature-name}.{feature-stage}"`

### Non-standard Property Components

1. **The dot slash ( ./ )** : This symbol in the context of core specification represents a non-standard property in the core schema. If this property is being developed by a network, all platforms must be able to recognize that this attribute is currently not part of the core specification and use / ignore it appropriately.
2. **namespace-id **: This is a unique id linked to a feature being submitted for inclusion in the specification by a unique entity. The format of the ID varies with the proposer of the feature.
    1. **For Individuals** : Individuals submitting new features must namespace the property with their **Github username**.For example, if Alice is a developer (_username : @alice-dev_) wants to add a feature called `"direction"` in core schema, she must submit her proposal with the new property **<code>"./@alice-dev.direction.proposed"</code></strong>
    2. <strong>For Organizations</strong>: Organizations submitting new features must namespace the property with their <strong>Github orgname</strong>. For example, if Beckn Foundation (username : <em>@beckn-foundation</em>) wants to add a feature called “speed” in core schema, she must submit her proposal with the new property <strong><code>"./@beckn-foundation.speed.proposed"</code></strong>
3. <strong>feature-name </strong>: This is the name of the feature. While creating the feature-name, proposers are <em>recommended</em> to use the following guidelines before submitting the proposal. Please note that these are more like guidelines than rules. 
    - The English language must be used to propose any new features. 
    - Standard programming jargon can be used as long as it is widely accepted by the developer community. For example <code>"const"</code> is an acceptable keyword. 
    - The feature name must be generic and not specific to a limited region or domain
4. <strong>feature-stage</strong> : For a new feature this value will always be “<strong>proposed</strong>”. The other values are <em>draft</em>, <em>recommended</em> and <em>required</em>. These values are reserved for CWG committers and will be described in detail in the Specification Governance document.

## Identifying a new feature in the Schema

New features under discussion should be identified by the prefixed **“./”** in the property of the json schema. If the feature is deemed appropriate for inclusion in the specification, the namespace will be removed and the feature will be moved inside the Core Schema. Implementations that support new features should plan for the future removal of the prefix. When implementations add support for a later version of beckn protocol that includes the final implementation of the feature, they MUST NOT support the use of the prefix for that feature. New features will only be promoted into minor or major releases of the specification and therefore will be transparent to specification description writers and reference implementation providers who choose not to use the feature while in its draft state. This versioning schema does not apply to V0.x features. In 0.x features, even patch versions can contain bug fixes and enhancements rather than just text changes. 


## Identifying a new feature in Issues

New features in Github Issues will be **labeled** with the **feature-stage** label and will be initially labelled as **proposed, draft, recommended, required or not-recommended**. When the proposal is considered sufficiently stable for pilot implementation, it will be labeled **recommended**. If during the development of a draft feature, it is determined that the feature needs to change in a way that may break existing draft implementations, the “draft” feature-stage name itself may be versioned with a version suffix. e.g. draft-02. When a draft feature becomes part of a future update to the specification any version suffix will be removed. Draft features that are deemed not appropriate for inclusion MUST be marked with the **not-recommended** label. Draft-features that are considered suitably specified and have had successful pilot implementations will be marked with the **recommended** label. If a draft feature is considered to be a required feature in ALL implementations, it will be marked with a **required** label.

Not all future new features will be introduced in this way. Some new features impact the specification in ways that cannot be encapsulated in this way. However, where a new feature can be introduced in this way, it should be.


# Participation

While governance of the specification is the role of the CWG, the evolution of the specification happens through the participation of members of the developer community at large. Any person willing to contribute to the effort is welcome, and contributions may include filing or participating in issues, creating pull requests, or helping others with such activities.

