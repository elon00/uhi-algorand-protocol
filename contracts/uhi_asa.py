"""
UHI Algorand Standard Asset (ASA) Configuration & Creation Helper.
Defines the official Universal High Income (UHI) token on the Algorand Blockchain.
"""

from dataclasses import dataclass
from typing import Optional

@dataclass
class UhiAsaParams:
    asset_name: str = "Universal High Income Token"
    unit_name: str = "UHI"
    total_supply: int = 1_000_000_000_000_000  # 1 Billion UHI with 6 decimals
    decimals: int = 6
    default_frozen: bool = False
    url: str = "https://github.com/elon00/uhi-algorand-protocol"
    metadata_hash: Optional[bytes] = None

    # Algorand pure decentralized settings:
    # No clawback or freeze address configured to ensure absolute sovereign trust.
    manager_address: Optional[str] = None
    reserve_address: Optional[str] = None
    freeze_address: Optional[str] = None
    clawback_address: Optional[str] = None


def get_uhi_asset_create_txn_dict(sender: str, params: UhiAsaParams = UhiAsaParams()) -> dict:
    """
    Returns an algosdk-compatible transaction dictionary for AssetConfigTxn.
    """
    return {
        "sender": sender,
        "total": params.total_supply,
        "default_frozen": params.default_frozen,
        "unit_name": params.unit_name,
        "asset_name": params.asset_name,
        "manager": params.manager_address or sender,
        "reserve": params.reserve_address or sender,
        "freeze": params.freeze_address,
        "clawback": params.clawback_address,
        "url": params.url,
        "decimals": params.decimals
    }
