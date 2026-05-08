/**
 * Node Service API
 * Provides dynamic and horizontal node configuration for WF_01.
 */

function init(request) {
}

/**
 * Generates the imwNodeSetting object based on input data.
 * @param {Object} data - Input data (leave_days, item_total)
 * @return {Object} Standard RPC response containing nodeSetting
 */
function getNodeSetting(data) {
  var leaveDays = parseInt(data.leave_days) || 0;
  var itemTotal = parseInt(data.item_total) || 0;

  // 1. Dynamic Node Configuration (zzz_dnm_01)
  // Standard Plugin IDs for Dynamic Nodes:
  // - User: jp.co.intra_mart.workflow.plugin.authority.node.dynamic.user (Param: user_cd)
  // - Org:  jp.co.intra_mart.workflow.plugin.authority.node.dynamic.organization (Param: company_cd|org_cd)
  // - Role: jp.co.intra_mart.workflow.plugin.authority.node.dynamic.role (Param: role_id)
  var approver = "dev07"; // Default < 3 days
  if (leaveDays >= 7) {
    approver = "dev03"; // >= 7 days
  } else if (leaveDays >= 3) {
    approver = "dev08"; // 3 - 6 days
  }

  var dynamicPlugin = {
    extensionPointId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic",
    pluginId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic.user",
    parameter: approver
  };

  // 2. Horizontal Node Configuration (zzz_hrz_01)
  var hrzApproverList = ["dev08", "dev07", "dev03"];
  var hrzApprovers = [hrzApproverList[0]];

  if (itemTotal > 100000) {
    hrzApprovers = hrzApproverList;
  } else if (itemTotal > 50000) {
    hrzApprovers = hrzApproverList.slice(0, 2);
  }

  var expansions = [];
  for (var i = 0; i < hrzApprovers.length; i++) {
    expansions.push({
      nodeName: "Approval (" + hrzApprovers[i] + ")",
      processTargetConfigModel: [{
        // Both DC and HV/VV use the same 'node.dynamic' extension point
        extensionPointId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic",
        pluginId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic.user",
        parameter: hrzApprovers[i]
      }]
    });
  }

  // 3. Construct the full NodeSetting object
  var nodeSetting = {
    "DCNodeSetting": {
      "zzz_dnm_01": {
        "displayFlag": false,
        "enableFlag": true,
        "processTargetConfigs": [dynamicPlugin]
      }
    },
    "HVNodeSetting": {
      "zzz_hrz_01": {
        "displayFlag": false,
        "enableFlag": true,
        "matterNodeExpansions": expansions
      },
      "zzz_vtz_01": {
        "displayFlag": false,
        "enableFlag": true,
        "matterNodeExpansions": [
          {
            nodeName: "Parallel (dev03)",
            processTargetConfigModel: [{
              extensionPointId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic",
              pluginId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic.user",
              parameter: "dev03"
            }]
          },
          {
            nodeName: "Parallel (dev07)",
            processTargetConfigModel: [{
              extensionPointId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic",
              pluginId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic.user",
              parameter: "dev07"
            }]
          },
          {
            nodeName: "Parallel (dev08)",
            processTargetConfigModel: [{
              extensionPointId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic",
              pluginId: "jp.co.intra_mart.workflow.plugin.authority.node.dynamic.user",
              parameter: "dev08"
            }]
          }
        ]
      }
    }
  };

  return {
    type: 'getNodeSetting',
    data: nodeSetting,
    error: false
  };
}

